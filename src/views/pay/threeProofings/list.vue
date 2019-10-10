<template>
  <!-- 三方业务 -->
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search" :isCondition="true"
      :defaultQuery="tableListQuery"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :outerCloseCallBack="true" @close="dialogClose"
      :inline="false" :rules="rules"></bus-dialog-form>
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
  import {
    isObject
  } from "util"
  import rules from '@/common/rules.js'
  const jsonEditorData = {
    "TradeType": "",
    "Version": "",
    "MerchantNo": "",
    "PrivateKey": "",
    "PublicKey": "",
    "WebPageUrl": "",
    "InterfaceUrl": "",
    "GatewayUrl": ""
  }


  export default {
    name: 'pay-threeProofings-list',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        rules: rules,
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
            para: 'keyword',
            text: '名称/简写码',
            type: 'text'
          }]
        },
        dialog: {},
        tableListQuery: {
          condition: {}
        }
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
      dialogSubmit() {
        this.dialog.loading = true
        this.$request({
          url: this.dialog.apiKey,
          data: {
            name: this.dialog.form.name,
            code: this.dialog.form.code,
            remark: this.dialog.form.remark,
            sort: this.dialog.form.sort,
            typeId: this.tableListQuery.condition.dataId,
            id: this.dialog.form.id,
            extendConfig: isObject(this.dialog.form.extendConfig) ? JSON.stringify(this.dialog.form
              .extendConfig) : this.dialog.form.extendConfig.replace(/[\r\n]/g, '').replace(/\s*/g, "")
          }
        }).then(data => {
          this.dialog.status = !data.result
          this.dialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
          this.getData()
        }).catch(() => {
          this.dialog.loading = false
        })
      },
      dialogClose(e) {
        e.resetFields()
        this.dialog.form = {
          extendConfig: jsonEditorData
        }

      },
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog,
              title: '新增',
              apiKey: action.apiKey,
              btnWay: false
            })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            this.dialog.form.extendConfig = jsonEditorData
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog,
              title: '修改',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0]
            })
            this.dialog.form.extendConfig = JSON.parse(this.dialog.form.extendConfig)
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
