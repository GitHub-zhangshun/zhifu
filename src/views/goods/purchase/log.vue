<template>
  <div class="app-container">
    <bus-header @updateData="getData_custom" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="100"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status">
      <div class="goodList">
        <el-table :data="dialog.goodsList" border v-loading="dialog.loading">
          <el-table-column label="商品" prop="goodName"></el-table-column>
          <el-table-column label="规格" prop="specStr"></el-table-column>
          <el-table-column label="价格" prop="price"></el-table-column>
          <el-table-column label="重量" prop="weight"></el-table-column>
          <el-table-column label="采购数量" prop="qty"></el-table-column>
          <el-table-column label="已入库" prop="inStockQtyed">
            <template slot-scope="scope">
              <span style="color: red">{{ scope.row.inStockQtyed || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="申请入库" prop="inStockQtying">
            <template slot-scope="scope">
              <span style="color: red">{{ scope.row.inStockQtying || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="可入库数量" prop="inStockQtying">
            <template slot-scope="scope">
              <span style="color: red">{{ numAdd(scope.row.qty, -scope.row.inStockQtyed, -scope.row.inStockQtying)}}</span>
            </template>
          </el-table-column>
          <el-table-column label="本次入库数量" width="150px" fixed="right">
            <template slot-scope="scope">
              <el-input-number v-model="scope.row.now" controls-position="right" :min="0" :max="scope.row.max"
                :disabled="scope.row.disabled"></el-input-number>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialog.submitLoading" :disabled="dialog.submitLoading" @click="dialogSubmit">确 定</el-button>
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
    name: 'goods-purchase-log',
    components: {
      BusHeader,
      BusTable,
      BusPagination
    },
    data() {
      return {
        rules: rules.dialogAuditRules,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.log.tableColumns
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
              showLike: 'log'
            }
          }]
        },
        dialog: {
          title: '申请入库',
          apiKey: '',
          status: false,
          loading: false,
          submitLoading: false,
          form: {},
          orderInfo: {},
          goodsList: []
        },
        tableListQuery: {
          statusSimplifys: ['purchas_no_instock', 'purchas_part_instock', 'purchas_success_instock']
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    async created() {
      await this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          // 申请入库
          case 'apply':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog.title = `采购单: ${row[0].orderCode} 申请入库`
            this.dialog.status = true
            this.dialog.loading = true
            this.dialog.form.orderId = row[0].id
            this.dialog.apiKey = action.apiKey
            // 获取采购单详情
            this.$request({
              url: this.hiddenActions['O_ORDER_INFO'],
              data: row[0].id
            }).then(data => {
              this.dialog.orderInfo = data.result
              this.getShowGoodList()
              this.dialog.loading = false
            }).catch(() => {
              this.dialog.loading = false
            })
            break
          default:
            break;
        }
      },
      getData_custom() {
        this.tableListQuery.statusSimplifys = []
        const statusId = this.search.form.statusId
        statusId && this.tableListQuery.statusSimplifys.push(statusId) || (this.tableListQuery
          .statusSimplifys = ['purchas_no_instock', 'purchas_part_instock', 'purchas_success_instock'])
        this.getData()
      },
      // 获取已添加的商品显示列表数据
      getShowGoodList() {
        let _show = JSON.parse(JSON.stringify(this.dialog.orderInfo.orderProducts))
        this.dialog.goodsList = []
        _show.forEach(item => {
          // // 过滤已经入库完的数据
          // let orderSkus = item.orderSkus.filter(item => item.qty > this.numAdd(item.inStockQtying || 0, item.inStockQtyed || 0))
          item.orderSkus.map(j => {
            j.goodId = item.id
            j.goodName = item.name
            j.price = parseInt(item.price)
            j.weight = item.weight
            j.now = 0
            j.max = this.numAdd(j.qty, -(j.inStockQtying || 0), -(j.inStockQtyed || 0))
            j.disabled = j.max === 0
          })
          this.dialog.goodsList.push(...item.orderSkus.filter(item => item.qty > 0))
        })
      },
      dialogSubmit() {
        // 构造提交数据
        let data = {
          fromId: this.dialog.form.orderId,
          orderProducts: []
        }
        let orderProducts = JSON.parse(JSON.stringify(this.dialog.orderInfo.orderProducts))
        this.dialog.goodsList.forEach(item => {
          orderProducts.map(j => {
            j.orderSkus.map(k => {
              if (k.id === item.id) {
                k.qty = item.now
              }
            })
          })
        })
        data.orderProducts = orderProducts
        this.$confirm('此操作将申请入库, 是否继续? 如果你本次入库数量大于采购数量, 将默认填写为最大入库数量。', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.dialog.submitLoading = true
          this.$request({
            url: this.dialog.apiKey,
            data
          }).then(data => {
            this.dialog.submitLoading = false
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
            this.dialog.status = false
            this.getData_custom()
          }).catch(() => {
            this.dialog.submitLoading = false
          })
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
