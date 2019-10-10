<template>
  <el-select v-model="currentValue" :placeholder="placeholder" :clearable="clear" @clear="$emit('clearChange')" :disabled="disabled"
    @change="handelChange">
    <span v-if="prefix" slot="prefix">{{ prefix }}</span>
    <el-option v-for="item in dataList" :key="item[options.value]" :disabled="!item.isUse" :label="item[options.label]"
      :value="item[options.value]" />
  </el-select>
</template>
<script>
  export default {
    name: 'DictionarySelect',
    props: {
      value: {
        type: String,
        default: () => ''
      },
      propList: {
        type: Array,
        default: () => []
      },
      placeholder: {
        type: String,
        default: () => '请选择'
      },
      options: {
        type: Object,
        default: () => {
          return {
            value: 'id',
            label: 'title'
          }
        }
      },
      simplify: {
        type: String,
        default: () => ''
      },
      outer: {
        type: Boolean,
        required: false,
        default: () => false
      },
      disabled: {
        type: Boolean,
        default: () => false
      },
      clear: {
        type: Boolean,
        default: () => true
      },
      prefix: {
        type: String,
        default: () => ''
      },
      showLike: {
        type: String,
        default: () => ''
      }
    },
    data() {
      return {
        dataList: this.propList || [],
        currentValue: this.value
      }
    },
    created() {
      // outer /dictionary/Dictionary/DetailGetListByIndexSimplify
      // inner /dictionary/Dictionary/DetailGetListByPSimplify
      if (this.simplify) {
        const url = this.outer ? this.$route.meta.actions.hiddenActions['O_DIC_CHILDREN_LIST_OUTER'] : this.$route.meta
          .actions.hiddenActions['O_DIC_CHILDREN_LIST']
        if (!url) {
          return this.$message.error('请先分配获取字典列表的菜单接口')
        }
        this.$request({
          url,
          data: this.simplify
        }).then(data => {
          let list = []
          // 获取匹配显示
          if(this.showLike) {
            list = data.result.filter(item => item.remark && item.remark.indexOf(this.showLike) !== -1 )
          } else {
            list = data.result
          }
          this.dataList = list
        })
      }
    },
    methods: {
      handelChange(val) {
        this.$emit('input', val)
      }
    }
  }

</script>
<style lang="scss" scoped>
</style>
