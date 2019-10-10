<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
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
    name: 'goods-purchase-outer',
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
          columns: pageData.outer.tableColumns
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
            text: '出库单编号',
            type: 'text'
          }, {
            para: 'status',
            text: '状态',
            type: 'dictionary',
            details: {
              simplify: 'outstock_order_status',
              outer: true
            }
          }]
        },
        dialog: {}
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
      func_execute(action, row) {
        switch (action.routeKey) {
          // 撤销
          case 'revoke':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$confirm('撤销入库, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.table.loading = true
              this.$request({
                url: action.apiKey,
                data: row[0].id
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
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
