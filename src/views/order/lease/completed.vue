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
    name: 'order-lease-completed',
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
          columns: pageData.completed.tableColumns
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
            para: 'leaseStart',
            text: '租赁开始时间起|租赁开始时间止',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['leaseStartTime1', 'leaseStartTime2']
            }
          }, {
            para: 'leaseEnd',
            text: '租赁结束时间起|租赁结束时间止',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['leaseEndTime1', 'leaseEndTime2']
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          status: 'lease_order_status_finsh' // 租赁中
        }
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
