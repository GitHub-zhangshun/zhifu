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
    name: 'operation-banner',
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
          columns: pageData.banner.tableColumns
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
            para: 'typeId',
            text: '类型',
            type: 'cascader',
            details: {
              showAllLevel: true,
              apiKey: 'O_DIC_CHILDREN_LIST_OUTER',
              requestData: 'banner_type',
              toTree: true
            }
          }]
        },
        dialog: {},
        treeList: []
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      this.getData()
      // 获取banner_type树
      this.$request({
        url: this.hiddenActions['O_DIC_CHILDREN_LIST_OUTER'],
        data: 'banner_type'
      }).then(data => {
        this.treeList = this.getTree(data.result)
      })
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.banner.dialog,
              title: '新增banner',
              apiKey: action.apiKey,
              treeList: this.treeList
            })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            break
          case 'edit':
            this.dialog = this.constructDialogData({
              dialogData: pageData.banner.dialog,
              title: '修改banner',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0],
              treeList: this.treeList
            })
            this.dialog.form.typeId = this.dialog.form.typeList
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
