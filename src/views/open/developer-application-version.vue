<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="350px"></bus-table>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
    <el-dialog :title="notesDialog.title" :visible.sync="notesDialog.status">
      <el-button type="primary" @click="addNote">添加</el-button>
      <el-table :data="notesDialog.table" v-loading="notesDialog.loading">
        <ElTableColumn label="标题" prop="title"></ElTableColumn>
        <ElTableColumn label="描述" prop="remark"></ElTableColumn>
        <el-table-column fixed="right" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="noteDel(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="noteEdit(scope.row)" type="text" size="small">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="notesDialog.status = false">取 消</el-button>
        <el-button type="primary" @click="notesSubmit">确 定</el-button>
      </span>
      <el-dialog title="新增信息" :visible.sync="notesDialog.innerStatus" append-to-body>
        <el-form :model="notesDialog.innerForm" label-width="88px">
          <ElFormItem label="标题" prop="title">
            <el-input v-model="notesDialog.innerForm.title" placeholder="标题"></el-input>
          </ElFormItem>
          <ElFormItem label="备注" prop="remark">
            <el-input v-model="notesDialog.innerForm.remark" type="textarea" placeholder="备注"></el-input>
          </ElFormItem>
          <ElFormItem label="排序" prop="sort">
            <el-input v-model="notesDialog.innerForm.sort" placeholder="排序"></el-input>
          </ElFormItem>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="innerAdd">确 定</el-button>
        </span>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import md5 from 'blueimp-md5'
  export default {
    name: 'open-developer-application-version',
    components: {
      BusHeader,
      BusTable,
      BusDialogForm
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.developerApplicationVersion.tableColumns
        },
        dialog: {},
        tableListQuery: this.$route.query.id,
        notesDialog: {
          title: '',
          status: false,
          table: [],
          loading: false,
          innerStatus: false,
          innerForm: {},
          innerFormType: 'add',
          apiKey: '',
          versionId: ''
        },
        test: false
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
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.developerApplicationVersion.dialogAdd,
              title: '新增版本',
              apiKey: action.apiKey
            })
            this.dialog.form.appId = this.$route.query.id
            break
            // 设置是否强制更新
          case 'setForce':
            this.dialog = this.constructDialogData({
              dialogData: pageData.developerApplicationVersion.dialogForce,
              title: '设置是否强制更新',
              apiKey: action.apiKey
            })
            this.dialog.form.dataId = row[0].id
            this.dialog.form.item = row[0].isForceUp.toString()
            break
            // 设置是否当前
          case 'setCurrent':
            this.dialog = this.constructDialogData({
              dialogData: pageData.developerApplicationVersion.dialogCurrent,
              title: '设置是否当前',
              apiKey: action.apiKey
            })
            this.dialog.form.dataId = row[0].id
            this.dialog.form.item = row[0].isCurrent.toString()
            break
            // 设置是下载链接
          case 'setLink':
            this.dialog = this.constructDialogData({
              dialogData: pageData.developerApplicationVersion.dialogLink,
              title: '设下载链接',
              apiKey: action.apiKey
            })
            this.dialog.form.dataId = row[0].id
            this.dialog.form.item = row[0].downLink
            break
          case 'notes':
            this.notesDialog.status = true
            this.notesDialog.loading = true
            this.notesDialog.apiKey = action.apiKey
            this.notesDialog.versionId = row[0].id
            // 获取更新信息
            this.$request({
              url: this.hiddenActions['O_NOTES'],
              data: row[0].id
            }).then(data => {
              this.notesDialog.table = data.result
              this.notesDialog.loading = false
            }).catch(() => {
              this.notesDialog.loading = false
            })
            break
          default:
            break;
        }
      },
      addNote() {
        this.innerFormType = 'add'
        this.notesDialog.innerForm = {}
        this.notesDialog.innerStatus = true
      },
      noteDel(row) {
        this.$confirm('确定删除, 是否继续?', '删除功能', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.notesDialog.table = this.notesDialog.table.filter(item => item !== row)
        })
      },
      noteEdit(row) {
        this.innerFormType = 'edit'
        this.notesDialog.innerForm = row
        this.notesDialog.innerStatus = true
      },
      innerAdd() {
        if (this.innerFormType === 'add') {
          this.notesDialog.table.push(this.notesDialog.innerForm)
        }
        this.notesDialog.innerStatus = false
      },
      notesSubmit() {
        this.notesDialog.loading = true
        this.$request({
          url: this.notesDialog.apiKey,
          data: {
            dataId: this.notesDialog.versionId,
            allotList: this.notesDialog.table
          }
        }).then(data => {
          this.notesDialog.loading = false
          this.notesDialog.status = !data.result
          data.result ? this.$message.success('操作成功') : this.$message.error('操作失败')
        }).catch(() => {
          this.notesDialog.loading = false
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
