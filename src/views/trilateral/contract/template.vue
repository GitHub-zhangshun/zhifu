<template>
  <div class="app-container">
    <bus-header v-model="search" @updateData="getData" @topAction="top_execute" />
    <bus-table v-model="table" actionColumnWidth="250px" @rightAction="right_execute" />
    <bus-pagination :page-form="pageForm" @updateData="getData" />
    <bus-dialog-form v-model="dialog" :inline="false" @dialogSubmit="dialogSubmit" />
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
    name: 'trilateral-contract-template',
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
          columns: pageData.template.tableColumns
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
        dialog: {}
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({ dialogData: pageData.template.dialog, title: '新增模板', apiKey: action.apiKey })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.template.dialog, title: '修改模板', apiKey: action.apiKey, edit: true, ownData: row[0] })
            break
          default:
            break;
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
