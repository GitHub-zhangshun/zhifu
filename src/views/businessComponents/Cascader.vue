<template>
  <el-cascader :disabled="disabled" v-model="currentValue" :placeholder="plc" :options="list" :props="props" change-on-select
    :show-all-levels="showAllLevel" :clearable="clear" @change="handleChange" />
</template>
<script>
  import {
    isBoolean,
    isArray
  } from 'util'
  import func from '@/common/func.js'
  export default {
    name: 'Cascader',
    props: {
      value: {
        type: [String, Array],
        default: () => ''
      },
      showAllLevel: {
        type: Boolean,
        default: () => false
      },
      plc: {
        type: String,
        default: () => '请选择'
      },
      dataList: {
        type: Array,
        default: () => []
      },
      props: {
        type: Object,
        default: () => {
          return {
            value: 'id',
            label: 'title',
            children: 'children',
            disabled: 'disabled'
          }
        }
      },
      multiple: {
        type: Boolean,
        default: () => false
      },
      clear: {
        type: Boolean,
        default: () => true
      },
      apiKey: {
        type: String,
        default: () => ''
      },
      requestData: {
        type: [Object, String],
        default: () => null
      },
      toTree: {
        type: Boolean,
        default: () => false
      },
      disabled: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        list: this.dataList || [],
        currentValue: this.value || []
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      // 如果有传地址则实时拉取 没传就取dataList传进来的值
      if (this.apiKey) {
        if (!this.hiddenActions[this.apiKey]) {
          this.$message.error('引入了级联组件，但没有分配权限，请分配 来源：Cascader')
        } else {
          // 获取下拉数据
          this.$request({
            url: this.hiddenActions[this.apiKey],
            data: this.requestData
          }).then(data => {
            if (this.toTree) {
              this.list = this.getTree(data.result)
            } else {
              this.list = data.result
            }
          })
        }
      }
    },
    methods: Object.assign(func(), {
      handleChange() {
        // 取最后一个id
        const length = this.currentValue.length
        this.$emit('input', this.currentValue[length - 1])
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
