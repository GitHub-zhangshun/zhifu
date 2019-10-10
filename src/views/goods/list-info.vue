<template>
  <div class="good-box" style="margin-bottom: 100px;" v-loading="loading">
    <div class="good-box-wrapper">
      <!-- 表单 -->
      <el-form :model="form" :hide-required-asterisk="false" ref="form" status-icon :inline="true" size="mini"
        label-width="100px">
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
              <el-input :value="info.categoryName" placeholder="" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="name">
              <template slot="label">
                <span class="el-form-item_custom_label">商品名称</span>
              </template>
              <el-input :value="info.name" placeholder="商品名称" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="weight">
              <template slot="label">
                <span class="el-form-item_custom_label">商品克重</span>
              </template>
              <el-input :value="info.weight" placeholder="商品克重" disabled>
                <i slot="suffix">克</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="madePrice">
              <template slot="label">
                <span class="el-form-item_custom_label">加工费</span>
              </template>
              <el-input :value="info.madePrice" placeholder="加工费" disabled>
                <i slot="suffix">元/克</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="poundageRate">
              <template slot="label">
                <span class="el-form-item_custom_label">手续费率</span>
              </template>
              <el-input :value="info.poundageRate" placeholder="手续费率" disabled>
                <i slot="suffix">%</i>
              </el-input>
            </el-form-item>
            <el-form-item prop="sort">
              <template slot="label">
                <span class="el-form-item_custom_label">商品排序</span>
              </template>
              <el-input :value="info.sort" placeholder="商品排序" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="taxNumber">
              <template slot="label">
                <span class="el-form-item_custom_label">税收编码</span>
              </template>
              <el-input :value="info.taxNumber" placeholder="" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="tagDtos">
              <template slot="label">
                <span class="el-form-item_custom_label">商品标签</span>
              </template>
              <el-tag type="" v-for="item in info.tagDtos" :key="item.id">{{ item.name }}</el-tag>
              <el-tag type="danger" v-if="info.tagDtos && info.tagDtos.length === 0">暂无标签</el-tag>
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
              <el-checkbox :value="info.buyNow" label="立即购买" border disabled></el-checkbox>
            </el-form-item>
            <el-form-item prop="buyFuture">
              <el-checkbox :value="info.buyFuture" label="预约购买" border disabled></el-checkbox>
            </el-form-item>
            <!-- 期限列表 -->
            <div class="props">
              <div class="content" v-for="(item, index) in info.bespokeDtos" :key="index">
                <el-form-item prop="buyFuture">
                  <template slot="label">
                    <span class="el-form-item_custom_label">期限</span>
                  </template>
                  <el-input :value="item.days" placeholder="" disabled>
                    <i slot="suffix">天</i>
                  </el-input>
                </el-form-item>
                <el-form-item prop="buyFuture">
                  <template slot="label">
                    <span class="el-form-item_custom_label">利率</span>
                  </template>
                  <el-input :value="item.dayRate" placeholder="" disabled>
                    <i slot="suffix">%</i>
                  </el-input>
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
              <el-input :value="info.specTypeName" placeholder="" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <el-form-item prop="specDtos">
              <template slot="label">
                <span class="el-form-item_custom_label">规格</span>
              </template>
              <!-- 规格类型下的规格集合 -->
              <el-input :value="info.specTypeName" placeholder="" disabled>
                <i slot="suffix"></i>
              </el-input>
            </el-form-item>
            <!-- sku 动态列表 -->
            <div class="props sku">
              <!-- 循环构造的skuList -->
              <div class="img" v-for="(item, index) in info.skuDtos" :key="index">
                <el-form-item>
                  <img :src="item.topPic" width="50" height="50">
                </el-form-item>
                <!-- 循环已选规格下的属性 eg: 大小、颜色 -->
                <el-form-item v-for="(inner, innerIndex) in item.attributeDtos" :key="innerIndex">
                  <!-- 根据规格的改变来刷新动态组件 防止值出错 -->
                  <el-input :value="inner.name" placeholder="" disabled>
                    <i slot="suffix"></i>
                  </el-input>
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
              <img :src="info.listPic" alt="" width="150" height="150">
            </div>
            <div class="good-cover-img">
              <div class="desc">
                <span>商品相册:展示于用户端商品详情的轮播</span>
              </div>
              <img v-for="item in info.productPicDtos" :key="item.id" :src="item.url" alt="" width="150" height="150"
                style="margin-right:5px;">
            </div>
            <div class="good-cover-img">
              <div class="desc">
                <span>详情</span>
              </div>
              <span v-html="info.content"></span>
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
  export default {
    name: 'goods-list-info',
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
    data() {
      return {
        info: {},
        form: {},
        loading: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      this.loading = true
      // 获取详细信息
      this.$request({
        url: this.hiddenActions['F_INFO'],
        data: this.$route.query.id
      }).then(data => {
        this.info = data.result
        this.loading = false
      })
    },
    methods: Object.assign(func(), {

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

      &.sku {
        padding-left: 32px;

        img {
          margin-right: 8px;
        }
      }

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
