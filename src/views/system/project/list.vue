<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
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
    name: 'sys-project-list',
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
          columns: pageData.list.tableColumns
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
            para: 'key',
            text: 'key',
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
            this.dialog = this.constructDialogData({ dialogData: pageData.list.dialog, title: '新增项目', apiKey: action.apiKey })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.list.dialog, title: '修改项目', apiKey: action.apiKey, edit: true, ownData: row[0] })
            break
          default:
            break;
        }
      },
      func_execute(action, row) {
        switch (action.routeKey) {
          case 'auth':
            this.$confirm('内部授权, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.table.loading = true
              this.$request({
                url: action.apiKey,
                data: row[0].id
              }).then(data => {
                data.result ? this.$message.success('授权成功') : this.$message.error('授权失败')
                this.table.loading = false
              }).catch(() => {
                this.table.loading = false
              })
            })
            break;

          default:
            break;
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
