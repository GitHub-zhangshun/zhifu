<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <el-table :data="table.list" border row-key="id" v-loading="table.loading">
      <el-table-column label="名称" prop="title">
      </el-table-column>
      <el-table-column label="图标" width="80px;">
        <template slot-scope="scope">
          <svg-icon v-if="scope.row.ico" :icon-class="scope.row.ico"></svg-icon>
        </template>
      </el-table-column>
      <el-table-column label="是否显示" prop="isShow" width="80px">
        <template slot-scope="scope">
          <span>{{scope.row.isShow?'显示':'隐藏'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="排序" prop="sort">
      </el-table-column>
      <el-table-column v-if="rightActions.length > 0" label="操作">
        <template slot-scope="scope">
          <el-button :type="action.cssName" v-for="action in rightActions" :key="action.Id"
            @click="right_execute({action, row: scope.row})">{{action.name}}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 新增菜单 dialog -->
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit"></bus-dialog-form>
    <!-- 分配功能 dialog -->
    <el-dialog title="分配功能" :visible.sync="dialogActionStatus">
      <el-row>
        <el-button type="primary" size="mini" @click="addAction">添加</el-button>
      </el-row>
      <div style="height: 300px;overflow:scroll;margin-top:5px;">
        <el-table :data="actionOwnList" border style="width: 100%;margin-top:5px;" v-loading="dialogActionTableLoading">
          <el-table-column prop="name" label="名称">
          </el-table-column>
          <el-table-column prop="routeKey" label="routeKey">
          </el-table-column>
          <el-table-column prop="isSelf" label="是否挂载路由">
          </el-table-column>
          <el-table-column prop="isRight" label="位置">
            <template slot-scope="scope">
              <span>{{scope.row.isRight ? '右侧' : '顶部'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="isShow" label="是否显示">
            <template slot-scope="scope">
              <span>{{scope.row.isShow ? '显示' : '隐藏'}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="businessKey" label="业务KEY">
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button type="text" @click="delAction(scope.row)">删除</el-button>
              <el-button type="text" @click="editAction(scope.row)">修改</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogActionStatus = false">取 消</el-button>
        <el-button type="primary" @click="dialogActionSubmit()" :loading="dialogActionLoading" :disabled="dialogActionLoading">确 定</el-button>
      </div>
      <!-- 内层dialog 新增功能 -->
      <el-dialog :title="dialogActionAdd?'添加功能':'修改功能'" :visible.sync="dialogActionInnerStatus" append-to-body
        @close="dialogActionInnerClose" :fullscreen="dialogActionForm.isSelf === 'true'">
        <div class="inner-dialog">
          <el-form :model="dialogActionForm" ref="dialogActionForm" label-position="left" label-width="170px">
            <el-form-item label="是否挂载视图">
              <ElSelect v-model="dialogActionForm.isSelf" placeholder="">
                <ElOption label="是" value="true"></ElOption>
                <ElOption label="否" value="false"></ElOption>
              </ElSelect>
            </el-form-item>
            <el-form-item label="功能">
              <el-select v-model="dialogActionForm.funcId" placeholder="请选择">
                <el-option v-for="actionDic in actionDicList" :key="actionDic.id" :value="actionDic.id"
                  :label="actionDic.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="名称">
              <el-autocomplete v-model="dialogActionForm.name" auto-complete="off" :fetch-suggestions="querySearchName">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="位置">
              <ElSelect v-model="dialogActionForm.isRight" placeholder="">
                <ElOption label="右侧" value="true"></ElOption>
                <ElOption label="顶部" value="false"></ElOption>
              </ElSelect>
            </el-form-item>
            <el-form-item label="routeKey">
              <el-autocomplete v-model="dialogActionForm.routeKey" auto-complete="off"
                :fetch-suggestions="querySearchRoute"></el-autocomplete>
            </el-form-item>
            <el-form-item label="视图配置" v-if="dialogActionForm.isSelf === 'true'">
              <json-editor ref="jsonEditor" v-model="dialogActionForm.routeConfig" />
            </el-form-item>
            <el-form-item label="接口地址">
              <el-autocomplete v-model="dialogActionForm.apiKey" auto-complete="off"
                :fetch-suggestions="querySearchApi">
              </el-autocomplete>
            </el-form-item>
            <el-form-item label="代授权">
              <el-input v-model="dialogActionForm.dependKey" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="业务KEY">
              <el-autocomplete v-model="dialogActionForm.businessKey" auto-complete="off"
                :fetch-suggestions="querySearchBusKey"></el-autocomplete>
            </el-form-item>
            <el-form-item label="排序">
              <el-input v-model="dialogActionForm.sort" auto-complete="off"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogActionInnerStatus = false">取 消</el-button>
          <el-button type="primary" @click="dialogActionInnerSubmit">确 定</el-button>
        </div>
      </el-dialog>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import JsonEditor from '@/components/JsonEditor'
  import BusDialogForm from '@/views/businessComponents/BusDialogForm.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import {
    isObject
  } from "util"
  const jsonEditorData = {
    "path": "/sys/setting/xxx",
    "name": "xxx-xxx-xxx",
    "component": "/system/setting/xxx",
    "meta": {
      "title": "xxx",
      "parentPath": "",
      "noCache": true
    }
  }
  export default {
    name: 'sys-setting-menu',
    components: {
      BusHeader,
      JsonEditor,
      BusDialogForm
    },
    created() {
      this.getData()
      // 功能列表
      this.$request({
        url: this.hiddenActions['O_ALL_ACTIONS']
      }).then(data => {
        this.actionDicList = data.result
      })
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: []
        },
        actionType: 'add',
        dialogActionStatus: false,
        dialogActionForm: {
          routeConfig: jsonEditorData,
          isRight: 'false',
          isSelf: 'false'
        },
        dialogActionTableLoading: false,
        dialogActionLoading: false,
        dialogActionInnerStatus: false,
        dialogActionAdd: false,
        // 当前选择的菜单标题
        currentMenuTitle: '顶级菜单',
        // 当前选择的菜单ID
        currentMenuId: '',
        // 菜单拥有的功能
        actionOwnList: [],
        // 功能字典
        actionDicList: [],
        currentApiKey: '',
        dialog: {},
      }
    },
    computed: {
      rightActions() {
        return this.$route.meta.actions && this.$route.meta.actions.rightActions || []
      },
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    methods: Object.assign(func(), {
      querySearchName(queryString, cb) {
        const results = [{
          value: '查询'
        }, {
          value: '新增'
        }, {
          value: '修改'
        }, {
          value: '删除'
        }, {
          value: '设置'
        }, {
          value: '获取字典子集-外层'
        }, {
          value: '获取字典子集-父级'
        }]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchRoute(queryString, cb) {
        const results = [{
          value: 'add'
        }, {
          value: 'edit'
        }, {
          value: 'view'
        }, {
          value: 'one-para'
        }]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchBusKey(queryString, cb) {
        const results = [{
          value: 'F_TABLE_LIST'
        }, {
          value: 'F_EXECUTE'
        }, {
          value: 'F_INFO'
        }, {
          value: 'O_UPLOAD_URL'
        }, {
          value: 'O_DIC_CHILDREN_LIST_OUTER'
        }, {
          value: 'O_DIC_CHILDREN_LIST'
        }]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      querySearchApi(queryString, cb) {
        const results = [{
          value: '/dictionary/Dictionary/DetailGetListByPSimplify'
        }, {
          value: '/dictionary/Dictionary/DetailGetListByIndexSimplify'
        }]
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      func_dialog(action, row) {
        switch (action.routeKey) {
          // 分配功能
          case 'allot':
            this.currentMenuTitle = row[0].title
            this.currentMenuId = row[0].id
            this.dialogActionStatus = true
            this.currentApiKey = action.apiKey
            this.dialogActionTableLoading = true
            // 获取已经拥有的功能列表
            this.$request({
              url: this.hiddenActions['O_MENU_ACTIONS'],
              data: row[0].id
            }).then(data => {
              data.result.map(i => {
                i.isSelf = i.isSelf.toString()
                i.isShow = i.isShow && i.isShow.toString()
              })
              this.actionOwnList = data.result
              this.dialogActionTableLoading = false
            })
            break
            // 新增顶级菜单
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.menu.dialog,
              title: '新增顶级菜单',
              apiKey: action.apiKey,
              treeList: this.table.list
            })
            this.dialog.form.sort = (this.table.list.length + 1) * 10
            break
            // 新增子级菜单
          case 'add_right':
            this.dialog = this.constructDialogData({
              dialogData: pageData.menu.dialog,
              title: `新增菜单-父菜单: ${row[0].title}`,
              apiKey: action.apiKey,
              treeList: this.table.list
            })
            this.dialog.form.parentId = row[0].id
            this.dialog.form.sort = row[0].sort * 100 + (row[0].children.length + 1) * 10
            break
          case 'edit':
            this.dialog = this.constructDialogData({
              dialogData: pageData.menu.dialog,
              title: '修改功能',
              apiKey: action.apiKey,
              edit: true,
              ownData: row[0],
              treeList: this.table.list
            })
            this.dialog.form.parentId = row[0].parentId
            break

          default:
            break
        }
      },
      // 删除菜单功能
      delAction(e) {
        this.$confirm('确定删除该功能, 是否继续?', '删除功能', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 移除功能列表的某一项
          this.actionOwnList = this.actionOwnList.filter(item => item !== e)
        })
      },
      // 新增菜单功能
      addAction() {
        this.dialogActionInnerStatus = true
        this.dialogActionAdd = true
        this.dialogActionForm.sort = (this.actionOwnList.length + 1) * 10
      },
      // 修改菜单已分配功能
      editAction(e) {
        // 变更dialog状态
        this.dialogActionAdd = false
        // 将选中的功能信息赋值到 dialogActionForm
        e.isRight = e.isRight.toString()
        // 如果为视图 序列号json
        if (e.isSelf === 'true') {
          e.routeConfig = isObject(e.routeConfig) ? e.routeConfig : JSON.parse(e.routeConfig)
        } else {
          e.routeConfig = ''
        }
        this.dialogActionForm = e
        // 开启内层dialog
        this.dialogActionInnerStatus = true
      },
      // 分配菜单功能内层确定事件
      dialogActionInnerSubmit() {
        if (this.dialogActionAdd) {
          // 新增菜单功能 添加到功能列表中
          this.actionOwnList.push(this.dialogActionForm)
        }
        // 关闭内层dialog
        this.dialogActionInnerStatus = false
      },
      // 分配菜单内层dialog 关闭事件
      dialogActionInnerClose() {
        // 重置表单
        this.$refs.dialogActionForm.resetFields()
        // 清空data 里面的数据
        this.dialogActionForm = {
          routeConfig: jsonEditorData,
          isRight: 'false',
          isSelf: 'false'
        }
      },
      // 分配菜单功能
      dialogActionSubmit() {
        if (this.actionOwnList.length === 0) {
          this.$message.error('请先添加功能')
          return
        }
        this.dialogActionLoading = true
        // 处理 routeConfig
        this.actionOwnList.map(i => {
          if (i.isSelf !== 'true') {
            i.routeConfig = ''
          } else {
            i.routeConfig = isObject(i.routeConfig) ? JSON.stringify(i.routeConfig) : i.routeConfig
          }
        })
        this.$request({
          url: this.currentApiKey,
          data: {
            allotList: this.actionOwnList,
            dataId: this.currentMenuId
          }
        }).then(() => {
          // 关闭分配功能外层dialog
          this.dialogActionStatus = false
          // 消息提示
          this.$message.success('操作成功')
          this.dialogActionLoading = false
        })
      },
      /** 存在级联选择 使用自身的提交 */
      dialogSubmit() {
        // 是否改变父ID
        const cascader = this.dialog.form.cascader
        if (cascader && cascader.length > 0) {
          this.dialog.form.parentId = cascader[cascader.length - 1]
        }
        this.dialog.loading = true
        this.$request({
          url: this.dialog.apiKey,
          data: this.dialog.form
        }).then(data => {
          this.dialog.status = !data.result
          this.dialog.loading = false
          data.result ? this.$message.success('操作成功') : this.$message.error(data.msg)
          this.getData()
        }).catch(() => {
          this.dialog.loading = false
        })
      }
    })
  }

</script>
<style lang="scss" scoped>
  /deep/.inner-dialog {
    .el-input {
      width: 400px;
    }
  }

</style>
