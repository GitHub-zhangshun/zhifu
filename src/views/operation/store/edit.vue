<template>
  <div class="app-container">
    <div class="wrapper" v-loading="pageLoading">
      <el-form :model="form" label-width="200px" size="medium" ref="form" status-icon :rules="rules">
        <el-form-item label="登录手机号码" prop="phones">
          <el-select v-model="form.phones" multiple filterable allow-create default-first-option
            placeholder="请输入手机号，可以输入多个" clearable no-data-text="输入后请轻按回车 或者鼠标点击下拉框(*^__^*)">
            <el-option v-for="item in form.accountList" :key="item.id" :label="item.phone" :value="item.phone">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市" prop="region">
          <el-cascader placeholder="试试搜索：成都" v-model="form.region" :options="regionTreeData" filterable change-on-select
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
          <Image3 :key="componentRef" v-model="form.imgList"></Image3>
        </el-form-item>
        <el-form-item label="门店地址" prop="address">
          <el-input v-model="form.address" placeholder="请先随便输，后续对接地图"></el-input>
        </el-form-item>
        <el-form-item label="门店经纬度">
          <div class="map-wrapper">
            <Map :key="componentRef" v-model="form.coordinate" :address="form.address"></Map>
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
    name: 'operation-store-edit',
    components: {
      Image3,
      Map
    },
    data() {
      return {
        rules: rules.addRules,
        form: {
          imgList: [],
          region: [],
          phones: [],
          name: '',
          phone: '',
          businessHours: '',
          address: '',
          remark: ''
        },
        regionTreeData: [], // 地区树
        props: {
          value: 'title',
          label: 'title'
        },
        submitLoading: false,
        componentRef: Math.random(),
        pageLoading: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    async created() {
      this.pageLoading = true
      // 获取地区树
      await this.$request({
        url: this.hiddenActions['O_REGION_TREE'],
        data: 1
      }).then(data => {
        this.regionTreeData = data.result
        this.delChildrenNull(this.regionTreeData)
      })
      // 获取详情
      await this.$request({
        url: this.hiddenActions['O_INFO'],
        data: this.$route.query.id
      }).then(data => {
        // 构造回显数据
        // 手机
        data.result.accountList.forEach(item => {
          this.form.phones.push(item.phone)
        })
        // 地区
        data.result.store.province && this.form.region.push(data.result.store.province)
        data.result.store.city && this.form.region.push(data.result.store.city)
        // 图片
        data.result.imgList.forEach(item => {
          this.form.imgList.push(item.link)
        })
        // 其他
        this.form.name = data.result.store.name
        this.form.phone = data.result.store.phone
        this.form.businessHours = data.result.store.businessHours
        this.form.address = data.result.store.address
        this.form.coordinate = data.result.store.coordinate
        this.form.remark = data.result.store.remark

        this.componentRef = Math.random()
      })

      this.pageLoading = false
    },
    methods: Object.assign(func(), {
      delChildrenNull(treeData) {
        treeData.forEach(item => {
          if (item.children.length === 0) {
            delete item.children
          } else {
            this.delChildrenNull(item.children)
          }
        })
      },
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
              id: this.$route.query.id,
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
