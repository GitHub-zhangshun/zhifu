<template>
  <div class="app-container">
    <bus-header @updateData="getData_custom" @topAction="top_execute" v-model="search"></bus-header>
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
    name: 'order-good-immediately',
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
            text: '标题',
            type: 'text'
          }, {
            para: 'type',
            text: '类型',
            type: 'service',
            details: {
              apiKey: 'O_MAIN_TYPE_LIST',
              requestData: {
                parent: 'other',
                isTree: false
              }
            }
          }]
        },
        dialog: {},
        tableListQuery: {
          type: 'other'
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
      getData_custom() {
        const type = this.search.form.type
        type && (this.tableListQuery.type = type) || (this.tableListQuery
          .type = 'other')
        this.getData()
      },
      // 自定义跳转
      func_jump_no_arg(action, row) {
        this.$router.push({
          path: action.routeKey,
          query: {
            type: 'other',
            pageTitle: '新增其他',
          }
        })
      },
      /** 带参数基础路由跳转事件 */
      func_jump(action, row) {
        if (row.length !== 1) {
          this.$message.info('请选择一条数据')
          return
        }
        // 构建跳转参数
        const query = {
          id: row[0].id,
          type: 'other',
          pageTitle: '修改其他',
          name: row[0].title
        }
        this.$router.push({
          path: action.routeKey,
          query
        })
      },
    })
  }

</script>
<style lang="scss" scoped>
</style>
