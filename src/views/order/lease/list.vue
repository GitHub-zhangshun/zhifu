<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="100px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :inline="false"></bus-dialog-form>
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
    name: 'order-lease-list',
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
          columns: pageData.list.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'keywords',
            text: '姓名/手机号',
            type: 'text'
          }, {
            para: 'status',
            text: '状态',
            type: 'dictionary',
            details: {
              simplify: 'lease_order_status',
              outer: true
            }
          }, {
            para: 'goldType',
            text: '黄金类型',
            type: 'custom_enum',
            details: {
              parse: [{
                label: 'Au999',
                value: 'Au999'
              }, {
                label: 'Au9999',
                value: 'Au9999'
              }]
            }
          }, {
            para: 'time',
            text: '提交开始时间|提交结束时间',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['startTime', 'endTime']
            }
          }]
        },
        dialog: {}
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
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
