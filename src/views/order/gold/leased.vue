<template>
  <div class="app-container">
    <bus-header @updateData="getData_custom" @topAction="top_execute" v-model="search"></bus-header>
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
    name: 'order-good-leased',
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
          columns: pageData.leased.tableColumns
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
            para: 'statusId',
            text: '状态',
            type: 'dictionary',
            details: {
              simplify: 'gold_lease_order_status',
              outer: true
            }
          }, {
            para: 'time',
            text: '到期开始时间|到期结束时间',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['startTime', 'endTime']
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          status: []
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
      getData_custom() {
        this.tableListQuery.status = []
        const statusId = this.search.form.statusId
        statusId && this.tableListQuery.status.push(statusId) || (this.tableListQuery.status = [])
        this.getData()
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
