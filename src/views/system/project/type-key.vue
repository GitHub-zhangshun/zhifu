<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
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
    name: 'sys-project-type-key',
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
          columns: pageData.typeKey.tableColumns
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
            this.dialog = this.constructDialogData({ dialogData: pageData.typeKey.dialog, title: '新增KEY', apiKey: action.apiKey })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            this.dialog.form.typeId = this.$route.query.id
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.typeKey.dialog, title: '修改KEY', apiKey: action.apiKey, edit: true, ownData: row[0] })
            this.dialog.form.typeId = this.$route.query.id
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
