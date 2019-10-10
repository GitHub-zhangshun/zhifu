<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :inline="false" :rules="rules"></bus-dialog-form>
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
  import rules from './pageRules.js'
  export default {
    name: 'configuration-goldPrize-platPrizeSet',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        rules: rules.rental,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.rental.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'isEnable',
            text: '状态',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '启用',
                value: 'true'
              }, {
                label: '禁用',
                value: 'false'
              }]
            }
          }]
        },
        dialog: {},
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.rental.dialog,
              title: '新增',
              apiKey: action.apiKey
            })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.rental.dialog,
              title: '修改',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
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
