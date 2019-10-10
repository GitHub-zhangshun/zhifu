<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute"></bus-table>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import md5 from 'blueimp-md5'
  export default {
    name: 'open-developer-certificater',
    components: {
      BusHeader,
      BusTable
    },
    data() {
      return {
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.developerCertificater.tableColumns
        },
        tableListQuery: this.$route.query.id
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_execute(action, row) {
        switch (action.routeKey) {
          // 申请证书
          case 'apply':
            this.$confirm('申请证书, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              this.$request({
                url: action.apiKey,
                data: this.$route.query.id
              }).then(data => {
                if (data.result) {
                  this.$message.success('操作成功')
                  this.getData()
                }
              })
            })
            break
            // 查看私钥
          case 'privateKey':
            this.$request({
              url: action.apiKey,
              data: row[0].id
            }).then(data => {
              this.$notify({
                message: `<h1>私钥为:</h1><br><strong style="color: red;">${data.result}</strong>` || '未获取到私钥',
                dangerouslyUseHTMLString: true,
                duration: 0
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
