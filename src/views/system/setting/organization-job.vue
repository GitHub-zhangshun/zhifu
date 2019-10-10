<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
    <!-- dialog 分配角色 -->
    <el-dialog v-el-drag-dialog :title="roleDialog.title" :visible.sync="roleDialog.status">
      <div class="dialogRole-wrapper" v-loading="roleDialog.contentLoading">
        <el-checkbox-group v-model="roleDialog.ownRoles" size="mini" class="checkbox">
          <el-checkbox border v-for="role in roleDialog.roles" :key="role.id" :label="role.id">{{role.name}}
          </el-checkbox>
        </el-checkbox-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleDialog.status = false">取 消</el-button>
        <el-button type="primary" @click="roleDialogSubmit" :loading="roleDialog.loading" :disabled="roleDialog.loading">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'sys-setting-organization-job',
    components: {
      BusHeader,
      BusTable,
      BusDialogForm
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.organizationJob.tableColumns,
        },
        dialog: {},
        tableListQuery: this.$route.query.id,
        roleDialog: {
          title: '',
          status: false,
          roles: [],
          ownRoles: [],
          apiKey: '',
          id: '',
          loading: false,
          contentLoading: false
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({ dialogData: pageData.organizationJob.dialog, title: '新增岗位', apiKey: action.apiKey })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            this.dialog.form.organizationId = this.$route.query.id
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.organizationJob.dialog, title: '修改岗位', apiKey: action.apiKey, edit: true, ownData: row[0]})
            this.dialog.form.organizationId = this.$route.query.id
            break
          case 'role':
            this.roleDialog.status = true
            this.roleDialog.title = `岗位-${row[0].name}:角色分配`
            this.roleDialog.apiKey = action.apiKey
            this.roleDialog.id = row[0].id
            this.roleDialog.contentLoading = true
            // 获取角色列表
            this.$request({
              url: this.hiddenActions['O_ALL_ROLES']
            }).then(data => {
              this.roleDialog.roles = data.result
            })
            // 获取已有角色列表
            this.$request({
              url: this.hiddenActions['O_JOB_ROLES'],
              data: row[0].id
            }).then(data => {
              const ids = []
              data.result.forEach(item => {
                ids.push(item.roleId)
              })
              this.roleDialog.ownRoles = ids
              this.roleDialog.contentLoading = false
            })
            break
          default:
            break;
        }
      },
      // 分配角色弹窗提交
      roleDialogSubmit() {
        // 构建数据
        let allotList = []
        this.roleDialog.ownRoles.map(item => {
          allotList.push({
            roleId: item
          })
        })
        // 去除不存在的角色
        allotList = allotList.filter(item => {
          return this.roleDialog.roles.find(i => {
            return i.id === item.roleId
          })
        })
        this.roleDialog.loading = true
        this.$request({
          url: this.roleDialog.apiKey,
          data: {
            dataId: this.roleDialog.id,
            allotList
          }
        }).then(data => {
          this.roleDialog.status = !data.result
          this.roleDialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg)
          this.getData()
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
  /deep/.checkbox {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .el-checkbox.is-bordered+.el-checkbox.is-bordered {
      margin-left: 0;
      margin-bottom: 2px;
    }
  }

</style>
