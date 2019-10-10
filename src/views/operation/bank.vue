<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250px"></bus-table>
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
    name: 'operation-bank',
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
          columns: pageData.bank.tableColumns
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
            text: '标题',
            type: 'text'
          }]
        },
        dialog: {},
        tableListQuery: {
          type: 'bank'
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
      // 获取扩展KEY
      // this.$request({
      //   url: this.hiddenActions['O_CONTENT_KEY'],
      //   data:
      // })
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.bank.dialog,
              title: '新增银行',
              apiKey: action.apiKey
            })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            this.dialog.form.typeId = 'bank'
            break
          case 'edit':
            this.dialog = this.constructDialogData({
              dialogData: pageData.bank.dialog,
              title: '修改银行',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
            this.dialog.form.typeId = 'bank'
            break

          default:
            break
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
