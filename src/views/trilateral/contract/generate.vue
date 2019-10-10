<template>
  <div class="app-container">
    <bus-header v-model="search" @updateData="getData" @topAction="top_execute" />
    <bus-table v-model="table" actionColumnWidth="250px" @rightAction="right_execute" />
    <bus-pagination :page-form="pageForm" @updateData="getData" />
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'trilateral-contract-generate',
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
          columns: pageData.generate.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'title',
            text: '名称',
            type: 'text'
          }]
        },
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
