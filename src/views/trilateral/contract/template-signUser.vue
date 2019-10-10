<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" />
    <bus-table v-model="table" actionColumnWidth="250px" @rightAction="right_execute" />
    <bus-dialog-form v-model="dialog" :inline="false" @dialogSubmit="dialogSubmit" />
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
  export default {
    name: 'trilateral-contract-template-signUser',
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
          columns: pageData.templateSignUser.tableColumns
        },
        dialog: {},
        tableListQuery: this.$route.query.id
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'add':
            this.dialog = this.constructDialogData({ dialogData: pageData.templateSignUser.dialog, title: '新增模板', apiKey: action.apiKey })
            this.dialog.form.templateId = this.$route.query.id
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
