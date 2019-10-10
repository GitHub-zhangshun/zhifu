<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
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
  import md5 from 'blueimp-md5'
  export default {
    name: 'sys-setting-user',
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
          columns: pageData.user.tableColumns
        },
        search: {
          form: {},
          items: [{
            para: 'loginName',
            text: '登录名',
            type: 'text'
          }, {
            para: 'phone',
            text: '手机号',
            type: 'text'
          }]
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        dialog: {},
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({ dialogData: pageData.user.dialog, title: '新增用户', apiKey: action.apiKey })
            this.dialog.form.password = md5(md5(md5('123456')))
            break
          case 'edit':
            if (row.length !== 1) {
              this.$message.info('请选择一条数据')
              return
            }
            this.dialog = this.constructDialogData({ dialogData: pageData.user.dialog, title: '修改用户', apiKey: action.apiKey, edit: true, ownData: row[0]})
            break
          default:
            break;
        }
      },
      func_execute(action, row) {
        switch (action.routeKey) {
          // 重置密码
          case 'reset':
            this.$confirm('重置密码, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$request({
                url: action.apiKey,
                data: {
                  userId: row[0].id,
                  newPwd: md5(md5(md5('123456')))
                }
              }).then(data => {
                if (data.result) {
                  this.$message.success('操作成功')
                }
              })
            })
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
