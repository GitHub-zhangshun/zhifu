<template>
  <div class="good-box" style="margin-bottom: 100px;">
    <sticky class-name="sub-navbar published" :zIndex="999">
      <el-button type="success" @click="submit" :loading="submitLoading" :disabled="submitLoading">提交</el-button>
    </sticky>
    <el-dialog v-el-drag-dialog title="新增商品" :visible.sync="dialog.status">
      <el-form :model="dialog.form" inline ref="dialogForm" :rules="dialog.rules">
        <el-form-item prop="categoryId">
          <template slot="label">
            <span class="el-form-item_custom_label">商品分类</span>
          </template>
          <ServiceSelect v-model="dialog.form.categoryId" apiKey="O_GOODS_TYPE_LIST" :clear="false"
            @change="goodTypeChange">
          </ServiceSelect>
        </el-form-item>
        <el-form-item prop="good" v-if="dialog.form.categoryId">
          <template slot="label">
            <span class="el-form-item_custom_label">商品名称</span>
          </template>
          <ServiceSelect :key="dialog.goodComponentRefKey" v-model="dialog.form.good" apiKey="O_GOODS_LIST" returnObj
            @change="goodChange" :requestData="dialog.form.categoryId"></ServiceSelect>
        </el-form-item>
        <el-form-item prop="price">
          <template slot="label">
            <span class="el-form-item_custom_label">商品单价</span>
          </template>
          <el-input v-model="dialog.form.price" placeholder="商品单价">
            <i slot="suffix">元</i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="el-form-item_custom_label">商品编号</span>
          </template>
          <el-input disabled :value="dialog.form.good && dialog.form.good[0] && dialog.form.good[0].code"
            placeholder="商品编号">
            <i slot="suffix"></i>
          </el-input>
        </el-form-item>
        <el-form-item>
          <template slot="label">
            <span class="el-form-item_custom_label">商品克重</span>
          </template>
          <el-input disabled :value="dialog.form.good && dialog.form.good[0] && dialog.form.good[0].weight"
            placeholder="商品克重">
            <i slot="suffix">克</i>
          </el-input>
        </el-form-item>
        <template v-if="dialog.form.skuTable.header.length > 0">
          <el-table :data="dialog.form.skuTable.list" border v-loading="dialog.form.skuTable.loading">
            <el-table-column v-for="(item, index) in dialog.form.skuTable.header" :key="index" :label="item"
              :prop="item">
            </el-table-column>
            <el-table-column label="数量">
              <template slot-scope="scope">
                <el-input v-model="scope.row.qty" placeholder="数量"></el-input>
              </template>
            </el-table-column>
          </el-table>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
    <div class="good-box-wrapper">
      <!-- 表单 -->
      <el-form :model="form" :hide-required-asterisk="false" ref="form" status-icon :rules="rules" :inline="true"
        size="mini" label-width="100px">
        <!-- 添加列表 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="商品"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-button type="success" @click="addGood">添加</el-button>
            <el-button type="danger" @click="resetGood">重置</el-button>
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
            <el-form-item prop="purchaseMan">
              <template slot="label">
                <span class="el-form-item_custom_label">采购人</span>
              </template>
              <el-input v-model="form.purchaseMan" placeholder="采购人">
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="purchaseTime">
              <template slot="label">
                <span class="el-form-item_custom_label">采购时间</span>
              </template>
              <el-date-picker v-model="form.purchaseTime" type="datetime" placeholder="采购时间">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="purchaseContract">
              <template slot="label">
                <span class="el-form-item_custom_label">采购合同编号</span>
              </template>
              <el-input v-model="form.purchaseContract" placeholder="采购合同编号">
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="otherCost">
              <template slot="label">
                <span class="el-form-item_custom_label">其他费用</span>
              </template>
              <el-input v-model="form.otherCost" placeholder="其他费用">
                <i slot="suffix">元</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="remark">
              <template slot="label">
                <span class="el-form-item_custom_label">备注</span>
              </template>
              <el-input v-model="form.remark" placeholder="备注">
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
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
    name: 'goods-purchase-list-add',
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
    methods: Object.assign(func(), {
      // 商品类型改变事件
      goodTypeChange() {
        this.dialog.form.good = []
        this.dialog.form.skuTable.header = []
        this.dialog.goodComponentRefKey = Math.random()
      },
      // 商品改变事件
      goodChange() {
        this.dialog.form.sku = []
        this.dialog.form.skuTable.loading = true
        // 获取商品SKU
        this.$request({
          url: this.hiddenActions['O_SKU_LIST'],
          data: this.dialog.form.good[0].id
        }).then(data => {
          this.dialog.form.sku = data.result
          // 构造skuTable
          this.dialog.form.skuTable.header = []
          this.dialog.form.skuTable.list = []
          this.dialog.form.sku.forEach(item => {
            // header
            if (this.dialog.form.skuTable.header.length === 0) {
              if (!item.attributes) {
                // 无sku商品
                this.dialog.form.skuTable.header.push('规格')
              } else {
                // 有SKU
                item.attributes.forEach(j => {
                  this.dialog.form.skuTable.header.push(j.specName)
                })
              }
            }
            // list
            let list_item = {
              specStr: ''
            }
            if (!item.attributes) {
              // 无sku商品
              list_item['规格'] = '默认'
              list_item.skuId = item.id
              list_item.specStr = '默认'
              list_item.qty = 0
            } else {
              item.attributes.forEach(j => {
                list_item[j.specName] = j.name
                list_item.skuId = j.skuId
                list_item.specStr += `${j.specName}:${j.name}/`
                list_item.qty = 0
              })
            }
            this.dialog.form.skuTable.list.push(list_item)
          })
          this.dialog.form.skuTable.loading = false
        }).catch(() => {
          this.dialog.form.skuTable.loading = false
        })
      },
      addGood() {
        this.dialog.status = true
      },
      resetGood() {
        this.$confirm('重置将清空已添加的商品, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.form.orderProducts = []
          // 获取已添加的商品显示列表数据
          this.getShowGoodList()
        })
      },
      dialogSubmit() {
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            // 构造需要提交的商品数据
            let _obj = {
              orderSkus: []
            }
            _obj.id = this.dialog.form.good[0].id
            _obj.name = this.dialog.form.good[0].name
            _obj.weight = this.dialog.form.good[0].weight
            _obj.price = this.dialog.form.price
            // 拷贝一份数据
            let _skuTable_list = JSON.parse(JSON.stringify(this.dialog.form.skuTable.list)).filter(item => item
              .qty > 0)
            if (_skuTable_list && _skuTable_list.length > 0) {
              _skuTable_list.forEach(item => {
                //构造orderSkus
                _obj.orderSkus.push({
                  id: item.skuId,
                  qty: parseInt(item.qty),
                  specStr: item.specStr
                })
              })
              // 是否已经添加过
              if (!this.form.orderProducts.find(item => item.id === _obj.id)) {
                this.form.orderProducts.push(_obj)
                // 获取已添加的商品显示列表数据
                this.getShowGoodList()
              } else {
                this.$confirm('已经添加过此商品, 继续添加将覆盖原有商品数据, 是否继续?', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  this.form.orderProducts.map(item => {
                    if (item.id === _obj.id) {
                      item.orderSkus = _obj.orderSkus
                    }
                  })
                  // 获取已添加的商品显示列表数据
                  this.getShowGoodList()
                })
              }
            }
            // 关闭
            this.dialog.status = false
          }
        })
      },
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
      },
      // 表单提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            if (this.form.orderProducts.length === 0) {
              this.$message.error('请添加商品')
              return
            }
            this.submitLoading = true
            this.$request({
              url: this.hiddenActions['F_EXECUTE'],
              data: this.form
            }).then(data => {
              this.submitLoading = false
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
              this.$router.replace('/goods/purchase/list')
            }).catch(() => {
              this.submitLoading = false
            })
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
