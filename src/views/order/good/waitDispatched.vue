<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="150px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status" width="1000px">
      <div class="wrapper" v-loading="dialog.loading">
        <!-- 收货人信息 -->
        <section>
          <div class="title">
            <mallki className="mallki-text" text="收货人信息"></mallki>
          </div>
          <div class="content">
            <el-table border :data="dialog.orderAddress">
              <el-table-column label="收货人" prop="userName"></el-table-column>
              <el-table-column label="手机号码" prop="phone"></el-table-column>
              <el-table-column label="收货地址" prop="address"></el-table-column>
              <el-table-column label="买家留言">
                <template slot-scope="scope">
                  <span>{{ dialog.order && dialog.order.remark }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
        <!-- 商品信息 -->
        <section>
          <div class="title">
            <mallki className="mallki-text" text="商品信息"></mallki>
          </div>
          <div class="content">
            <el-table border :data="dialog.orderGoodsList">
              <el-table-column label="商品编号" prop="goodsCode" show-overflow-tooltip></el-table-column>
              <el-table-column label="商品名称" prop="goodsName"></el-table-column>
              <el-table-column label="商品克重">
                <template slot-scope="scope">
                  <span>{{ scope.row.weight && `${scope.row.weight} 克` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="加工费">
                <template slot-scope="scope">
                  <span>{{ scope.row.madePrice && `${scope.row.madePrice} 克/元` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="属性" show-overflow-tooltip>
                <template slot-scope="scope">
                  <el-tag type="" v-for="(item, index) in scope.row.orderGoodsSpecList" :key="index">
                    {{ item.specTxt }} : {{ item.attrTxt }}
                  </el-tag>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="count"></el-table-column>
              <el-table-column label="商品价格">
                <template slot-scope="scope">
                  <span>{{ scope.row.unitPrice && `${scope.row.unitPrice} 元` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="手续费" prop="aaa">
                <template slot-scope="scope">
                  <span>{{ scope.row.poundage && `${scope.row.poundage} 元` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="小计">
                <template slot-scope="scope">
                  <span style="color:red">{{ scope.row.totalMoney && `${scope.row.totalMoney} 元` }}</span>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </section>
        <el-input v-model="dialog.form.remark" type="textarea" :rows="5" placeholder="请输入备注"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialog.status = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit" :loading="dialog.loading" :disabled="dialog.loading">确 定
          </el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'order-good-waitDispatched',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      Mallki
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.waitDispatched.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'keywords',
            text: '姓名/手机号',
            type: 'text'
          }, {
            para: 'isDelivery',
            text: '送货方式',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '送货上门',
                value: 'true'
              }, {
                label: '门店自提',
                value: 'false'
              }]
            }
          }, {
            para: 'time',
            text: '开始时间|结束时间',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['startTime', 'endTime']
            }
          }]
        },
        dialog: {
          title: '',
          loading: false,
          status: false,
          apiKey: '',
          form: {},
          order: {},
          orderAddress: [], // 收货人信息
          orderGoodsList: [], // 商品信息
        },
        tableListQuery: {
          status: ['user_order_unsend']
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
          // 发货
          case 'apply':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog.loading = true
            this.dialog.status = true
            this.dialog.title = `订单${row[0].number} 申请发货`
            // 获取订单详情
            this.$request({
              url: this.hiddenActions['O_INFO'],
              data: row[0].id
            }).then(data => {
              this.dialog.order = data.result
              this.dialog.apiKey = action.apiKey
              this.dialog.form = {}
              this.dialog.form.orderId = row[0].id
              // 收货人信息
              this.dialog.orderAddress = []
              this.dialog.orderAddress.push(data.result.orderAddress || [])
              // 商品信息
              this.dialog.orderGoodsList = data.result.orderGoodsList || []
              this.dialog.loading = false
            }).catch(() => {
              this.dialog.loading = false
            })
            break
          default:
            break;
        }
      },
      dialogSubmit() {
        this.$alert(`<strong>订单号 <i>${this.dialog.order.number}</i> 申请发货,请确认操作！！</strong>
        <br/>
        <span style="color:red">备注信息为：${this.dialog.form.remark || '没有填写备注信息'}</span>
        <br/>
        <span style="color:red">确定后将自动向第三方申请出库</span>
        `, '确认发货', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: '取消申请'
        }).then(() => {
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
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
