<template>
  <div class="app-container">
    <div class="product">
      <div class="title">
        <span>商品信息</span>
      </div>
      <div class="content">
        <el-table :data="productTable.list" border v-loading="pageLoading">
          <el-table-column label="商品编号" prop="code"></el-table-column>
          <el-table-column label="分类" prop="categoryName"></el-table-column>
          <el-table-column label="商品名称" prop="name"></el-table-column>
          <el-table-column label="商品克重" prop="weight"></el-table-column>
        </el-table>
      </div>
    </div>
    <div class="product">
      <div class="title">
        <span>库存信息</span>
      </div>
      <div class="content">
        <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="150" :checkbox="false"></bus-table>
      </div>
    </div>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
  </div>
</template>
<script>
  // component
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'investGold-list-inventory',
    components: {
      BusTable,
      BusDialogForm
    },
    data() {
      return {
        productTable: {
          list: []
        },
        table: {
          list: [],
          tableChangeList: [],
          columns: JSON.parse(JSON.stringify(pageData.listInventory.tableColumns))
        },
        dialog: {},
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
      // 获取库存数据
      this.$request({
        url: this.hiddenActions['F_INFO'],
        data: this.$route.query.id
      }).then(data => {
        // 构造商品信息
        this.productTable.list.push({
          code: data.result.code,
          categoryName: data.result.categoryName,
          name: data.result.name,
          weight: data.result.weight,
          id: data.result.id
        })
        // 解析数据源
        data.result.skuDtos.map((item, iIndex) => {
          item.attributeDtos.forEach((j, jIndex) => {
            // 根据规格id 获取规格name
            const spec = data.result.specDtos.find(i => i.id === j.specId)
            if (spec && spec.name) {
              // 首次就添加columns 后续循环不添加
              if (iIndex === 0) {
                this.table.columns.unshift({
                  prop: `columns-${jIndex}`,
                  title: spec.name
                })
              }
              // 添加list的值
              item[`columns-${jIndex}`] = j.name
              item.specStr = (item.specStr || '') + (j.name + '/')
            }
          })
        })
        this.table.list = data.result.skuDtos

        this.pageLoading = false
      })
    },
    methods: Object.assign(func(), {
      /** 带参数基础路由跳转事件 */
      func_jump(action, row) {
        if (row.length !== 1) {
          this.$message.info('请选择一条数据')
          return
        }
        // 构建跳转参数
        const query = {
          skuId: row[0].id,
          obj: JSON.stringify(this.productTable.list),
          specStr: row[0].specStr
        }
        this.$router.push({
          path: action.routeKey,
          query
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
  .product {
    margin-bottom: 32px;

    .title {
      font-size: 16px;
      color: #333333;
      margin-bottom: 8px;
    }
  }

</style>
