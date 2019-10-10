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
    name: 'user-list-message',
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
          columns: pageData.listMessage.tableColumns
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
            text: '名称',
            type: 'text'
          }, {
            para: 'isRead',
            text: '状态',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '已读',
                value: 'true'
              }, {
                label: '未读',
                value: 'false'
              }]
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          userId: this.$route.query.id
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
          // 新增
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.listMessage.dialog,
              title: '新增消息',
              apiKey: action.apiKey
            })
            this.dialog.form.userId = this.$route.query.id
            break
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
