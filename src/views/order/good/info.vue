<template>
  <div class="app-container" v-loading="pageLoading">
    <div class="info-wrapper">
      <div class="info">
        <div class="status" :class="currentOrderStatusDic.simplify">
          <div class="tip">
            <span>当前订单状态：{{ currentOrderStatusDic.title }}</span>
          </div>
          <div class="action">
            <!-- <span class="pan-btn pink-btn pointer">关闭订单</span> -->
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
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              <span>{{ scope.row.isBespoke ? '预约购买' : '立即购买' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="送货方式">
            <template slot-scope="scope">
              <span>{{ scope.row.isDelivery ? '送货上门' : '门店自提' }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 发票信息 -->
    <section>
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
              <span>{{ order[0] && order[0].remark }}</span>
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
          <el-table-column label="商品编号" prop="goodsCode"></el-table-column>
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
          <el-table-column label="平台金价">
            <template slot-scope="scope">
              <span>{{ order[0] && `${order[0].platGoldPrice} 克/元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="属性" show-overflow-tooltip>
            <template slot-scope="scope">
              <span type="" v-for="(item, index) in scope.row.orderGoodsSpecList" :key="index">
                {{ item.attrTxt }} /
              </span>
            </template>
          </el-table-column>
          <el-table-column label="数量" prop="count"></el-table-column>
          <el-table-column label="商品价格">
            <template slot-scope="scope">
              <span>{{ scope.row.unitPrice && `${scope.row.unitPrice} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="手续费率">
            <template slot-scope="scope">
              <span>{{ scope.row.poundageRate && `${scope.row.poundageRate} %` }}</span>
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
    <!-- 预约信息 -->
    <section v-if="order[0] && order[0].isBespoke">
      <div class="title">
        <mallki className="mallki-text" text="预约信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="orderInterest">
          <el-table-column label="预约期限">
            <template slot-scope="scope">
              <span>{{ scope.row.term && `${scope.row.term} 天` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="年利率">
            <template slot-scope="scope">
              <span>{{ scope.row.dayRate && `${scope.row.dayRate} %` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="生效时间">
            <template slot-scope="scope">
              <span>{{ scope.row.startTime && getTime(scope.row.startTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="到期日">
            <template slot-scope="scope">
              <span>{{ scope.row.endTime && getTime(scope.row.endTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预计返还优惠金">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.interestMoney && `${scope.row.interestMoney} 元` }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 费用信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="费用信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="商品合计">
            <template slot-scope="scope">
              <span>{{ scope.row.money && `${scope.row.money} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="运费" v-if="order[0] && order[0].isDelivery">
            <template slot-scope="scope">
              <span>{{ scope.row.freight && `${scope.row.freight} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单总金额">
            <template slot-scope="scope">
              <span>{{ scope.row.totalMoney && `${scope.row.totalMoney} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="账户余额抵扣">
            <template slot-scope="scope">
              <span>{{ scope.row.balanceDeduction && `${scope.row.balanceDeduction} 元` }}</span>
            </template>
          </el-table-column>
          <el-table-column label="还需支付">
            <template slot-scope="scope">
              <span style="color:red">{{ scope.row.needPayMoney && `${scope.row.needPayMoney} 元` }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 配送信息 送货上门 orderLogistics 自提 orderExtract -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="配送信息"></mallki>
      </div>
      <div class="content">
        <!-- 快递 -->
        <template v-if="order[0] && order[0].isDelivery">
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
        <template v-else>
          <el-table border :data="orderExtract">
            <el-table-column label="城市" prop="userName"></el-table-column>
            <el-table-column label="门店名称" prop="storeName"></el-table-column>
            <el-table-column label="门店地址" prop="address"></el-table-column>
            <el-table-column label="营业时间">
              <template slot-scope="scope">
                <span>{{ scope.row.storeTime && getTime(scope.row.storeTime) }}</span>
              </template>
            </el-table-column>
            <el-table-column label="预约自提时间" prop="address">
              <template slot-scope="scope">
                <span>{{ scope.row.extractTime && getTime(scope.row.extractTime) }}</span>
              </template>
            </el-table-column>
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
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      this.getInfo()
    },
    methods: Object.assign(func(), {
      init() {
        this.order = []
        this.currentOrderStatusDic = {} // 当前订单状态字典对象
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
          this.currentOrderStatusDic = this.getEnumById(data.result.orderStatus)
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
            remark: this.dialogRemark.remark
          }
        }).then(data => {
          this.dialogRemark.loading = false
          this.dialogRemark.status = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
          this.getInfo()
        }).catch(() => {
          this.dialogRemark.loading = false
        })
      }
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

          &.user_order_reserve {
            // 预约中
            background-image: linear-gradient(298deg, #81FBB8 47%, #28C76F 88%);
          }

          &.user_order_unpaid {
            // 待支付
            background-image: linear-gradient(261deg, #FEB692 0%, #EA5455 100%);
          }

          &.user_order_sending,
          &.user_order_unsend,
          &.user_order_waitgoods,
          &.user_order_extract {
            // 待发货、收货、自提
            background-image: linear-gradient(262deg, #ABDCFF 0%, #0396FF 100%);
          }

          &.user_order_finish {
            // 已完成
            background-image: linear-gradient(270deg, #A8E6CF 0%, #FFD3B6 100%);
          }

          &.user_order_close {
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
