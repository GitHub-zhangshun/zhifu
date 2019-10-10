<template>
  <div class="app-container">
    <div class="post-main-container">
      <el-row>
        <el-col :span="24">
          <el-tag type="warning" style="margin-bottom:20px;">当前岗位:{{currentOrgName}}--{{currentJobName}}</el-tag>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="10">
          <el-row style="margin-bottom:20px;">
            <el-col :span="24">组织机构</el-col>
          </el-row>
          <el-row>
            <el-tree ref="orgTree" node-key="id" :data="orgTree" :props="orgTreeProps" @node-click="orgTreeNodeClick">
            </el-tree>
          </el-row>
        </el-col>
        <el-col :span="13" :offset="1">
          <el-row style="margin-bottom:20px;">
            <el-col :span="24">岗位信息</el-col>
          </el-row>
          <el-row style="margin-bottom:20px;">
            <el-col :span="24">
              <el-tag type="info">所属机构:{{currentOrg.title}}</el-tag>
            </el-col>
          </el-row>
          <el-row style="margin-bottom:20px;">
            <el-col :span="24">
              <el-radio-group v-model="ownJob" size="mini">
                <el-radio border v-for="job in jobList" :key="job.id" :label="job.id">{{job.name}}</el-radio>
              </el-radio-group>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button type="primary" @click="allot">确定</el-button>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
  </div>
</template>


<script>
  import {
    mapGetters
  } from 'vuex'
  export default {
    data() {
      return {
        ownJob: '',
        jobList: '',
        orgTree: [],
        orgTreeProps: {
          label: 'title'
        },
        currentOrg: {},
        currentOrgName: '', // 当前用户的组织机构
        currentJobName: '' // 当前用户的岗位名
      }
    },
    created() {
      // 获取组织机构树
      this.$request({
        url: this.hiddenActions['O_TREE_ORG']
      }).then(data => {
        this.orgTree = data.result
      })
      this.getUserInfo()
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      jobInfos() {
        return this.$store.getters.jobInfos
      }
    },
    methods: {
      async getUserInfo() {
        await this.$request({
          url: this.hiddenActions['O_USER_INFO'],
          data: this.$route.query.id
        }).then(data => {
          // 获取岗位信息
          this.ownJob = data.result.jobList && data.result.jobList.length > 0 ? data.result.jobList[0].jobId : ''
          this.findCurrentOrg(this.orgTree, data.result.jobList && data.result.jobList.length > 0 ? data.result.jobList[0].organizationId : '')
          this.currentJobName = data.result.jobList && data.result.jobList.length > 0 ? data.result.jobList[0].name : ''
        })
      },
      findCurrentOrg(orgTree, orgId) {
        orgTree.forEach(i => {
          if (i.id === orgId) {
            this.currentOrgName = i.title
            return
          }
          if (i.children && i.children.length > 0) {
            this.findCurrentOrg(i.children, orgId)
          }
        })
      },
      orgTreeNodeClick(e) {
        this.currentOrg = e
        // 获取岗位列表
        this.$request({
          url: this.hiddenActions['O_ORG_JOBS'],
          data: e.id
        }).then(data => {
          this.jobList = data.result
        })
      },
      allot() {
        this.$request({
          url: this.hiddenActions['F_EXECUTE'],
          data: {
            dataId: this.$route.query.id,
            allotList: [{
              jobId: this.ownJob,
              isMain: true
            }]
          }
        }).then(() => {
          this.$message.success('操作成功')
          this.$router.go(-1)
        })
      }
    }
  }

</script>

<style lang="scss" scoped>
  /deep/.el-radio.is-bordered+.el-radio.is-bordered {
    margin: 2px 0;
  }

</style>
