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
            </el-table>
          </el-col>
        </el-row>
        <!-- 采购信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="采购信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="[form]" border>
              <el-table-column label="采购人" prop="purchaseMan"></el-table-column>
              <el-table-column label="时间" prop="purchaseTime">
                <template slot-scope="scope">
                  <span>{{ scope.row.purchaseTime && getTime(scope.row.purchaseTime) }}</span>
                </template>
              </el-table-column>
              <el-table-column label="合同编号" prop="purchaseContract"></el-table-column>
              <el-table-column label="其他费用" prop="otherCost"></el-table-column>
              <el-table-column label="备注" prop="remark"></el-table-column>
            </el-table>
          </el-col>
        </el-row>
        <!-- 确认信息 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="确认信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-table :data="static" border>
              <el-table-column label="采购总数量" prop="num"></el-table-column>
              <el-table-column label="采购总重量" prop="weight">
                <template slot-scope="scope">
                  <span>{{scope.row.weight / 1000}} KG</span>
                </template>
              </el-table-column>
              <el-table-column label="采购总价格" prop="price">
                <template slot-scope="scope">
                  <span>{{(scope.row.price)}} 元</span>
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
    name: 'goods-purchase-info',
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
        form: {
          otherCost: '0',
          orderProducts: []
        },
        static: [{
          num: 0,
          weight: 0,
          price: 0
        }],
        submitLoading: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created () {
      // 获取详情
      this.pageLoading = true
      this.$request({
        url: this.hiddenActions['F_INFO'],
        data: this.$route.query.id
      }).then(data => {
        this.form = data.result
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
          item.orderSkus.map(j => {
            j.goodName = item.name
            j.price = parseInt(item.price)
            j.weight = item.weight
          })
          this.goodsList.push(...item.orderSkus.filter(item => item.qty > 0))
        })
        // 获取统计
        this.static = [{
          num: 0,
          weight: 0,
          price: 0
        }]
        this.goodsList.forEach(item => {
          this.static[0].num += item.qty
          this.static[0].weight += (item.weight * item.qty)
          this.static[0].price += (item.price * item.qty)
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
