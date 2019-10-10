<template>
  <div class="app-container">
    <bus-header @updateData="getData_custom" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="100"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
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
    name: 'goods-purchase-list',
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
          columns: pageData.list.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'orderCode',
            text: '订单编号',
            type: 'text'
          }, {
            para: 'statusId',
            text: '状态',
            type: 'dictionary',
            details: {
              simplify: 'purchase_order_status',
              outer: true,
              showLike: 'apply'
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          statusSimplifys: ['purchas_submit', 'purchas_verify_failed']
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
          // 设置推荐
          case 'set_recommend':
            if (row.length === 0) {
              this.$message.info('请选择数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog_recommend,
              title: '设置推荐',
              apiKey: action.apiKey
            })
            this.dialog.rows = row
            break
            // 设置热门
          case 'set_hot':
            if (row.length === 0) {
              this.$message.info('请选择数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog_hot,
              title: '设置热门',
              apiKey: action.apiKey
            })
            this.dialog.rows = row
            break
          default:
            break;
        }
      },
      /** 自定义弹窗提交事件 */
      dialogSubmit() {
        let data = []
        // 构造数据
        let _form = this.dialog.form
        this.dialog.rows.forEach(item => {
          _form.id = item.id
          data.push(JSON.parse(JSON.stringify(_form)))
        })
        this.dialog.loading = true
        this.$request({
          url: this.dialog.apiKey,
          data,
        }).then(data => {
          this.dialog.status = !data.result
          this.dialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
          this.getData()
        }).catch(() => {
          this.dialog.loading = false
        })
      },
      func_execute(action, row) {
        switch (action.routeKey) {
          // 审核
          case 'apply':
            if (row.length === 0) {
              this.$message.info('请选择数据')
              return
            }
            this.$confirm('提交审核, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.table.loading = true
              let ids = []
              row.forEach(item => {
                ids.push(item.id)
              })
              this.$request({
                url: action.apiKey,
                data: ids
              }).then(data => {
                data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
                this.table.loading = false
                this.getData()
              }).catch(() => {
                this.table.loading = false
              })
            })
            break;
          default:
            break;
        }
      },
      getData_custom() {
        this.tableListQuery.statusSimplifys = []
        const statusId = this.search.form.statusId
        statusId && this.tableListQuery.statusSimplifys.push(statusId) || (this.tableListQuery
          .statusSimplifys = ['purchas_submit', 'purchas_verify_failed'])
        this.getData()
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
