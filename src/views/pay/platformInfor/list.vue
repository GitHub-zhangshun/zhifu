<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search" :isCondition="true" :defaultQuery="tableListQuery"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="200"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <bus-dialog-form v-model="dialog" @dialogSubmit="dialogSubmit" :rules="rules">
      <el-form-item slot="cascader-dynamic" label="三方信息":rules="rules" >
        <el-cascader :props="props" v-model="dialog.form.externalId" @change="onChange"></el-cascader>
      </el-form-item>
    </bus-dialog-form>
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
  import rules from '@/common/rules.js'
  export default {
    name: 'pay-platformInfor-list',
    components: {
      BusHeader,
      BusTable,
      BusPagination,
      BusDialogForm
    },
    data() {
      return {
        rules:rules,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.list.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5,
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
          form: {
            externalId: ''
          }
        },
        tableListQuery:{
          condition:{
          }
        },
        props: {
          lazy: true,
          lazyLoad: (node, resolve) => {
            if (node.root) {
              this.$request({
                url: this.hiddenActions['O_SANFANG'],
                data: {
                  condition: {},
                  index: 1,
                  size: 10000
                }
              }).then(data => {
                let nodes = []
                data.result.forEach(item => {
                  nodes.push({
                    value: item.id,
                    label: item.name
                  })
                })
                resolve(nodes);
              })
            } else {
              this.$request({
                url: this.hiddenActions['O_SF_INFO'],
                data: {
                  condition: {
                    dataId: node.value
                  },
                  index: 1,
                  size: 10000
                }
              }).then(data => {
                let nodes = []
                data.result.forEach(item => {
                  nodes.push({
                    value: item.id,
                    label: item.name
                  })
                })
                resolve(nodes);
              })
            }
          }
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
      onChange(e) {
        this.dialog.form.externalId = e && e[1]
      },
      func_dialog(action, row) {       
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({
              dialogData: pageData.list.dialog,
              title: '新增',
              apiKey: action.apiKey
            })
            this.dialog.form.sort = (this.pageForm.total + 1) * 10
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
