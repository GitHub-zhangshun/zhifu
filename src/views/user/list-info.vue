<template>
  <div class="app-container">
    <div class="info-wrapper">
      <div class="info">
        <table border="1" bordercolor="#ccc" width="" cellspacing="0" cellpadding="5">
          <tr>
            <td class="avatar" rowspan="4">
              <PanThumb width="100px" height="100px" :image="user.imgLink || require('@/assets/img/Avatar2.gif')">
                (*^__^*)
              </PanThumb>
            </td>
            <td class="title">昵称</td>
            <td class="text">{{user.nick}}</td>
            <td class="title">姓名</td>
            <td class="text">{{user.name}}</td>
          </tr>
          <tr>
            <td class="title">性别</td>
            <td class="text">{{user.sex === 1 ? '男' : (user.sex === 2 ? '女' : '保密')}}</td>
            <td class="title">年龄</td>
            <td class="text">{{user.age}}</td>
          </tr>
          <tr>
            <td class="title">籍贯</td>
            <td class="text">{{user.nativePlace}}</td>
            <td class="title">注册时间</td>
            <td class="text">{{getTime(user.createTime)}}</td>
          </tr>
          <tr>
            <td class="title">当前手机号</td>
            <td class="text">{{user.phone}}</td>
            <td class="title">用户来源</td>
            <td class="text">{{getEnumById(user.sourceId).title}}</td>
          </tr>
        </table>
      </div>
    </div>
    <!-- 认证信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="认证信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="userArray">
          <el-table-column label="认证状态">
            <template slot-scope="scope">
              <span>{{ scope.row.isRealName ? '已认证' : '未认证' }}</span>
            </template>
          </el-table-column>
          <el-table-column label="认证时间">
            <template slot-scope="scope">
              <span>{{ getTime(scope.row.authTime) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="开户姓名" prop="name"></el-table-column>
          <el-table-column label="身份证" prop="idCard"></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 当前银行卡信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="银行卡信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="bankAccount">
          <el-table-column label="姓名" prop="name"></el-table-column>
          <el-table-column label="银行" prop="bankName"></el-table-column>
          <el-table-column label="银行卡号" prop="cardNumber"></el-table-column>
          <el-table-column label="预留手机号" prop="phone"></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 账户资金信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="账户资金信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="capitalInfo">
          <el-table-column label="账户余额" prop="balance">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.balance) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="待返优惠金金额" prop="unreceiveInterest">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.unreceiveInterest) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已返优惠金金额" prop="receiveInterest">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.receiveInterest) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预计待收收益" prop="unreceiveProfit">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.unreceiveProfit) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="已收收益" prop="receiveProfit">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.receiveProfit) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 用户金库信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="用户金库信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="capitalInfo">
          <el-table-column label="待确认" prop="confirmGold">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.confirmGold, true) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="出租中" prop="leaseingGold">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.leaseingGold, true) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="预约中" prop="reserveGold">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.reserveGold, true) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总克数" prop="goldWeightSum">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.goldWeightSum, true) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 消费信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="消费信息"></mallki>
      </div>
      <div class="content">
        <!-- 立即购买订单 -->
        <el-table border :data="consumerInfo.goodsOrder" v-if="consumerInfo.goodsOrder.length > 0">
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              <span>立即购买</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额(已支付)">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.consumerMoney) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(待发货)" prop="user_order_unsend">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_unsend || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(待收货)" prop="user_order_waitgoods">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_waitgoods || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(已完成)" prop="user_order_finish">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_finish || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(已关闭)" prop="user_order_close">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_close || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总重量(克)">
            <template slot-scope="scope">
              <span>{{ scope.row.weightSum || 0 }} 克</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 预约购买订单 -->
        <el-table border :data="consumerInfo.bespokeOrder" v-if="consumerInfo.bespokeOrder.length > 0">
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              <span>预约购买</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额(已支付)">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.consumerMoney) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(预约中)" prop="user_order_reserve">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_reserve || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(待发货)" prop="user_order_unsend">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_unsend || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(待收货)" prop="user_order_waitgoods">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_waitgoods || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(已完成)" prop="user_order_finish">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_finish || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(已关闭)" prop="user_order_close">
            <template slot-scope="scope">
              <span>{{ scope.row.user_order_close || 0 }}</span>
            </template>
          </el-table-column>
          <el-table-column label="总重量(克)">
            <template slot-scope="scope">
              <span>{{ scope.row.weightSum || 0 }} 克</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- 黄金订单 -->
        <el-table border :data="consumerInfo.goldOrder" v-if="consumerInfo.goldOrder.length > 0">
          <el-table-column label="订单类型">
            <template slot-scope="scope">
              <span>黄金购买</span>
            </template>
          </el-table-column>
          <el-table-column label="消费金额(已支付)">
            <template slot-scope="scope">
              <span>{{ numberFormat(scope.row.consumerMoney) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单数量(已完成)" prop="orderQuantity"></el-table-column>
          <el-table-column label="总重量(克)">
            <template slot-scope="scope">
              <span>{{ scope.row.weightSum || 0 }} 克</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 收货地址信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="收货地址信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="user.addressList || []">
          <el-table-column label="收货人" prop="userName"></el-table-column>
          <el-table-column label="手机号码" prop="phone"></el-table-column>
          <el-table-column label="详细地址" prop="address"></el-table-column>
          <el-table-column label="默认地址">
            <template slot-scope="scope">
              <span>{{scope.row.isDefault?'是':'否'}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </section>
  </div>
</template>
<script>
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import PanThumb from '@/components/PanThumb'
  import func from '@/common/func'
  export default {
    name: 'user-list-info',
    components: {
      Mallki,
      PanThumb
    },
    data() {
      return {
        user: {},
        openAccountInfo: [],
        bankAccount: [],
        userArray: [],
        consumerInfo: {
          goodsOrder: [], // 立即购买订单
          bespokeOrder: [], // 预约购买订单
          goldOrder: [], // 黄金订单
        },
        capitalInfo: [] // 资金信息
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      // 获取用户详情
      this.$request({
        url: this.hiddenActions['F_INFO'],
        data: this.$route.query.id
      }).then(data => {
        this.user = data.result
        // 主信息
        this.userArray.push(data.result)
        // 认证信息
        data.result.depositoryAccount && this.openAccountInfo.push(data.result.depositoryAccount)
        // 银行卡信息
        data.result.bankAccount && (this.bankAccount = data.result.bankAccount)
      })
      // 获取用户消费信息
      this.$request({
        url: this.hiddenActions['O_USER_COMSUMER'],
        data: this.$route.query.id
      }).then(data => {
        data.result && data.result.goodsOrder && this.consumerInfo.goodsOrder.push(data.result.goodsOrder)
        data.result && data.result.bespokeOrder && this.consumerInfo.bespokeOrder.push(data.result.bespokeOrder)
        data.result && data.result.goldOrder && this.consumerInfo.goldOrder.push(data.result.goldOrder)
        // 获取每种订单状态的数量
        this.consumerInfo.goodsOrder.map(item => {
          item.orderStatusInfo.map(j => {
            item[this.getEnumSimplifyById(j.status)] = j.count
          })
        })
        this.consumerInfo.bespokeOrder.map(item => {
          item.orderStatusInfo.map(j => {
            item[this.getEnumSimplifyById(j.status)] = j.count
          })
        })
      })
      // 获取用户资金信息
      this.$request({
        url: this.hiddenActions['O_USER_CAPITAL'],
        data: this.$route.query.id
      }).then(data => {
        data.result && this.capitalInfo.push(data.result)
      })
    },
    methods: Object.assign(func(), {

    })
  }

</script>
<style lang="scss" scoped>
  .app-container {
    padding-bottom: 64px;

    .info-wrapper {
      .info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;

        .avatar {
          padding: 16px 32px;
          background: rgba(235, 240, 238, 0.5);
        }

        .title {
          text-align: right;
          background: rgba(235, 240, 238, 0.5);
          color: #909399;
          font-size: 16px;
          width: 188px;
          padding: 8px 16px 8px 8px;
        }

        .text {
          color: #9DA0A5;
          padding: 8px;
          width: 400px;
          font-size: 14px;
        }
      }
    }

    section {
      margin-top: 16px;
    }
  }

</style>
