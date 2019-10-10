a<template>
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
    name: 'trilateral-sms-sendList',
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
          columns: pageData.sendList.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'phone',
            text: '手机号',
            type: 'text'
          }, {
            para: 'title',
            text: '标题',
            type: 'text'
          }, {
            para: 'key',
            text: 'key',
            type: 'text'
          }, {
            para: 'templateType',
            text: '模板类型',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '验证类',
                value: '1'
              }, {
                label: '通知类',
                value: '2'
              }, {
                label: '营销类',
                value: '3'
              }, {
                label: '综合类',
                value: '4'
              }]
            }
          }]
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
