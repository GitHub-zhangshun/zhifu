<template>
  <div class="app-container">
    <div class="wrapper">
      <el-form :model="form" label-width="180px" :rules="rules" ref="form">
        <el-form-item label="最低充值金额" prop="minimumRecharge">
          <el-input v-model="form.minimumRecharge" placeholder="最低充值金额">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <el-form-item label="最低提现金额" prop="minimumWithdraw">
          <el-input v-model="form.minimumWithdraw" placeholder="最低提现金额">
            <span slot="suffix">元</span>
          </el-input>
        </el-form-item>
        <!-- T+1 -->
        <el-form-item label="T+1">
          <el-switch v-model="form.isOpenOne" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <template v-if="form.isOpenOne">
          <div class="desc">
            <el-form-item label="阶梯值" prop="limitMoney">
              <el-input v-model="form.limitMoney" placeholder="阶梯值">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="描述" prop="oneRemark">
              <el-input v-model="form.oneRemark" type="textarea" :rows="2" placeholder="描述"></el-input>
            </el-form-item>
          </div>
          <div class="wrapper-inner">
            <div class="item">
              <span>阶梯值以上</span>
              <el-form-item label="单笔" prop="oneUpperMoney">
                <el-input v-model="form.oneUpperMoney" placeholder="阶梯值以上手续费(单笔)">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
              <el-form-item label="比例" prop="oneUpperRate">
                <el-input v-model="form.oneUpperRate" placeholder="阶梯值以上手续费(比例)">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </div>
            <div class="item">
              <span>阶梯值以下</span>
              <el-form-item label="单笔" prop="oneLowerMoney">
                <el-input v-model="form.oneLowerMoney" placeholder="阶梯值以下手续费(单笔)">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
              <el-form-item label="比例" prop="oneLowerRate">
                <el-input v-model="form.oneLowerRate" placeholder="阶梯值以下手续费(比例)">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </template>
        <!-- T+0 -->
        <el-form-item label="T+0">
          <el-switch v-model="form.isOpenTimely" active-color="#13ce66" inactive-color="#ff4949">
          </el-switch>
        </el-form-item>
        <template v-if="form.isOpenTimely">
          <div class="desc t0">
            <el-form-item label="阶梯值" prop="limitTimelyMoney">
              <el-input v-model="form.limitTimelyMoney" placeholder="阶梯值">
                <span slot="suffix">元</span>
              </el-input>
            </el-form-item>
            <el-form-item label="描述" prop="timelyRemark">
              <el-input v-model="form.timelyRemark" type="textarea" :rows="2" placeholder="描述"></el-input>
            </el-form-item>
          </div>
          <div class="wrapper-inner t0">
            <div class="item">
              <span>阶梯值以上</span>
              <el-form-item label="单笔" prop="timelyUpperMoney">
                <el-input v-model="form.timelyUpperMoney" placeholder="阶梯值以上手续费(单笔)">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
              <el-form-item label="比例" prop="timelyUpperRate">
                <el-input v-model="form.timelyUpperRate" placeholder="阶梯值以上手续费(比例)">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </div>
            <div class="item">
              <span>阶梯值以下</span>
              <el-form-item label="单笔" prop="timelyLowerMoney">
                <el-input v-model="form.timelyLowerMoney" placeholder="阶梯值以下手续费(单笔)">
                  <span slot="suffix">元</span>
                </el-input>
              </el-form-item>
              <el-form-item label="比例" prop="timelyLowerRate">
                <el-input v-model="form.timelyLowerRate" placeholder="阶梯值以下手续费(比例)">
                  <span slot="suffix">%</span>
                </el-input>
              </el-form-item>
            </div>
          </div>
        </template>
        <el-form-item label="">
          <el-button type="success" style="width:100%" @click="submit" :loading="loading" :disabled="loading">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import func from '@/common/func'
  import rules from './pageRules.js'
  export default {
    name: 'configuration-deal-charge',
    data() {
      return {
        rules: rules.charge,
        form: {},
        loading: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created () {
      // 获取
      this.$request({
        url: this.hiddenActions['F_INFO']
      }).then(data => {
        this.form = data.result
      })
    },
    methods: Object.assign(func(), {
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.form.id = null
            this.loading = true
            this.$request({
              url: this.hiddenActions['F_EXECUTE'],
              data: this.form
            }).then(data => {
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
              this.loading = false
            }).catch(() => {
              this.loading = false
            })
          }
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
  .app-container {
    padding: 32px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .wrapper {
      .desc {
        border: 1px dashed #FAA155;
        padding-top: 16px;
        padding-right: 16px;

        &.t0 {
          border: 1px dashed #00CE6D;
        }
      }

      // width: 400px;
      .wrapper-inner {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 16px;

        // text-align: center;
        &.t0 {
          .item {
            border: 1px dashed #00CE6D;

            span {
              color: #00CE6D;
            }
          }
        }

        .item {
          border: 1px dashed #FAA155;
          padding: 16px;

          span {
            font-size: 14px;
            color: #FAA155;
            margin-left: 64px;
          }
        }
      }
    }
  }

</style>
