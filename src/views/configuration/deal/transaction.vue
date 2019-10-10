<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status" @close="dialogClose">
      <el-form :model="dialog.form" label-width="140px" :rules="rules" ref="form">
        <el-form-item label="开盘价" prop="openPrice">
          <el-input v-model="dialog.form.openPrice" placeholder="开盘价">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="最高价" prop="highestPrice">
          <el-input v-model="dialog.form.highestPrice" placeholder="最高价">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="最低价" prop="minimumPrice">
          <el-input v-model="dialog.form.minimumPrice" placeholder="最低价">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialog.loading" :disabled="dialog.loading" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import rules from './pageRules.js'
  export default {
    name: 'configuration-deal-transaction',
    components: {
      BusHeader,
      BusTable,
      BusPagination
    },
    data() {
      return {
        rules: rules.transaction,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.transaction.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        dialog: {
          title: '设置',
          status: false,
          loading: false,
          form: {}
        },
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'recover':
            this.dialog.status = true
            this.dialog.apiKey = action.apiKey
            break
          default:
            break;
        }
      },
      dialogClose() {
        this.dialog.form = {}
      },
      dialogSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialog.loading = true
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
      },
      func_execute(action, row) {
        this.$confirm('此操作将关闭平台交易, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.table.loading = true
          this.$request({
            url: action.apiKey
          }).then(data => {
            this.table.loading = false
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
            this.getData()
          }).catch(() => {
            this.table.loading = false
          })
        }).catch(() => {
          this.$message.success('三思而后行 点赞 👍')
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
