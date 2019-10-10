<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  // js
  import func from '@/common/func'
  import pageData from '../pageData.js'
  export default {
    name: 'user-cancel-history',
    components: {
      BusHeader,
      BusTable,
      BusPagination
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.history.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'name',
            text: '名称',
            type: 'text'
          }, {
            para: 'time',
            text: '开始时间|结束时间',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['startTime', 'endTime']
            }
          }]
        },
        tableListQuery: {
          isAudit: true
        }
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
