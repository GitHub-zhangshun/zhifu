<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <el-table :data="table.list" v-loading="table.loading" border row-key="id">
      <el-table-column label="名称" prop="name">
      </el-table-column>
      <el-table-column label="KEY" prop="key">
      </el-table-column>
      <el-table-column label="主体KEY状态" prop="isUseKey">
        <template slot-scope="scope">
          <span>{{ scope.row.isUseKey ? '启用' : '禁用' }}</span>
        </template>
      </el-table-column>
      <el-table-column label="备注" prop="remark">
      </el-table-column>
      <el-table-column v-if="rightActions.length > 0" label="操作" width="350px">
        <template slot-scope="scope">
          <el-button :type="action.cssName" v-for="action in rightActions" :key="action.Id"
            @click="right_execute({action, row: scope.row})">{{action.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 新增组织机构 dialog -->
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'sys-dictionary-mainType',
    components: {
      BusHeader,
      BusDialogForm
    },
    created() {
      this.getData()
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: []
        },
        dialog: {},
        tableListQuery: '1' // 树状
      }
    },
    computed: {
      rightActions() {
        return this.$route.meta.actions && this.$route.meta.actions.rightActions || []
      },
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          // 新增顶级组织机构
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.mainType.dialog,
              title: '新增顶级类型',
              apiKey: action.apiKey
            })
            this.dialog.form.parentId = '0'
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            break
            // 新增子级组织机构
          case 'add_right':
            this.dialog = this.constructDialogData({
              dialogData: pageData.mainType.dialog,
              title: '新增类型',
              apiKey: action.apiKey
            })
            this.dialog.form.parentId = row[0].id
            this.dialog.form.sort = row[0].sort * 100 + (row[0].children.length + 1) * 10
            break
          case 'edit':
            this.dialog = this.constructDialogData({
              dialogData: pageData.mainType.dialog,
              title: '修改类型',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
            this.dialog.form.parentId = row[0].parentId
            break

          default:
            break
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
