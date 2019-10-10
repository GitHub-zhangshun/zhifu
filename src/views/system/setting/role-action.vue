<template>
  <div class="app-container">
    <ElRow v-loading="!isData">
      <ElCol :span="11">
        <el-card class="box-card">
          <div slot="header" class="header">
            <el-input placeholder="输入关键字进行过滤" v-model="menu.searchData">
            </el-input>
            <ElButton type="danger" @click="clear" :loading="action.loading" :disabled="action.loading">清除所有权限</ElButton>
          </div>
          <div class="menu">
            <el-tree v-if="isData" ref="menuTree" node-key="id" :default-expanded-keys="menu.haveActionMenuIds"
              highlight-current :accordion="false" :data="menu.treeData" :props="menu.props" @node-click="menuClick"
              :filter-node-method="filterNode">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span v-if="data.haveAction" style="color:red;font-size:12px;">
                  (已分配)
                </span>
              </span>
            </el-tree>
          </div>
        </el-card>
      </ElCol>
      <ElCol :span="12" :offset="1">
        <el-card class="box-card">
          <div slot="header" class="header">
            <ElButton type="success">当前菜单: {{action.title}}</ElButton>
            <ElButton type="primary" @click="allot" :loading="action.loading" :disabled="action.loading">确定</ElButton>
          </div>
          <div class="action">
            <el-checkbox-group v-model="action.ownActions" size="mini" class="checkbox">
              <el-checkbox border v-for="action in action.menuActions" :key="action.id" :label="action.id">
                {{action.name}}
              </el-checkbox>
            </el-checkbox-group>
          </div>
        </el-card>
      </ElCol>
    </ElRow>
  </div>
</template>
<script>
  export default {
    name: 'sys-setting-role-action',
    data() {
      return {
        menu: {
          searchData: '',
          props: {
            children: 'children',
            label: 'title'
          },
          treeData: [],
          haveActionMenuIds: []
        },
        action: {
          loading: false,
          ownActions: [],
          menuActions: [],
          allActions: [],
          title: ''
        },
        isData: false
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    watch: {
      'menu.searchData': function(val) {
        this.$refs.menuTree.filter(val)
      }
    },
    async created() {
      // 获取树形菜单
      await this.$request({
        url: this.hiddenActions['O_TREE_MENUS']
      }).then(data => {
        this.menu.treeData = data.result
      })
      // 获取已有功能
      await this.$request({
        url: this.hiddenActions['O_ROLE_ACTIONS'],
        data: this.$route.query.id
      }).then(data => {
        data.result.forEach(item => {
          this.action.ownActions.push(item.runFuncId)
        })
      })
      // 获取所有运行时功能
      await this.$request({
        url: this.hiddenActions['O_ALL_ACTIONS']
      }).then(data => {
        this.action.allActions = data.result
      })
      await this.matchingHaveActionMenus()
      this.isData = true
    },
    methods: {
      // 菜单过滤
      filterNode(value, data) {
        if (!value) return true
        return data.title.indexOf(value) !== -1
      },
      // 菜单点击事件
      menuClick(menu) {
        // 获取菜单运行时功能
        this.action.title = menu.title
        this.action.menuActions = this.action.allActions.filter(item => item.menuId === menu.id && (item.isShow || item
          .businessKey === 'F_TABLE_LIST' || item.businessKey === 'F_EXECUTE' || item.businessKey === 'F_INFO')).sort((a, b) => a.sort - b.sort)
      },
      // 分配提交
      allot() {
        let allotList = []
        this.action.loading = true
        this.action.ownActions.forEach(item => {
          allotList.push({
            runFuncId: item
          })
        })
        this.$request({
          url: this.hiddenActions['F_EXECUTE'],
          data: {
            dataId: this.$route.query.id,
            allotList
          }
        }).then(data => {
          this.action.loading = false
          if (data.result) {
            this.$message.success('操作成功')
            this.$router.go(-1)
          }
        })
      },
      // 匹配已经分配过功能的菜单集合
      matchingHaveActionMenus() {
        if (this.action.allActions && this.action.allActions.length > 0 && this.menu.treeData && this.menu.treeData
          .length > 0) {
          // 遍历已有运行时功能 匹配已经分配过功能的菜单
          this.action.ownActions.forEach(ownActionId => {
            let actionObj = this.action.allActions.filter(menuAction => menuAction.id === ownActionId)
            if (actionObj && actionObj.length > 0) {
              this.menu.haveActionMenuIds.push(actionObj[0].menuId)
            }
          })
          // 去重
          this.menu.haveActionMenuIds = [...new Set(this.menu.haveActionMenuIds)]
          // 给菜单树加标识
          if (this.menu.haveActionMenuIds.length > 0) {
            this.addMenuTreeLogo(this.menu.treeData, this.menu.haveActionMenuIds)
          }
        }
      },
      // 给有功能的菜单加标识
      addMenuTreeLogo(menuTree, haveActionMenuIds) {
        menuTree.map(i => {
          if (haveActionMenuIds.includes(i.id)) {
            i.haveAction = true
          } else {
            i.haveAction = false
          }
          if (i.children && i.children.length > 0) {
            this.addMenuTreeLogo(i.children, haveActionMenuIds)
          }
        })
      },
      // 清除所有权限
      clear() {
        this.action.loading = true
        this.$confirm('此操作将清除当前角色的所有权限, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request({
            url: this.hiddenActions['F_EXECUTE'],
            data: {
              dataId: this.$route.query.id,
              allotList: []
            }
          }).then(data => {
            this.action.loading = false
            if (data.result) {
              this.$message.success('操作成功')
              this.$router.go(-1)
            }
          })
        }).catch(() => {
          this.$message.success('数据无价 三思而后行 点赞 👍')
        })
      }
    }
  }

</script>
<style lang="scss" scoped>
  .header {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  /deep/.action {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: center;

    .el-checkbox.is-bordered+.el-checkbox.is-bordered {
      margin-left: 0;
      margin-bottom: 2px;
    }
  }

</style>
