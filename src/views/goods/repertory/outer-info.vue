<template>
  <div class="good-box" style="margin-bottom: 100px;" v-loading="pageLoading">
    <div class="good-box-wrapper">
      <!-- 表单 -->
      <el-form :model="form" :hide-required-asterisk="false" ref="form" status-icon :rules="rules" :inline="true"
        size="mini" label-width="100px">
        <!-- 商品 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="商品"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="goodsList" border>
              <el-table-column label="商品" prop="goodName"></el-table-column>
              <el-table-column label="规格" prop="specStr"></el-table-column>
              <el-table-column label="价格" prop="price"></el-table-column>
              <el-table-column label="重量" prop="weight"></el-table-column>
              <el-table-column label="数量" prop="qty"></el-table-column>
              <el-table-column label="小计">
                <template slot-scope="scope">
                  <span>￥ {{ scope.row.price * scope.row.qty }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 购买人信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="购买人信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="outStockExtDto" border>
              <el-table-column label="订单号">
                <template slot-scope="scope">
                  <span>{{ form.fromOrderCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="姓名" prop="userName">
              </el-table-column>
              <el-table-column label="手机" prop="userPhone">
              </el-table-column>
              <el-table-column label="订单类型" prop="orderType">
              </el-table-column>
              <el-table-column label="送货方式" prop="deliveryType">
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 收货人信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="收货人信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="outStockExtDto" border>
              <el-table-column label="收货人" prop="consignee">
              </el-table-column>
              <el-table-column label="手机" prop="cPhone">
              </el-table-column>
              <el-table-column label="收货地址" prop="address" show-overflow-tooltip>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 订单信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="订单信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="[form]" border>
              <el-table-column label="总重量" prop="totalW">
                <template slot-scope="scope">
                  <span>{{ scope.row.totalW || 0 }} 克</span>
                </template>
              </el-table-column>
              <el-table-column label="总数量" prop="totalQty">
              </el-table-column>
              <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 返回信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="返回信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="[form]" border>
              <el-table-column label="状态">
                <template slot-scope="scope">
                  <span>{{ scope.row.status && getEnumById(scope.row.status).title }}</span>
                </template>
              </el-table-column>
              <el-table-column label="日期">
                <template slot-scope="scope">
                  <span>{{scope.row.realTime && getTime(scope.row.realTime)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作备注" prop="remark">
              </el-table-column>
              <el-table-column label="快递公司" prop="remark">
                <template slot-scope="scope">
                  <span>{{ outStockExtDto && outStockExtDto[0] && outStockExtDto[0].exprCompany }}</span>
                </template>
              </el-table-column>
              <el-table-column label="快递单号" prop="remark">
                <template slot-scope="scope">
                  <span>{{ outStockExtDto && outStockExtDto[0] && outStockExtDto[0].exprCode }}</span>
                </template>
              </el-table-column>
              <el-table-column label="包裹重量" prop="remark">
                <template slot-scope="scope">
                  <span>{{ outStockExtDto && outStockExtDto[0] && outStockExtDto[0].opWT }}</span>
                </template>
              </el-table-column>
            </el-table>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import ServiceSelect from '@/views/businessComponents/ServiceSelect'
  import DictionarySelect from '@/views/businessComponents/DictionarySelect'
  import Image1 from '@/components/Upload/Image1'
  import Image2 from '@/components/Upload/Image2'
  import Image3 from '@/components/Upload/Image3'
  import FuzzyQuery from '@/views/businessComponents/FuzzyQuery'
  import Mallki from '@/components/TextHoverEffect/Mallki'
  import func from '@/common/func'
  import Tinymce from '@/components/Tinymce'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import rules from './pageRules.js'
  export default {
    name: 'goods-repertory-outer-info',
    components: {
      ServiceSelect,
      DictionarySelect,
      Mallki,
      Tinymce,
      Sticky
    },
    created() {

    },
    data() {
      return {
        rules: rules.dialogAddRules,
        pageLoading: false,
        dialog: {
          rules: rules.dialogAddRules,
          status: false,
          form: {
            good: [],
            sku: [],
            skuTable: {
              header: [],
              list: [],
              loading: false
            }
          },
          goodComponentRefKey: Math.random(),
        },
        goodsList: [],
        outStockExtDto: [],
        form: {
          otherCost: '0',
          orderProducts: []
        },
        submitLoading: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      // 获取详情
      this.pageLoading = true
      this.$request({
        url: this.hiddenActions['F_INFO'],
        data: this.$route.query.id
      }).then(data => {
        this.form = data.result
        data.result.outStockExtDto && this.outStockExtDto.push(data.result.outStockExtDto)
        this.getShowGoodList()
        this.pageLoading = false
      }).catch(() => {
        this.pageLoading = false
      })
    },
    methods: Object.assign(func(), {
      // 获取已添加的商品显示列表数据
      getShowGoodList() {
        let _show = JSON.parse(JSON.stringify(this.form.orderProducts))
        this.goodsList = []
        _show.forEach(item => {
          item.outInStockDetails.map(j => {
            j.goodName = item.name
            j.price = parseInt(item.price)
            j.weight = item.weight
          })
          this.goodsList.push(...item.outInStockDetails.filter(item => item.qty > 0))
        })
      },
      showSku(item) {
        this.$router.push({
          path: '/goods/repertory/enter/sku',
          query: {
            skuId: item.skuId,
            orderId: this.$route.query.id,
            obj: JSON.stringify(item)
          }
        })
      }
    })
  }

</script>

<style lang="scss" scoped>
  .good-box-wrapper {
    padding: 20px;

    /deep/.props {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;

      .img {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .el-form-item {
          margin: 0;
          display: flex;
          justify-content: flex-start;
          align-items: center;
        }
      }

      .content {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        .el-form-item {
          margin: 0;
        }
      }
    }

    .good-cover-img {
      // border: 1px solid;
      margin-bottom: 16px;

      .desc {
        padding-bottom: 5px;
        // padding-left: 32px;
        color: #2273FF;
        font-weight: 400;
        font-size: 14px;
      }
    }

    .title {
      border-bottom: 1px solid #ccc;
      padding-bottom: 5px;
      color: #2273FF;
      font-weight: 400;
      font-size: 16px;
    }

    .tipText {
      color: rgb(241, 46, 12);
      margin-left: 5px;
      font-size: 14px;
    }

    .icon_class {
      width: 1.5em;
      height: 1.5em;
      margin-bottom: 5px;
      cursor: pointer;
    }

    .icon_class.add {
      fill: #87CC67;
    }

    .icon_class.del {
      fill: #F36D6F;
    }

    .icon_class.up {
      position: absolute;
      top: 10px;
      left: 5px;
    }

    .info_section {
      border: 1px solid #E0E3EA;
      border-top: 2px solid #1D93F5;
      padding: 5px;
      border-radius: 5px;
      margin-bottom: 8px;
      position: relative;
      max-height: 2000px;
      transition: all .5s ease;
      opacity: 1;
    }

    .info_section.fold {
      max-height: 70px;
      overflow: hidden;
      opacity: .4;
    }

    .group_item {
      border: 1px solid #E0E3EA;
      border-top: 2px solid #909399;
      border-radius: 5px;
      margin: 5px 0;
      padding: 5px 5px 15px 25px;
    }

    .info_action {
      margin-bottom: 5px;
    }

    /deep/.el-form-item.is-required:not(.is-no-asterisk)>.el-form-item__label:before {
      content: none;
    }

    .searchItem {
      position: relative;

      .searchBox {
        position: absolute;
        top: -50px;
        left: 0;
        width: 400px;
        display: flex;
        flex-direction: column;

        span {
          font-size: 12px;
          color: red;
        }
      }
    }
  }

</style>
