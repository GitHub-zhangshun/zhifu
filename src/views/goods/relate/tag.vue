<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table :key="refKey.toString()" v-model="table" @rightAction="right_execute" @updateView="updateTableView" @updateViewData="updateViewData"></bus-table>
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
    name: 'goods-relate-tag',
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
          columns: pageData.tag.tableColumns
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
          }]
        },
        dialog: {},
        refKey: Math.random(), // 组件刷新KEY值
        copy_table_list: [] // 拷贝源数据
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
            this.dialog = this.constructDialogData({ dialogData: pageData.tag.dialog, title: '新增标签', apiKey: action.apiKey })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.tag.dialog, title: '修改标签', apiKey: action.apiKey, edit: true, ownData: row[0] })
            break
          default:
            break;
        }
      },
      // 更新table组件视图
      updateTableView() {
        this.refKey = Math.random()
      },
      updateViewData(row) {
        // 匹配原数据 看看是否有修改
        const origin = this.copy_table_list.find(i => i.id === row.id)
        if(origin && origin.sort !== row.sort) {
          this.$request({
            url: this.hiddenActions['O_EDIT_SORT'],
            data: row
          }).then(data => {
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
            if(!data.result) {
              // 操作失败还原
              row.sort = origin.sort
            }
            this.getData()
          }).catch(() => {
            row.sort = origin.sort
          })
        }
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
