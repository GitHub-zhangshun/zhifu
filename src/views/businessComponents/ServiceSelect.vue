<template>
  <el-select v-model="currentValue" :placeholder="plc" @change="handelChange" :multiple="multiple" :clearable="clear"
    @clear="$emit('clearChange')" :disabled="disabled">
    <span v-if="prefix" slot="prefix">{{ prefix }}</span>
    <el-option v-for="item in list" :key="item.id" :label="item[props.label]" :value="item[props.value]"></el-option>
  </el-select>
</template>
<script>
  import {
    isBoolean,
    isArray
  } from 'util';
  export default {
    name: 'service-select',
    props: {
      value: {
        type: [String, Array, Object],
        default: () => ''
      },
      plc: {
        type: String,
        default: () => '请选择'
      },
      multiple: {
        type: Boolean,
        default: () => false
      },
      clear: {
        type: Boolean,
        default: () => true
      },
      props: {
        type: Object,
        default: () => {
          return {
            label: 'name',
            value: 'id'
          }
        }
      },
      apiKey: {
        type: String,
        default: () => ''
      },
      requestData: {
        type: [Object, String],
        default: () => null
      },
      returnObj: {
        type: Boolean,
        default: () => false
      },
      dataList: {
        type: Array,
        default: () => []
      },
      prefix: {
        type: String,
        default: () => ''
      },
      // 如果是修改回显，是否需要处理参数
      editMustBeConstruction: {
        type: Boolean,
        default: () => false
      },
      disabled: {
        type: Boolean,
        default: () => false
      },
      show: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        list: this.dataList || [],
        currentValue: this.value || ''
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    created() {
      // 回显，是否需要处理参数
      if (this.editMustBeConstruction) {
        let _currentValue = []
        this.value && this.value.length > 0 && this.value.forEach(item => {
          _currentValue.push(item.id)
        })
        this.currentValue = _currentValue
      }
      // 如果有传地址则实时拉取 没传就取dataList传进来的值
      if (this.apiKey) {
        // 获取下拉数据
        this.$request({
          url: this.hiddenActions[this.apiKey],
          data: this.requestData
        }).then(data => {
          let rData = data.result
          if (this.show && Object.keys(this.show).length > 0) {
            let keys = Object.keys(this.show)
            keys.forEach(key => {

              rData = rData.filter(item => {
                return item[key] == this.show[key]
              })
            })
          }
          this.list = rData
        })
      }
    },
    methods: {
      handelChange(value) {
        if (this.returnObj) {
          // 获取数据对象返回
          let _data = this.list.filter(item => {
            if (isArray(value)) {
              return value.includes(item.id)
            } else {
              return item.id === value
            }
          })
          this.$emit('input', _data)
        } else {
          this.$emit('input', value)
        }
        // change 在input 后触发
        this.$emit('change')
      }
    }
  }

</script>
<style lang="scss" scoped>
</style>
