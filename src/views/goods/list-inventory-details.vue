<template>
  <div class="app-container">
    <!-- <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header> -->
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
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="100" :checkbox="false"></bus-table>
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
  export default {
    name: 'goods-list-inventory-details',
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
          columns: pageData.details.tableColumns
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

    })
  }

</script>
<style lang="scss" scoped>
</style>
