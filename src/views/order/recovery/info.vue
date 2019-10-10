<template>
  <div class="app-container" v-loading="pageLoading">
    <div class="info-wrapper">
      <div class="info">
        <div class="status 0" :class="`s${currentStatus}`">
          <div class="tip">
            <span>当前订单状态：{{ currentStatus === '0' ? '待处理' : ( currentStatus === '1' ? '已回收' : '未回收' ) }}</span>
          </div>
          <div class="action">
            <span class="pan-btn green-btn pointer" @click="remarkAction">备注订单</span>
            <span v-if="currentStatus === '0'"
              class="pan-btn pink-btn pointer" @click="audit">审核</span>
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
          <el-table-column label="备注" prop="remark" show-overflow-tooltip></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 回收信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="租赁信息"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="联系人" prop="contactName"></el-table-column>
          <el-table-column label="联系电话" prop="contactPhone"></el-table-column>
          <el-table-column label="黄金类型" prop="goldType"></el-table-column>
          <el-table-column label="黄金重量" prop="weight"></el-table-column>
          <el-table-column label="黄金品牌" prop="goldBrand">
            <template slot-scope="scope">
              <span>{{ scope.row.goldBrand && getEnumById(scope.row.goldBrand).title }}</span>
            </template>
          </el-table-column>
          <el-table-column label="实时回收金价" prop="realTimeGoldPrice"></el-table-column>
          <el-table-column label="回收估价" prop="recoveryPrice"></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 图片信息 -->
    <section>
      <div class="title">
        <mallki className="mallki-text" text="图片信息"></mallki>
      </div>
      <div class="content img">
        <img v-for="img in imgList" :key="img.id" :src="img.resourceLink" alt="" width="200px" height="200px">
      </div>
    </section>
    <!-- 回收结果 -->
    <section v-if="currentStatus !== '0'">
      <div class="title">
        <mallki className="mallki-text" text="回收结果"></mallki>
      </div>
      <div class="content">
        <el-table border :data="order">
          <el-table-column label="是否回收">
            <template slot-scope="scope">
              <span>{{ currentStatus === '1' ? '是' : '否' }}</span>
            </template>
          </el-table-column>
          <template v-if="currentStatus === '1'">
            <el-table-column label="实际黄金类型" prop="actualGoldType"></el-table-column>
            <el-table-column label="实际黄金重量" prop="actualWeight"></el-table-column>
            <el-table-column label="实际回收价格" prop="actualRecoveryPrice"></el-table-column>
          </template>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
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
              <span>{{ scope.row.orderStatus === '0' ? '待处理' : ( scope.row.orderStatus === '1' ? '已回收' : '未回收' ) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="备注" prop="remark"></el-table-column>
        </el-table>
      </div>
    </section>
    <!-- 审核 弹窗 -->
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status">
      <div class="wrapper" v-loading="dialog.loading">
        <el-form :model="dialog.form" ref="form" :rules="rules" label-width="150px">
          <el-form-item label="是否回收" prop="status">
            <el-select v-model="dialog.form.status" placeholder="请选择">
              <el-option label="是" value="1"></el-option>
              <el-option label="否" value="2"></el-option>
            </el-select>
          </el-form-item>
          <template v-if="dialog.form.status === '1'">
            <el-form-item label="实际黄金类型" prop="actualGoldType">
              <el-select v-model="dialog.form.actualGoldType" placeholder="请选择">
                <el-option label="Au999" value="Au999"></el-option>
                <el-option label="Au9999" value="Au9999"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="实际黄金重量" prop="actualWeight">
              <el-input v-model="dialog.form.actualWeight" placeholder="实际租赁黄金重量">
                <span slot="suffix">克</span>
              </el-input>
            </el-form-item>
            <el-form-item label="实际回收价格" prop="actualRecoveryPrice">
              <el-input v-model="dialog.form.actualRecoveryPrice" placeholder="实际回收价格">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
          </template>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="dialog.form.remark" placeholder="备注" type="textarea">
            </el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialog.loading" :disabled="dialog.loading" @click="auditSubmit">确 定
        </el-button>
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
  import rules from './pageRules.js'
  export default {
    name: 'order-lease-info',
    components: {
      Mallki,
      PanThumb
    },
    data() {
      return {
        rules: rules.auditRules,
        giveBackRules: rules.giveBackRules,
        pageLoading: false,
        order: [],
        currentStatus: '1',
        imgList: [],
        orderLogList: [], // 操作记录
        dialog: {
          title: '',
          status: false,
          loading: false,
          form: {
            orderId: this.$route.query.id
          }
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
        this.orderLogList = [] // 操作记录
        this.imgList = []
      },
      getInfo() {
        this.pageLoading = true
        // 获取回收订单详情
        this.$request({
          url: this.hiddenActions['F_INFO'],
          data: this.$route.query.id
        }).then(data => {
          this.init()
          this.order.push(data.result)
          this.imgList = data.result.resourceList
          this.currentStatus = data.result.status.toString()
          // 操作记录
          this.orderLogList = data.result.orderLogList || []
          this.pageLoading = false
        }).catch(() => {
          this.pageLoading = false
        })
      },
      audit() {
        this.dialog.status = true
        this.dialog.title = '审核'
      },
      auditSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialog.form.startTime = this.dialog.form.time && this.dialog.form.time[0]
            this.dialog.form.endTime = this.dialog.form.time && this.dialog.form.time[1]
            this.dialog.loading = true
            this.$request({
              url: this.hiddenActions['O_AUDIT'],
              data: this.dialog.form
            }).then(data => {
              this.dialog.loading = false
              this.dialog.status = false
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
              this.getInfo()
            }).catch(() => {
              this.dialog.loading = false
            })
          }
        })
      },
      giveBack() {
        this.dialogGiveBack.title = '确认归还'
        this.dialogGiveBack.status = true
      },
      giveBackSubmit() {
        this.$refs['giveBackForm'].validate((valid) => {
          if (valid) {
            this.dialogGiveBack.loading = true
            this.$request({
              url: this.hiddenActions['O_GIVEBACK'],
              data: {
                orderId: this.dialogRemark.orderId,
                remark: this.dialogGiveBack.form.remark,
                returnTime: this.dialogGiveBack.form.time
              }
            }).then(data => {
              this.dialogGiveBack.loading = false
              this.dialogGiveBack.status = false
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
              this.getInfo()
            }).catch(() => {
              this.dialogGiveBack.loading = false
            })
          }
        })
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

          &.s0 {
            // 待处理
            background-image: linear-gradient(261deg, #FEB692 0%, #EA5455 100%);
          }

          &.s1 {
            // 已回收
            background-image: linear-gradient(270deg, #A8E6CF 0%, #FFD3B6 100%);
          }

          &.s2 {
            // 未回收
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
      .img{
        // border: 1px solid;
        img{
          margin-right: 3px;
        }
      }
    }
  }

</style>
