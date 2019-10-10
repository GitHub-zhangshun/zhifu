<template>
  <div class="app-container" v-loading="pageLoading">
    <div class="info-wrapper">
      <div class="info">
        <div class="status" :class="currentOrderStatusDic.simplify">
          <div class="tip">
            <span>当前订单状态：{{ currentOrderStatusDic.title }}</span>
            <span style="color: red"
              v-if="currentOperaOrderStatusDic && currentOperaOrderStatusDic.title">({{ currentOperaOrderStatusDic.title }})</span>
          </div>
          <div class="action">
            <!-- <span
              v-if="currentOperaOrderStatusDic && currentOperaOrderStatusDic.simplify === 'gold_order_oper_lease' && order && order[0] && order[0].extendId"
              class="pan-btn light-blue-btn pointer" @click="showOrder('lease')">查看出租订单</span> -->
            <!-- <span
              v-if="currentOperaOrderStatusDic && currentOperaOrderStatusDic.simplify === 'gold_order_oper_extract' && order && order[0] && order[0].extendId"
              class="pan-btn light-blue-btn pointer" @click="showOrder('extract')">查看提货订单</span> -->
            <span v-if="currentOrderStatusDic && currentOrderStatusDic.simplify === 'gold_delivery_order_unsend'"
              class="pan-btn light-blue-btn pointer" @click="dispatchedOrder">订单发货</span>
            <span v-if="currentOrderStatusDic && currentOrderStatusDic.simplify === 'gold_delivery_order_extract'"
              class="pan-btn light-blue-btn pointer" @click="cancelOrder">订单核销</span>
            <span class="pan-btn green-btn pointer" @click="remarkAction">备注订单</span>
            <span class="pan-btn pink-btn pointer" @click="downContract">下载合同</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 基本信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="基本信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="订单编号" prop="number"></el-table-column>
          <el-table-column label="用户姓名" prop="name"></el-table-column>
          <el-table-column label="手机号码" prop="phone"></el-table-column>
          <el-table-column label="订单来源">
            <template slot-scope="scope">
              <span>{{ scope.row.sourceType && getEnumById(scope.row.sourceType).title }}</span>
            </template>
          </el-table-column>
          <el-table-column v-if="pageType === 'delivery'" label="送货方式">
            <template slot-scope="scope">
              <span>{{ scope.row.isDelivery ? '送货上门' : '自提' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 发票信息 -->
    <section v-if="pageType === 'delivery' || pageType === 'pick'">
      <div class="title">
        <mallki className="mallki-text" text="发票信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="orderInvoice">
          <el-table-column label="抬头类型">
            <template slot-scope="scope">
              <span>{{ scope.row.isPersonal ? '个人' : '企业' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="发票抬头" prop="title"></el-table-column>
          <el-table-column v-if="orderInvoice[0] && !orderInvoice[0].isPersonal" label="纳税人识别号" prop="taxNumber">
          </el-table-column>
          <el-table-column label="发票内容" prop="remark"></el-table-column>
          <el-table-column label="发票金额">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.money }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 收货人信息 -->
    <section v-if="pageType === 'delivery'">
      <div class="title">
        <mallki className="mallki-text" text="收货人信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="orderAddress">
          <el-table-column label="收货人" prop="userName"></el-table-column>
          <el-table-column label="手机号码" prop="phone"></el-table-column>
          <el-table-column label="收货地址" prop="address"></el-table-column>
          <el-table-column label="买家留言">
            <template slot-scope="scope">
              <span>{{ order[0] && order[0].remark }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 费用信息 -->
    <section v-if="!pageType">
      <div class="title">
        <mallki className="mallki-text" text="费用信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="黄金类型">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.goldType && getEnumById(scope.row.goldType).title }}</span> -->
              <span>Au9999</span>
            </template>
          </el-table-column>
          <el-table-column label="平台金价">
            <template slot-scope="scope">
              <span>{{ scope.row.platGoldPrice && `${scope.row.platGoldPrice} 元/克` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="黄金克重">
            <template slot-scope="scope">
              <span>{{ scope.row.weight && `${scope.row.weight} 克` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单金额">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.money && `￥ ${scope.row.money}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="余额抵扣">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.balanceDeduction && `￥ ${scope.row.balanceDeduction}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="还需支付">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.needPayMoney && `￥ ${scope.row.needPayMoney}` }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 关联黄金订单信息 pageType leased delivery -->
    <section v-if="pageType === 'leased' || pageType === 'delivery' || pageType === 'pick'">
      <div class="title">
        <mallki className="mallki-text" text="关联黄金订单信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="goldOrderList">
          <el-table-column label="黄金类型">
            <template slot-scope="scope">
              <!-- <span>{{ scope.row.goldType && getEnumById(scope.row.goldType).title }}</span> -->
              <span>Au9999</span>
            </template>
          </el-table-column>
          <el-table-column label="平台金价">
            <template slot-scope="scope">
              <span>{{ scope.row.platGoldPrice && `${scope.row.platGoldPrice} 元/克` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="黄金克重">
            <template slot-scope="scope">
              <span>{{ scope.row.weight && `${scope.row.weight} 克` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单金额">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.money && `￥ ${scope.row.money}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="showOrder('base', scope.row)">查看订单</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 费用信息 提货单 -->
    <section v-if="pageType === 'delivery'">
      <div class="title">
        <mallki className="mallki-text" text="费用信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="运费">
            <template slot-scope="scope">
              <span>{{ scope.row.freight && `￥ ${scope.row.freight}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账户余额抵扣">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.balanceDeduction && `￥ ${scope.row.balanceDeduction}` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="还需支付">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.needPayMoney && `￥ ${scope.row.needPayMoney}` }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 出租收益 pageType leased -->
    <section v-if="pageType === 'leased'">
      <div class="title">
        <mallki className="mallki-text" text="出租收益"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="出租期限">
            <template slot-scope="scope">
              <span>{{ scope.row.termDay && `${scope.row.termDay} 天` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="收益率">
            <template slot-scope="scope">
              <span>{{ scope.row.profitRate && `${scope.row.profitRate} %` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到期日">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.endTime && getTime(scope.row.endTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预计收益">
            <template slot-scope="scope">
              <span>{{ scope.row.profitMoney && `${scope.row.profitMoney} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="是否提货">
            <template slot-scope="scope">
              <span>{{ scope.row.extractStatus === 0 ? '未选择' : (scope.row.extractStatus === 1 ? '是' : '否') }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 配送信息 pageType delivery -->
    <section v-if="pageType === 'delivery' || pageType === 'pick'">
      <div class="title">
        <mallki className="mallki-text" text="配送信息"></mallki>
      </div>
      <div class="content">
        <!-- 物流 -->
        <template v-if="pageType === 'delivery'">
          <el-table border :data="orderLogistics">
            <el-table-column label="快递公司" prop="name"></el-table-column>
            <el-table-column label="物流单号" prop="number"></el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="text" @click="showLogistics">查看物流信息</el-button>
              </template>
            </el-table-column>
          </el-table>
        </template>
        <!-- 自提 -->
        <template v-if="pageType === 'pick'">
          <el-table border :data="orderExtract">
            <!-- <el-table-column label="城市" prop="name"></el-table-column> -->
            <el-table-column label="门店名称" prop="storeName"></el-table-column>
            <el-table-column label="门店地址" prop="address"></el-table-column>
            <el-table-column label="营业时间" prop="businessHours"></el-table-column>
            <el-table-column label="预约自提时间" prop="extractTimeTxt"></el-table-column>
            <el-table-column label="买家留言" prop="remark"></el-table-column>
          </el-table>
        </template>
      </div>
    </section>
    <!-- 操作信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="操作信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="orderLogList">
          <el-table-column label="操作者" prop="operUser"></el-table-column>
          <el-table-column label="操作时间">
            <template slot-scope="scope">
              <span>{{ scope.row.createTime && getTime(scope.row.createTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <span>{{ scope.row.orderStatus && getEnumById(scope.row.orderStatus).title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 物流详细信息 弹窗 -->
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status">
      <div class="wrapper" style="height: 600px;overflow:auto;padding:32px;" v-loading="dialog.loading">
        <el-timeline>
          <el-timeline-item v-for="(item, index) in orderLogisticsInfo.traceDetail" :key="index"
            :type="item.type || 'warning'" :timestamp="item.opTime" placement="top">
            <el-card>
              <h4>{{ item.opDesc }}</h4>
              <p>{{ item.opLocation }}</p>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-dialog>
    <!-- 备注信息 弹窗 -->
    <el-dialog v-el-drag-dialog :title="dialogRemark.title" :visible.sync="dialogRemark.status">
      <el-input v-model="dialogRemark.remark" placeholder="请输入备注" type="textarea" :rows="5"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogRemark.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialogRemark.loading" :disabled="dialogRemark.loading" @click="submit">确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 订单核销 弹窗 -->
    <el-dialog v-el-drag-dialog :title="dialogCancel.title" :visible.sync="dialogCancel.status">
      <el-input v-model="dialogCancel.code" placeholder="请输入自提吗" type="textarea" :rows="5"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialogCancel.loading" :disabled="dialogCancel.loading" @click="submitCancel">确 定
        </el-button>
      </div>
    </el-dialog>
    <!-- 订单发货 弹窗 -->
    <el-dialog v-el-drag-dialog :title="dialogFh.title" :visible.sync="dialogFh.status" width="1000px">
      <div class="wrapper" v-loading="dialogFh.loading">
        <!-- 收货人信息 -->
        <section>
          <div class="title">
            <mallki className="mallki-text" text="收货人信息"></mallki>
          </div>
          <div class="content">
            <el-table border :data="orderAddress">
              <el-table-column label="收货人" prop="userName"></el-table-column>
              <el-table-column label="手机号码" prop="phone"></el-table-column>
              <el-table-column label="收货地址" prop="address"></el-table-column>
              <el-table-column label="买家留言">
                <template slot-scope="scope">
                  <span>{{ order && order[0] && order[0].remark }}</span>
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
            <el-table border :data="orderGoodsList">
              <el-table-column label="商品编号" prop="goodsCode" show-overflow-tooltip></el-table-column>
              <el-table-column label="商品名称" prop="goodsName"></el-table-column>
              <el-table-column label="商品克重">
                <template slot-scope="scope">
                  <span>{{ scope.row.weight && `${scope.row.weight} 克` }}</span>
                </template>
              </el-table-column>
              <el-table-column label="数量" prop="count"></el-table-column>
            </el-table>
          </div>
        </section>
        <el-input v-model="dialogFh.form.remark" type="textarea" :rows="5" placeholder="请输入备注"></el-input>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogFh.status = false">取 消</el-button>
          <el-button type="primary" @click="dialogSubmit" :loading="dialogFh.loading" :disabled="dialogFh.loading">确 定
          </el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import PanThumb from '@/components/PanThumb'
  import func from '@/common/func'
  export default {
    name: 'order-good-info',
    components: {
      Mallki,
      PanThumb
    },
    data() {
      return {
        pageLoading: false,
        order: [],
        currentOrderStatusDic: {}, // 当前订单状态字典对象
        currentOperaOrderStatusDic: {}, // 当前订单操作状态字典对象
        goldOrderList: [], // 黄金订单集合
        orderInvoice: [], // 发票信息
        orderAddress: [], // 收货人信息
        orderGoodsList: [], // 商品信息
        orderInterest: [], // 预约信息
        orderExtract: [], // 自提信息
        orderLogistics: [], // 物流信息
        orderLogisticsInfo: [], // 物流详情
        contractFinish: {}, // 电子合同信息
        orderLogList: [], // 操作记录
        dialog: {
          title: '',
          status: false,
          loading: false
        },
        dialogRemark: {
          title: '',
          status: false,
          loading: false,
          remark: '',
          orderId: this.$route.query.id
        },
        dialogCancel: {
          title: '',
          status: false,
          loading: false,
          code: '',
          orderId: this.$route.query.id
        },
        dialogFh: {
          title: '',
          loading: false,
          status: false,
          apiKey: '',
          form: {
            orderId: this.$route.query.id
          },
        },
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      pageType() {
        return this.$route.meta.type
      }
    },
    created() {
      this.getInfo()
    },
    methods: Object.assign(func(), {
      init() {
        this.order = []
        this.currentOrderStatusDic = {} // 当前订单状态字典对象
        this.currentOperaOrderStatusDic = {} // 当前订单操作状态字典对象
        this.goldOrderList = [] // 黄金订单集合
        this.orderInvoice = [] // 发票信息
        this.orderAddress = [] // 收货人信息
        this.orderGoodsList = [] // 商品信息
        this.orderInterest = [] // 预约信息
        this.orderExtract = [] // 自提信息
        this.orderLogistics = [] // 物流信息
        this.orderLogisticsInfo = [] // 物流详情
        this.contractFinish = {} // 电子合同信息
        this.orderLogList = [] // 操作记录
      },
      getInfo() {
        this.pageLoading = true
        // 获取用户详情
        this.$request({
          url: this.hiddenActions['F_INFO'],
          data: this.$route.query.id
        }).then(data => {
          this.init()
          this.order.push(data.result)
          // 获取当前订单状态字典对象
          this.currentOrderStatusDic = this.getEnumById(data.result.status)
          // 获取当前订单操作状态字典对象
          this.currentOperaOrderStatusDic = this.getEnumById(data.result.operStatus)
          // 黄金订单集合
          this.goldOrderList = data.result.goldOrderList || []
          // 发票信息
          data.result.orderInvoice && this.orderInvoice.push(data.result.orderInvoice)
          // 收货人信息
          data.result.orderAddress && this.orderAddress.push(data.result.orderAddress)
          // 商品信息
          this.orderGoodsList = data.result.orderGoodsList || []
          // 预约信息
          data.result.orderInterest && this.orderInterest.push(data.result.orderInterest)
          // 自提信息
          data.result.orderExtract && this.orderExtract.push(data.result.orderExtract)
          // 物流信息
          data.result.orderLogistics && this.orderLogistics.push(data.result.orderLogistics)
          // 电子合同信息
          this.contractFinish = data.result.contractFinish
          // 操作记录
          this.orderLogList = data.result.orderLogList || []
          this.pageLoading = false
        }).catch(() => {
          this.pageLoading = false
        })
      },
      showLogistics() {
        // 获取物流信息
        this.dialog.loading = true
        this.dialog.status = true
        this.dialog.title = '物流跟踪信息'
        this.$request({
          url: this.hiddenActions['O_LOGISTICS'],
          data: this.$route.query.id
        }).then(data => {
          this.orderLogisticsInfo = data.result
          this.orderLogisticsInfo.traceDetail.map((item, index) => {
            item.type = index === 0 ? 'success' : 'info'
          })
          this.dialog.loading = false
        }).catch(() => {
          this.dialog.loading = false
        })
      },
      downContract() {
        if (!this.contractFinish) {
          this.$message.warning('未获取到电子合同数据')
          return
        }
        window.open(this.contractFinish.finishLink)
      },
      remarkAction() {
        this.dialogRemark.remark = ''
        this.dialogRemark.title = '订单备注'
        this.dialogRemark.status = true
      },
      submit() {
        if (!this.dialogRemark.remark) {
          this.$message.error('请输入备注')
          return
        }
        this.dialogRemark.loading = true
        this.$request({
          url: this.hiddenActions['O_ADD_REMARK'],
          data: {
            orderId: this.dialogRemark.orderId,
            remark: this.dialogRemark.remark,
            type: this.pageType === 'leased' ? '2' : (this.pageType === 'delivery' || this.pageType === 'pick' ? '3' : '1')
          }
        }).then(data => {
          this.dialogRemark.loading = false
          this.dialogRemark.status = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
          this.getInfo()
        }).catch(() => {
          this.dialogRemark.loading = false
        })
      },
      showOrder(type, row) {
        if (type === 'base') {
          // 黄金订单
          this.$router.push({
            path: '/order/gold/list/info',
            query: {
              id: row.id,
              name: row.number
            }
          })
        } else if (type === 'lease') {
          // 出租订单
          this.$router.push({
            path: '/order/gold/leased/info',
            query: {
              id: this.order[0].id,
              name: this.order[0].number
            }
          })
        } else if (type === 'extract') {
          // 提货订单
          this.$router.push({
            path: '/order/gold/delivery/info',
            query: {
              id: this.order[0].id,
              name: this.order[0].number
            }
          })
        }
      },
      dispatchedOrder() {
        // this.dialogFh.loading = true
        this.dialogFh.status = true
        this.dialogFh.title = `订单${this.order[0].number} 申请发货`
      },
      dialogSubmit() {
        this.$alert(`<strong>订单号 <i>${this.order[0].number}</i> 申请发货,请确认操作！！</strong>
        <br/>
        <span style="color:red">备注信息为：${this.dialogFh.form.remark || '没有填写备注信息'}</span>
        <br/>
        <span style="color:red">确定后将自动向第三方申请出库</span>
        `, '确认发货', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: '取消申请'
        }).then(() => {
          this.dialogFh.loading = true
          this.$request({
            url: this.hiddenActions['O_DISPATCHED'],
            data: this.dialogFh.form
          }).then(data => {
            this.dialogFh.status = !data.result
            this.dialogFh.loading = false
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
            this.getInfo()
          }).catch(() => {
            this.dialogFh.loading = false
          })
        })
      },
      cancelOrder() {
        this.dialogCancel.status = true
        this.dialogCancel.title = `订单${this.order[0].number} 核销`
      },
      submitCancel() {
        this.$alert(`<strong>订单号 <i>${this.order[0].number}</i> 核销,请确认操作！！</strong>
        <br/>
        <span style="color:red">自提码为：${this.dialogCancel.code || '没有填写自提码信息'}</span>
        `, '确认核销', {
          dangerouslyUseHTMLString: true,
          showCancelButton: true,
          cancelButtonText: '取消核销'
        }).then(() => {
          this.dialogCancel.loading = true
          this.$request({
            url: this.hiddenActions['O_CANCEL'],
            data: {
              orderId: this.dialogCancel.orderId,
              code: this.dialogCancel.code
            }
          }).then(data => {
            this.dialogCancel.status = !data.result
            this.dialogCancel.loading = false
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
            this.getInfo()
          }).catch(() => {
            this.dialogCancel.loading = false
          })
        })
      },
    })
  }

</script>
<style lang="scss" scoped>
  .app-container {
    padding-bottom: 64px;
    // position: relative;


    .info-wrapper {
      .info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .status {
          display: flex;
          justify-content: center;
          align-items: center;

          &.gold_order_unpaid,
          &.gold_delivery_order_unsend {
            // 待支付 待发货
            background-image: linear-gradient(261deg, #FEB692 0%, #EA5455 100%);
          }

          &.gold_lease_order_leasing,
          &.gold_delivery_order_sending {
            // 出租中 发货中
            background-image: linear-gradient(298deg, #81FBB8 47%, #28C76F 88%);
          }

          &.gold_delivery_order_waitgoods,
          &.gold_delivery_order_extract {
            // 待收货 待自提
            background-image: linear-gradient(262deg, #ABDCFF 0%, #0396FF 100%);
          }

          &.gold_order_finish,
          &.gold_lease_order_finsh,
          &.gold_delivery_order_finish {
            // 已完成
            background-image: linear-gradient(270deg, #A8E6CF 0%, #FFD3B6 100%);
          }

          &.gold_order_close {
            // 已关闭
            background-image: linear-gradient(255deg, #D4D2CA 0%, #242425 100%);
          }

          padding: 16px;
          border-radius: 15px;

          .tip {
            color: #fff;
            font-size: 24px;
          }

          .action {
            display: flex;
            justify-content: flex-end;

            span {
              margin-left: 8px;
            }

            flex: 1;
          }
        }

        .step {
          flex: 1;
          margin-bottom: 16px;
        }
      }
    }

    section {
      margin-top: 16px;
    }
  }

</style>
