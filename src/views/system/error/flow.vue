<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status" v-loading="dialog.loading">
      <el-table :data="dialog.table">
        <el-table-column label="时间">
          <template slot-scope="scope">
            <span>{{ scope.row.createTime && getTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column label="结果" prop="result">
        </el-table-column>
      </el-table>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'sys-error-flow',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.flow.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        dialog: {
          title: '',
          loading: false,
          status: false,
          apiKey: '',
          table: {}
        },
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'log':
            // 获取日志
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$request({
              url: action.apiKey,
              data: row[0].id
            }).then(data => {
              this.dialog.status = true
              this.dialog.table = data.result
            })
            break
          default:
            break;
        }
      },
      func_execute(action, row) {
        if (row.length !== 1) {
          this.$message.info('请选择一条数据')
          return
        }
        this.$confirm('处理异常, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.table.loading = true
          this.$request({
            url: action.apiKey,
            data: row[0].id
          }).then(data => {
            this.table.loading = false
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
            this.getData()
          }).catch(() => {
            this.table.loading = false
          })
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
