<template>
  <el-select :disabled="disabled" v-model="currentValue" filterable remote :placeholder="plc" :remote-method="getList"
    :clearable="clear" :loading="loading" popper-class="search-select" @change="handleChange" @clear="$emit('clear')">
    <el-option v-for="j in list" :key="j[props.value]" :label="j[props.label]" :value="j[props.value]">
      <template v-if="props.cusLabel">
        <span style="float: left">{{ j[props.label] }}</span>
        <span style="float: right; color: #8492a6; font-size: 13px">
          <span v-for="(label, index) in props.cusLabel.split('|')" :key="index">{{ j[label] }}</span>
        </span>
      </template>
    </el-option>
  </el-select>
</template>
<script>
  export default {
    name: 'fuzzy-query',
    props: {
      value: {
        type: [String, Object],
        default: () => ''
      },
      plc: {
        type: String,
        default: () => '请输入然后选择'
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
            cusLabel: '',
            value: 'id',
          }
        }
      },
      apiKey: {
        type: String,
        required: true,
        default: () => ''
      },
      queryName: {
        type: String,
        default: () => ''
      },
      disabled: {
        type: Boolean,
        default: () => false
      }
    },
    data() {
      return {
        list: [],
        currentValue: this.value,
        loading: false
      }
    },
    watch: {
      value(nd) {
        this.currentValue = nd
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || []
      }
    },
    methods: {
      getList(query) {
        let data = ''
        // 构造 data
        if (this.queryName) {
          // 如果存在指定key 则为分页对象
          data = {
            index: '1',
            size: '10'
          }
          data[this.queryName] = query
        } else {
          data = query
        }
        if (query) {
          this.loading = true
          this.$request({
            url: this.hiddenActions[this.apiKey],
            data,
          }).then(data => {
            this.list = data.result
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      },
      handleChange(e) {
        this.$emit('input', this.currentValue)
        this.$emit('objData', this.list.find(item => item.u_code === e))
      }
    }
  }

</script>
<style lang="scss" scoped>
</style>
