<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="350px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <!-- <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :inline="false"></bus-dialog-form> -->
    <!-- 更换手机号记录&更换银行卡记录 -->
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status">
      <bus-table v-model="dialog.table" @rightAction="right_execute" :showAction="false" :checkbox="false" actionColumnWidth="250px"></bus-table>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  // import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'user-list',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      // BusDialogForm
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
            para: 'keywords',
            text: '姓名/手机号',
            type: 'text'
          }, {
            para: 'isOpenAccount',
            text: '认证状态',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '已认证',
                value: 'true'
              }, {
                label: '未认证',
                value: 'false'
              }]
            }
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
        dialog: {
          title: '',
          status: false,
          table: {
            list: [],
            loading: false,
            tableChangeList: [],
            columns: []
          }
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
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          // 更换手机号记录
          case 'phoneLog':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog.title = `${row[0].name} - 手机号更换记录`
            this.dialog.status = true
            this.dialog.table.columns = pageData.list.dialogPhoneTableColumns
            // 获取更换手机号记录
            this.dialog.table.loading = true
            this.$request({
              url: action.apiKey,
              data: {
                userId: row[0].id,
                index: '1',
                size: '10000'
              }
            }).then(data => {
              this.dialog.table.list = data.result
              this.dialog.table.loading = false
            }).catch(() => {
              this.dialog.table.loading = false
            })
            break
          // 银行卡号记录
          case 'bankLog':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog.title = `${row[0].name} - 银行卡更换记录`
            this.dialog.status = true
            this.dialog.table.columns = pageData.list.dialogBankTableColumns
            // 获取更换手机号记录
            this.dialog.table.loading = true
            this.$request({
              url: action.apiKey,
              data: {
                userId: row[0].id,
                index: '1',
                size: '10000'
              }
            }).then(data => {
              this.dialog.table.list = data.result
              this.dialog.table.loading = false
            }).catch(() => {
              this.dialog.table.loading = false
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
