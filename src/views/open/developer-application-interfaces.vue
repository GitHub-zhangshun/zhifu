<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="paraDialog.title" :visible.sync="paraDialog.status">
      <div class="para">
        <el-tag type="">请求参数</el-tag>
        <pre v-html="highLight(paraDialog.para)"></pre>
      </div>
      <div class="result">
        <el-tag type="">返回参数</el-tag>
        <pre v-html="highLight(paraDialog.result)"></pre>
      </div>
    </el-dialog>
    <el-dialog :title="interfacesDialog.title" :visible.sync="interfacesDialog.status" fullscreen>
      <div class="api-container" v-loading="interfacesDialog.loading">
        <dnd-list @interfacesSubmit="interfacesDialogSubmit" :subData="interfacesDialog.subData" list1-title="结果"
          list2-title="数据源" />
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  import DndList from './DndList'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  export default {
    name: 'open-developer-application-interfaces',
    components: {
      BusHeader,
      BusTable,
      DndList,
      BusPagination
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.developerApplicationInterfaces.tableColumns
        },
        search: {
          form: {},
          items: [{
            para: 'name',
            text: '名称',
            type: 'text'
          }, {
            para: 'apiKey',
            text: 'apiKey',
            type: 'text'
          }, {
            para: 'businessId',
            text: '请输入并选择业务分组',
            type: 'fuzzy',
            apiKey: 'O_BUSINESS',
            queryName: 'keyword'
          }]
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        tableListQuery: {
          appId: this.$route.query.id
        },
        paraDialog: {
          title: '',
          status: false,
          para: '',
          result: ''
        },
        interfacesDialog: {
          status: false,
          title: '',
          subData: [],
          apiKey: '',
          loading: false
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
          // 添加接口
          case 'add':
            this.interfacesDialog.apiKey = action.apiKey
            this.interfacesDialog.title = `${this.$route.query.name}分组-授权添加接口`
            this.interfacesDialog.status = true
            // 回显 将 id的值替换为 actionId
            const subData = JSON.parse(JSON.stringify(this.table.list))
            subData.map(item => {
              item.id = item.actionId
            })
            // 此处不做回显
            // this.interfacesDialog.subData = subData
            break
            // 查看参数
          case 'para':
            this.paraDialog = {
              title: `${row[0].name}接口的参数示例`,
              status: true,
              para: row[0].para,
              result: row[0].result
            }
            break
          default:
            break;
        }
      },
      // 接口分配弹窗提交
      interfacesDialogSubmit(){
        this.interfacesDialog.loading = true
        let allotList = []
        this.interfacesDialog.subData.forEach(item => {
          allotList.push({
            actionId: item.actionId,
            businessId: item.businessId
          })
        })
        this.$request({
          url: this.interfacesDialog.apiKey,
          data: {
            dataId: this.$route.query.id,
            allotList
          }
        }).then(data => {
          this.interfacesDialog.status = !data.result
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '没有返回错误消息')
          this.getData()
          this.interfacesDialog.loading = false
        }).catch(() => {
          this.interfacesDialog.loading = false
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
 /deep/pre {
    outline: 1px solid #ccc;
    padding: 16px;
    margin: 8px;
    max-height: 400px;
    overflow: auto;
    background: #292C33;

    .string {
      color: #A6ACB8;
    }

    .number {
      color: darkorange;
    }

    .boolean {
      color: blue;
    }

    .null {
      color: magenta;
    }

    .key {
      color: #9DBC7F;
      font-weight: bold;
    }
  }
</style>
