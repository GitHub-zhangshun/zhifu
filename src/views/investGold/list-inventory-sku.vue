<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <el-table :data="goodTable">
      <el-table-column label="商品类型" prop="categoryName"></el-table-column>
      <el-table-column label="商品名称" prop="name"></el-table-column>
      <el-table-column label="商品克重" prop="weight">
        <template slot-scope="scope">
          <span>{{ scope.row.weight || 0 }} 克</span>
        </template>
      </el-table-column>
      <el-table-column label="规格">
        <template slot-scope="scope">
          <span>{{  $route.query.specStr }}</span>
        </template>
      </el-table-column>
    </el-table>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="100"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import axios from 'axios'
  export default {
    name: 'investGold-list-inventory-sku',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.sku.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'status',
            text: '状态',
            type: 'dictionary',
            details: {
              simplify: 'serial_status',
              outer: true
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          skuId: this.$route.query.skuId
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      goodTable() {
        return this.$route.query.obj && JSON.parse(this.$route.query.obj) || []
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_execute(action, row) {
        switch (action.routeKey) {
          // 下载
          case 'down':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$confirm('下载二维码, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              window.open(row[0].qrUrl)
            })
            break;
          // 打包下载
          case 'downAll':
            this.$confirm('打包下载二维码, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              window.open(`${process.env.VUE_APP_DOMAIN}${action.apiKey}?id=${this.goodTable[0].id}&fileName=${`${this.goodTable[0].categoryName} sku二维码`}`)
            })
            break;
          default:
            break;
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
