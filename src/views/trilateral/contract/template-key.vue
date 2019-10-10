<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" />
    <bus-table v-model="table" actionColumnWidth="250px" @rightAction="right_execute" />
    <bus-dialog-form v-model="dialog" :inline="false" @dialogSubmit="dialogSubmit" />
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'trilateral-contract-template-key',
    components: {
      BusHeader,
      BusTable,
      BusDialogForm
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.templateKey.tableColumns
        },
        dialog: {},
        tableListQuery: this.$route.query.id
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({ dialogData: pageData.templateKey.dialog, title: '新增KEY', apiKey: action.apiKey })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            this.dialog.form.templateId = this.$route.query.id
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.templateKey.dialog, title: '修改KEY', apiKey: action.apiKey, edit: true, ownData: row[0] })
            this.dialog.form.templateId = this.$route.query.id
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
