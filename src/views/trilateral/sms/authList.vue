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
    name: 'trilateral-sms-authList',
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
          columns: pageData.authList.tableColumns
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
            para: 'time',
            text: '开始时间|结束时间',
            type: 'times',
            details: {
              type: 'daterange',
              parse: ['stratTime', 'endTime']
            }
          }]
        },
        dialog: {}
      }
    },
    created () {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_execute(action, row) {
        switch (action.routeKey) {
          case 'limit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$confirm('延长限制次数, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$request({
                url: action.apiKey,
                data: row[0].phone
              }).then(data => {
                data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
                this.getData()
              })
            })
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
