<template>
  <div class="app-container">
    <div class="wrapper">
      <el-form :model="form" label-width="200px" size="medium" ref="form" status-icon :rules="rules">
        <el-form-item label="登录手机号码" prop="phones">
          <el-select v-model="form.phones" multiple filterable allow-create default-first-option
            placeholder="请输入手机号，可以输入多个" clearable no-data-text="输入后请轻按回车 或者鼠标点击下拉框(*^__^*)">
            <el-option v-for="item in form.accountList" :key="item.id" :label="item.phone" :value="item.phone">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="region">
          <el-cascader placeholder="试试搜索：成都" v-model="form.region" :options="region" filterable change-on-select
            :props="props" clearable>
          </el-cascader>
        </el-form-item>
        <el-form-item label="门店名称" prop="name">
          <el-input v-model="form.name" placeholder="门店名称"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="phone">
          <el-input v-model="form.phone" placeholder="联系电话"></el-input>
        </el-form-item>
        <el-form-item label="营业时间" prop="businessHours">
          <el-autocomplete v-model="form.businessHours" :fetch-suggestions="querySearch"
            placeholder="示例：周一至周五 08：00-17：00"></el-autocomplete>
          </el-input>
        </el-form-item>
        <el-form-item label="门店图片" prop="imgList">
          <Image3 v-model="form.imgList"></Image3>
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="form.address" placeholder="请输入门店实际地址"></el-input>
        </el-form-item>
        <el-form-item label="门店经纬度">
          <div class="map-wrapper">
            <Map v-model="form.coordinate"></Map>
          </div>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" placeholder="备注" type="textarea" :rows="2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="submit" :loading="submitLoading" :disabled="submitLoading">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
  import Image3 from '@/components/Upload/Image3'
  import Map from '../components/Map.vue'
  import func from '@/common/func'
  import rules from './pageRules.js'
  export default {
    name: 'operation-store-add',
    components: {
      Image3,
      Map
    },
    data() {
      return {
        rules: rules.addRules,
        form: {
          imgList: []
        },
        region: [], // 地区树
        props: {
          value: 'title',
          label: 'title'
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
      // 获取地区树
      this.$request({
        url: this.hiddenActions['O_REGION_TREE'],
        data: 1
      }).then(data => {
        this.region = data.result
        this.delChildrenNull(this.region)
      })
    },
    methods: Object.assign(func(), {
      querySearch(queryString, cb) {
        const results = [{
          value: '周一至周五 08：00-17：00'
        }, {
          value: '周一至周五 08：00-17：00 节假日不放假'
        }, {
          value: '周一至周五 08：00-17：00 节假日不营业'
        }]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      submit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            // 构造数据
            let data = {
              store: {},
              imgList: [],
              accountList: []
            }
            data.store = {
              province: this.form.region[0],
              city: this.form.region[1],
              name: this.form.name,
              phone: this.form.phone,
              businessHours: this.form.businessHours,
              address: this.form.address,
              coordinate: this.form.coordinate,
              remark: this.form.remark,
            }
            this.form.imgList.forEach(item => {
              data.imgList.push({
                link: item
              })
            })
            this.form.phones.forEach((item, index) => {
              data.accountList.push({
                phone: item,
                name: `店员${index}`
              })
            })
            this.submitLoading = true
            this.$request({
              url: this.hiddenActions['F_EXECUTE'],
              data
            }).then(data => {
              if (data.result) {
                this.$router.push('/operation/store/list')
              }
              this.submitLoading = false
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
  .wrapper {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    /deep/.el-select,
    .el-autocomplete,
    .el-cascader {
      width: 600px;
    }

    .map-wrapper {
      border: 1px dashed #ccc;
      height: 300px;
    }
  }

</style>
