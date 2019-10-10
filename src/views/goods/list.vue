<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table :key="refKey.toString()" v-model="table" @rightAction="right_execute" @updateView="updateTableView"
      @updateViewData="updateViewData" actionColumnWidth="300"></bus-table>
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
    name: 'goods-list',
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
            para: 'categoryId',
            text: '请输入并选择商品分类',
            type: 'fuzzy',
            apiKey: 'O_GOOD_TYPE_LIST',
            queryName: 'name'
          }, {
            para: 'isUse',
            text: '上架状态',
            type: 'bool_enum',
            details: {
              parse: ['已上架', '未上架']
            }
          }, {
            para: 'popular',
            text: '是否热门',
            type: 'bool_enum',
            details: {
              parse: ['是', '否']
            }
          }, {
            para: 'recommend',
            text: '是否推荐',
            type: 'bool_enum',
            details: {
              parse: ['是', '否']
            }
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
          // 设置推荐
          case 'set_recommend':
            if (row.length === 0) {
              this.$message.info('请选择数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog_recommend,
              title: '设置推荐',
              apiKey: action.apiKey
            })
            this.dialog.rows = row
            break
            // 设置热门
          case 'set_hot':
            if (row.length === 0) {
              this.$message.info('请选择数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog_hot,
              title: '设置热门',
              apiKey: action.apiKey
            })
            this.dialog.rows = row
            break
          default:
            break;
        }
      },
      /** 自定义弹窗提交事件 */
      dialogSubmit() {
        let data = []
        // 构造数据
        let _form = this.dialog.form
        this.dialog.rows.forEach(item => {
          _form.id = item.id
          data.push(JSON.parse(JSON.stringify(_form)))
        })
        this.dialog.loading = true
        this.$request({
          url: this.dialog.apiKey,
          data,
        }).then(data => {
          this.dialog.status = !data.result
          this.dialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
          this.getData()
        }).catch(() => {
          this.dialog.loading = false
        })
      },
      func_execute(action, row) {
        switch (action.routeKey) {
          // 上架
          case 'up':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$confirm('商品上架, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.table.loading = true
              this.$request({
                url: action.apiKey,
                data: [{
                  id: row[0].id,
                  isUse: true
                }]
              }).then(data => {
                data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
                this.table.loading = false
                this.getData()
              }).catch(() => {
                this.table.loading = false
              })
            })
            break;
            // 下架
          case 'down':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$confirm('商品下架, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.table.loading = true
              this.$request({
                url: action.apiKey,
                data: [{
                  id: row[0].id,
                  isUse: false
                }]
              }).then(data => {
                data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
                this.table.loading = false
                this.getData()
              }).catch(() => {
                this.table.loading = false
              })
            })
            break;
            // 当前价格
          case 'price':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.$message.success('查询中，请稍后！！')
            this.$request({
              url: action.apiKey,
              data: row[0].id
            }).then(data => {
              this.$notify({
                // title: '商品当前价格',
                dangerouslyUseHTMLString: true,
                message: `<strong>商品： <i>${row[0].name}</i> </strong>
                <br/>
                <strong>实时价格： <i style="color: red">${data.result || '未获取到数据'}</i> </strong>
                `
              });
            })
            break;

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
        if (origin && origin.sort !== row.sort) {
          this.$request({
            url: this.hiddenActions['O_EDIT_SORT'],
            data: {
              id: row.id,
              sort: row.sort
            }
          }).then(data => {
            data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
            if (!data.result) {
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
