<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status" v-loading="dialog.loading" @close="dialogClose">
      <el-form :model="dialog" ref="dialog" label-width="100px">
        <el-form-item label="名称" prop="name">
          <el-input v-model="dialog.form.name"></el-input>
        </el-form-item>
        <el-form-item label="KEY" prop="key">
          <el-input v-model="dialog.form.key"></el-input>
        </el-form-item>
        <el-form-item label="项目" prop="projectId">
          <el-select v-model="dialog.form.projectId" placeholder="请选择">
            <ElOption value="0" label="公共项目"></ElOption>
            <ElOption v-for="item in projectList" :key="item.id" :value="item.id" :label="item.name"></ElOption>
          </el-select>
        </el-form-item>
        <div style="max-height: 200px;overflow:auto;">
          <el-form-item v-if="dialog.form.typeId">
            <el-row style="border:1px solid #D1D5DE;padding:10px;border-radius:5px;">
              <el-input :placeholder="`请输入${key.name}`" size="mini" v-for="key in keyList" :key="key.id"
                v-model="key.keyValue">
                <template slot="append">{{key.name}}</template>
              </el-input>
            </el-row>
          </el-form-item>
        </div>
        <el-form-item label="描述" prop="remark">
          <el-input v-model="dialog.form.remark"></el-input>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input v-model="dialog.form.sort"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'sys-project-type-allocationInfo',
    components: {
      BusHeader,
      BusTable
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.typeAllocationInfo.tableColumns
        },
        dialog: {
          title: '',
          loading: false,
          status: false,
          apiKey: '',
          form: {}
        },
        keyList: [],
        projectList: [],
        tableListQuery: this.$route.query.id
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      this.getData()
      // 获取此类型下的KEY
      this.$request({
        url: this.hiddenActions['O_KEYS'],
        data: this.$route.query.id
      }).then(data => {
        data.result.map(item => {
          item.keyValue = ''
        })
        this.keyList = data.result
      })
      // 获取所有项目
      this.$request({
        url: this.hiddenActions['O_PROJECTS'],
        data: {
          index: '1',
          size: '10000'
        }
      }).then(data => {
        this.projectList = data.result
      })
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog.title = '新增配置信息'
            this.dialog.status = true
            this.dialog.apiKey = action.apiKey
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            this.dialog.form.typeId = this.$route.query.id
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog.form = row[0]
            // 将content数据绑定到 keyList
            const contentObj = JSON.parse(row[0].content)
            this.keyList.map(item => {
              item['keyValue'] = contentObj[item.keyName]
            })
            this.dialog.title = '修改配置信息'
            this.dialog.status = true
            this.dialog.apiKey = action.apiKey
            this.dialog.form.typeId = this.$route.query.id
            break
          default:
            break;
        }
      },
      dialogClose() {
        this.dialog = {
          title: '',
          status: false,
          form: {}
        }
      },
      dialogSubmit() {
        // 构建content数据
        const content = {}
        this.keyList.map(item => {
          content[item.keyName] = item.keyValue
        })
        // 将content 加入到form
        this.dialog.form.content = JSON.stringify(content)
        this.$request({
          url: this.dialog.apiKey,
          data: this.dialog.form
        }).then(data => {
          this.dialog.status = !data.result
          this.dialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
          this.getData()
        }).catch(() => {
          this.dialog.loading = false
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
