<template>
  <div class="pagination-container">
    <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page="pageForm.index" :page-sizes="[5,10,15,20]" :page-size="pageForm.size"
      layout="total, sizes, prev, pager, next, jumper" :total="pageForm.total">
    </el-pagination>
  </div>
</template>
<script>
  export default {
    props: {
      pageForm: {
        type: Object,
        required: true,
        default: () => {}
      }
    },
    methods: {
      /** 分页插件 每页数量改变事件 */
      handleSizeChange(val) {
        this.pageForm.size = val
        this.$emit('updateData')
      },
      /** 分页插件 当前页数改变事件 */
      handleCurrentChange(val) {
        this.pageForm.index = val
        this.$emit('updateData')
      }
    }
  }

</script>
<style lang="scss" scoped>
</style>
