<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search" :isCondition="true" :defaultQuery="tableListQuery"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="200"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :rules="rules"></bus-dialog-form>
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
  import rules from '@/common/rules.js'
  export default {
    name: 'pay-business-operationField',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        rules:rules,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.operationField.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5,
        },
        search: {
          form: {},
          items: [{
            para: 'keyword',
            text: '名称/简写码',
            type: 'text'
          }]
        },
        dialog: {},
        tableListQuery: {
          condition: {
            dataId:this.$route.query.id
          }
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    async created() {
      await this.getData()
    },
    methods: Object.assign(func(), {
      
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.operationField.dialog,
              title: '新增',
              apiKey: action.apiKey,
              btnWay:false,
            })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            this.dialog.form.businessId = this.tableListQuery.condition.dataId
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.operationField.dialog,
              title: '修改',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
            this.dialog.form.businessId = this.tableListQuery.condition.dataId
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
