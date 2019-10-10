<template>
<!-- 三方信息 -->
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search" :isCondition="true"
      :defaultQuery="tableListQuery"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="200"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog :title="dialog.title" :visible.sync="dialog.status" @close="dialogClose" >
      <div class="inner-dialog">
        <el-form :model="dialog.form" ref="dialogForm" label-position="left" label-width="170px" :rules="rules">
          <el-form-item label="名称">
            <el-input v-model="dialog.form.name" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="简写码">
            <el-input v-model="dialog.form.code" auto-complete="off">
            </el-input>
          </el-form-item>
          <el-form-item label="回调通知apiKey">
            <el-input v-model="dialog.form.callBackApiKey" auto-complete="off">
            </el-input>
          </el-form-item>
        
          <el-form-item label="视图配置">
            <json-editor ref="jsonEditor" v-model="dialog.form.extendConfig" />
          </el-form-item>
          <el-form-item label="排序">
            <el-input v-model="dialog.form.sort" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="dialog.form.remark" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" @click="dialogSubmit">确 定</el-button>
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
  import JsonEditor from '@/components/JsonEditor'
  import {
    isObject
  } from "util"
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
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
    name: 'pay-threeProofings-listInfo',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm,
      JsonEditor
    },
    data() {
      return {
        rules:rules,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.listInfo.tableColumns
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
        dialog: {
          title: '21321',
          status: false,
          form: {
            extendConfig: jsonEditorData
          }
        },
        tableListQuery: {
          condition: {
            dataId: this.$route.query.id
          }
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
            id:this.dialog.form.id,
            callBackApiKey:this.dialog.form.callBackApiKey,
            extendConfig:isObject(this.dialog.form.extendConfig) ? JSON.stringify(this.dialog.form.extendConfig): this.dialog.form.extendConfig.replace(/[\r\n]/g,'').replace(/\s*/g,"")
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
      dialogClose() {
        this.dialog.form = {
          extendConfig: jsonEditorData
        }
      },
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog.title = '新增'
            this.dialog.apiKey = action.apiKey
            this.dialog.status = true
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
            this.dialog.form.typeId = this.tableListQuery.condition.dataId
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({
              dialogData: pageData.listInfo.dialog,
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
