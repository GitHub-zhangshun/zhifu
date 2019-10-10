<template>
  <div class="good-box" style="margin-bottom: 100px;">
    <sticky class-name="sub-navbar published" :zIndex="999">
      <el-button type="success" @click="submit" :loading="submitLoading" :disabled="submitLoading">提交</el-button>
    </sticky>
    <div class="good-box-wrapper">
      <!-- 表单 -->
      <el-form :model="form" :hide-required-asterisk="false" ref="form" status-icon :rules="rules" :inline="true"
        size="mini" label-width="100px">
        <!-- 产品类型选择 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="基本信息"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="categoryId">
              <template slot="label">
                <span class="el-form-item_custom_label">商品分类</span>
              </template>
              <ServiceSelect v-model="form.categoryId" apiKey="O_GOOD_CATEGORY_LIST"></ServiceSelect>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <span class="el-form-item_custom_label">商品名称</span>
              </template>
              <el-input v-model="form.name" placeholder="商品名称">
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="weight">
              <template slot="label">
                <span class="el-form-item_custom_label">商品克重</span>
              </template>
              <el-input v-model="form.weight" placeholder="商品克重">
                <i slot="suffix">克</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="madePrice">
              <template slot="label">
                <span class="el-form-item_custom_label">加工费</span>
              </template>
              <el-input v-model="form.madePrice" placeholder="加工费">
                <i slot="suffix">元/克</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="poundageRate">
              <template slot="label">
                <span class="el-form-item_custom_label">手续费率</span>
              </template>
              <el-input v-model="form.poundageRate" placeholder="手续费率">
                <i slot="suffix">%</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="sort">
              <template slot="label">
                <span class="el-form-item_custom_label">商品排序</span>
              </template>
              <el-input v-model="form.sort" placeholder="商品排序">
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="tagDtos">
              <template slot="label">
                <span class="el-form-item_custom_label">商品标签</span>
              </template>
              <ServiceSelect v-model="form.tagDtos" apiKey="O_GOOD_TAG_LIST" :multiple="true"></ServiceSelect>
            </el-form-item>
            <el-form-item prop="taxNumber">
              <template slot="label">
                <span class="el-form-item_custom_label">税收编码</span>
              </template>
              <FuzzyQuery v-model="form.taxNumber" :props="{ label: 'u_code', cusLabel: 'u_name|u_rate', value: 'u_code' }"
                apiKey="O_CONTROL_LIST" @objData="getTaxNumberObj"></FuzzyQuery>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 购买方式 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="购买方式"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="buyNow">
              <el-checkbox v-model="form.buyNow" label="立即购买" border></el-checkbox>
            </el-form-item>
            <el-form-item prop="buyFuture">
              <el-checkbox v-model="form.buyFuture" label="预约购买" border></el-checkbox>
            </el-form-item>
            <el-form-item v-if="form.buyFuture">
              <el-button type="" @click="bespokeAdd">添加</el-button>
            </el-form-item>
            <!-- 期限列表 -->
            <div class="props" v-if="form.buyFuture">
              <div class="content" v-for="(item, index) in form.bespokeDtos" :key="index">
                <el-form-item prop="buyFuture">
                  <template slot="label">
                    <span class="el-form-item_custom_label">期限</span>
                  </template>
                  <DictionarySelect :key="form.bespokeDtos.length" v-model="item.dayId" :propList="dayList" prefix="(天)"/>
                </el-form-item>
                <el-form-item prop="buyFuture">
                  <template slot="label">
                    <span class="el-form-item_custom_label">利率</span>
                  </template>
                  <DictionarySelect :key="form.bespokeDtos.length" v-model="item.dayRateId" :propList="dayRateList" prefix="(%)"/>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button type="danger" icon="el-icon-delete" circle @click="bespokeDel(index)"></el-button>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 商品规格 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="商品规格"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item prop="specTypeId">
              <template slot="label">
                <span class="el-form-item_custom_label">规格分类</span>
              </template>
              <ServiceSelect v-model="form.specTypeId" apiKey="O_GOOD_TYPE_SPEC_LIST" :clear="false"
                @change="specTypeChange"></ServiceSelect>
            </el-form-item>
            <el-form-item prop="specDtos" v-if="form.specTypeId">
              <template slot="label">
                <span class="el-form-item_custom_label">规格</span>
              </template>
              <!-- 规格类型下的规格集合 -->
              <ServiceSelect :key="form.refreshSpecComponentValue" v-model="form.specDtos" :dataList="form.specList"
                multiple returnObj @change="specDtosChange">
              </ServiceSelect>
            </el-form-item>
            <el-form-item prop="specDtos" v-if="form.specDtos && form.specDtos.length > 0">
              <el-button type="" @click="sukAdd">添加</el-button>
            </el-form-item>
            <!-- sku 动态列表 -->
            <div class="props" v-if="form.specDtos && form.specDtos.length > 0">
              <!-- 循环构造的skuList -->
              <div class="img" v-for="(item, index) in form.skuDtos" :key="index">
                <!-- 循环已选规格下的属性 eg: 大小、颜色 -->
                <el-form-item v-for="(inner, innerIndex) in item.attributeList" :key="innerIndex">
                  <template slot="label">
                    <span class="el-form-item_custom_label">{{ inner.name }}</span>
                  </template>
                  <!-- 根据规格的改变来刷新动态组件 防止值出错 -->
                  <ServiceSelect :key="form.refreshSkuComponentValue" v-model="inner.skuCode"
                    :dataList="inner.attributeDtos">
                  </ServiceSelect>
                </el-form-item>
                <el-form-item>
                  <template slot="label">
                    <span class="el-form-item_custom_label">图片</span>
                  </template>
                  <Image1 v-model="item.topPic" width="50" height="50"></Image1>
                </el-form-item>
                <el-form-item style="margin-left:20px;">
                  <el-button type="danger" icon="el-icon-delete" circle @click="skuDel(index)"></el-button>
                </el-form-item>
              </div>
            </div>
          </el-col>
        </el-row>
        <!-- 商品详情 -->
        <el-row>
          <el-col :span="24">
            <h3 class="title">
              <mallki className="mallki-text" text="商品详情"></mallki>
            </h3>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div class="good-cover-img">
              <div class="desc">
                <span>商品封面:展示于用户端商品列表的商品图片</span>
              </div>
              <Image2 v-model="form.listPic"></Image2>
            </div>
            <div class="good-cover-img">
              <div class="desc">
                <span>商品相册:展示于用户端商品详情的轮播</span>
              </div>
              <Image3 v-model="form.productPicDtos"></Image3>
            </div>
            <div class="good-cover-img">
              <div class="desc">
                <span>详情</span>
              </div>
              <Tinymce ref="editor" :height="400" v-model="form.content" />
            </div>
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
  import MDinput from '@/components/MDinput'
  import rules from './pageRules.js'
  export default {
    name: 'goods-add',
    components: {
      ServiceSelect,
      DictionarySelect,
      Image1,
      Image2,
      Image3,
      FuzzyQuery,
      Mallki,
      Tinymce,
      Sticky,
      MDinput
    },
    created() {
      // 获取字典下拉 - 预约购买所需信息
      this.getDicListByParentSimplify('bespoke_day').then(data => {
        this.dayList = data.result
      })
      this.getDicListByParentSimplify('bespoke_rate').then(data => {
        this.dayRateList = data.result
      })
    },
    data() {
      return {
        rules: rules.addRules,
        form: {
          bespokeDtos: [{
            dayId: '',
            dayRateId: ''
          }],
          specTypeId: '', // 规格类型
          specList: [], // 规格类型下的规格集合
          specDtos: [], // 已经选择的规格集合
          refreshSpecComponentValue: Math.random(), // 规格下拉组件的刷新key
          skuDtos: [], // sku 的列表 [ [] ] 数据格式为一个二维数据
          skuObj: [], // sku 二维数组的初始数据 做添加使用
          refreshSkuComponentValue: Math.random(), // sku 列表的刷新key
          productPicDtos: [] // 商品轮播图片
        },
        goodCategoryList: [], // 商品分类列表
        dayList: [], // 期限字典列表
        dayRateList: [], // 利率字典列表
        submitLoading: false,
        taxNumberObj: {} // 税收编码对象
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    methods: Object.assign(func(), {
      // 规格类型一旦改变就初始化 规格 sku 的数据
      async specTypeChange() {
        // 清除已经选择的规格集合
        this.form.specDtos = []
        // 初始化 sku动态列表数据
        this.form.skuDtos = []
        // 获取规格类型下的规格集合
        await this.getSpecList(this.form.specTypeId).then(data => {
          this.form.specList = data.result
          // 刷新规格下拉组件的key值
          this.form.refreshSpecComponentValue = Math.random()
        })
      },
      // 规格数据一旦改变就重新构造sku的集合数据
      specDtosChange() {
        // 更新刷新sku动态组件的刷新值
        this.form.refreshSkuComponentValue = Math.random()
        this.form.skuDtos = []
        // 保存一份初始数据 作为后头动态添加使用 这里两个地方的数据都需要深拷贝
        this.form.skuObj = {
          topPic: '',
          attributeList: JSON.parse(JSON.stringify(this.form.specDtos))
        }
        this.form.skuDtos.push({
          topPic: '',
          attributeList: JSON.parse(JSON.stringify(this.form.specDtos))
        })
      },
      // 获取规格类型下规格列表
      getSpecList(specTypeId) {
        return this.$request({
          url: this.hiddenActions['O_GOOD_SPEC_LIST'],
          data: specTypeId
        })
      },
      // 预约购买分期类型添加
      bespokeAdd() {
        if (this.form.bespokeDtos.length > 4) {
          const validNum = Math.floor(Math.random() * (9999 - 1000)) + 1000
          this.$prompt(`已经有${this.form.bespokeDtos.length}条数据啦，您确定还要添加吗？如需继续请进行一个简短验证！  请输入验证码====>   ${validNum}`,
            '验证提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              inputErrorMessage: '验证码不正确',
              inputValidator: function (val) {
                return val == validNum
              }
            }).then(() => {
            this.form.bespokeDtos.push({
              dayId: '',
              dayRateId: ''
            })
          })
        } else {
          this.form.bespokeDtos.push({
            dayId: '',
            dayRateId: ''
          })
        }
      },
      // 预约购买分期类型删除
      bespokeDel(index) {
        if (this.form.bespokeDtos.length === 1) {
          this.$message.warning('嘿，别删啦！只有一个了。')
          return
        }
        this.form.bespokeDtos.splice(index, 1)
      },
      // 表单提交
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 构造 specDtos 因为返回的对象
            let specDtos = []
            this.form.specDtos.forEach(item => {
              specDtos.push(item.id)
            })

            // 构造 skuDtos
            let skuDtos = []
            let attributeDtos = []
            this.form.skuDtos.forEach(item => {
              // 初始化 attributeDtos
              attributeDtos = []
              // 处理 attributeDtos
              item.attributeList.forEach(j => {
                attributeDtos.push({
                  id: j.skuCode
                })
              })
              skuDtos.push({
                topPic: item.topPic,
                attributeDtos,
              })
            })

            // 构造 productPicDtos
            let productPicDtos = []
            this.form.productPicDtos.forEach(item => {
              productPicDtos.push({
                url: item,
                title: ''
              })
            })
            // 添加税收编码的利率
            this.form.taxRate = this.taxNumberObj.u_rate
            let data = JSON.parse(JSON.stringify(this.form))
            data = Object.assign(data, {
              specDtos,
              skuDtos,
              productPicDtos
            })
            this.submitLoading = true
            this.$request({
              url: this.hiddenActions['F_EXECUTE'],
              data,
            }).then(data => {
              if(data.result) {
                this.$router.push('/goods/list')
              }
              this.submitLoading = false
            }).catch(() => {
              this.submitLoading = false
            })
          }
        })
      },
      // sku集合新增
      sukAdd() {
        if (this.form.skuDtos.length > 5) {
          const validNum = Math.floor(Math.random() * (9999 - 1000)) + 1000
          this.$prompt(`已经有${this.form.skuDtos.length}条数据啦，您确定还要添加吗？如需继续请进行一个简短验证！   请输入验证码====>   ${validNum}`,
            '验证提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
              inputErrorMessage: '验证码不正确',
              inputValidator: function (val) {
                return val == validNum
              }
            }).then(() => {
            // push的时候也需要深拷贝 因为这几个传递都是对象引用类型 真TM的挨球
            this.form.skuDtos.push(JSON.parse(JSON.stringify(this.form.skuObj)))
          })
        } else {
          // push的时候也需要深拷贝 因为这几个传递都是对象引用类型 真TM的挨球
          this.form.skuDtos.push(JSON.parse(JSON.stringify(this.form.skuObj)))
        }
      },
      // sku集合删除某项
      skuDel(index) {
        if (this.form.skuDtos.length === 1) {
          this.$message.warning('嘿，别删啦！只有一个了。')
          return
        }
        // 删除的时候 更新刷新sku动态组件的刷新值
        this.form.refreshSkuComponentValue = Math.random()
        this.form.skuDtos.splice(index, 1)
      },
      // 获取税收编码对象数据
      getTaxNumberObj(e) {
        this.taxNumberObj = e
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
