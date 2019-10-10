<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="150px"></bus-table>
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
  import Mallki from '@/components/TextHoverEffect/Mallki'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'order-good-subscribeing',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm,
      Mallki
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.subscribeing.tableColumns
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
            para: 'extractStatus',
            text: '是否提货',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '未选择',
                value: '0'
              }, {
                label: '是',
                value: '1'
              }, {
                label: '否',
                value: '2'
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
        dialog: {},
        tableListQuery: {
          status: ['user_order_reserve']
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
          // 核销
          case 'destruction':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog_destruction,
              title: `订单${row[0].number} 进行核销`,
              apiKey: action.apiKey
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
