<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :inline="false"></bus-dialog-form>
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
  import pageData from '../pageData.js'
  export default {
    name: 'gateway-api-interfaces',
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
          columns: pageData.apiInterfaces.tableColumns
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
        dialog: {},
        tableListQuery: {
          serviceId: this.$route.query.id
        },
        paraDialog: {
          title: '',
          status: false,
          para: '',
          result: ''
        }
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.apiInterfaces.dialog,
              title: '新增接口',
              apiKey: action.apiKey
            })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            this.dialog.form.serviceId = this.$route.query.id
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.apiInterfaces.dialog,
              title: '修改接口',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
            this.dialog.form.serviceId = this.$route.query.id
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
