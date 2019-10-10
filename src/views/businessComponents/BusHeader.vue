<template>

  <el-card class="box-card" :body-style="{ padding: '5px 20px' }" shadow="hover">
    <div class="card-header">
      <slot />
      <el-button-group style="margin-right:5px;">
        <el-button type="" icon="el-icon-refresh" plain @click="$emit('updateData')" :disabled="searchDisabled">刷新
        </el-button>
      </el-button-group>
      <el-button-group v-if="topActions.filter(item => item.jsName === 'func_dialog').length > 0"
        style="margin-right:5px;">
        <el-button v-for="action in topActions.filter(item => item.jsName === 'func_dialog')" :key="action.Id"
          :type="action.cssName" @click="$emit('topAction', action)">{{ action.name }}
        </el-button>
      </el-button-group>
      <el-button-group v-if="topActions.filter(item => item.jsName === 'func_execute').length > 0"
        style="margin-right:5px;">
        <el-button v-for="action in topActions.filter(item => item.jsName === 'func_execute')" :key="action.Id"
          :type="action.cssName" @click="$emit('topAction', action)">{{ action.name }}
        </el-button>
      </el-button-group>
      <el-button-group
        v-if="topActions.filter(item => item.jsName === 'func_jump' || item.jsName === 'func_jump_no_arg').length > 0"
        style="margin-right:5px;">
        <el-button
          v-for="action in topActions.filter(item => item.jsName === 'func_jump' || item.jsName === 'func_jump_no_arg')"
          :key="action.Id" :type="action.cssName" @click="$emit('topAction', action)">{{ action.name }}
        </el-button>
      </el-button-group>
      <el-button-group v-if="topActions.filter(item => item.jsName === 'func_del').length > 0">
        <el-button v-for="action in topActions.filter(item => item.jsName === 'func_del')" :key="action.Id"
          :type="action.cssName" @click="$emit('topAction', action)">{{ action.name }}
        </el-button>
      </el-button-group>
    </div>
    <el-form v-if="searchFromItems.length > 0" ref="form" class="form-container" :model="form" :inline="true"
      label-width="100px">
      <div class="card-content">
        <el-form-item v-for="item in searchFromItems" :key="item.para" class="search-form-item" :prop="item.para">
          <!-- 文本类型 -->
          <template v-if="item.type === 'text'">
            <el-input :disabled="searchDisabled" :key="item.para" v-model="form[item.para]"
              :clearable="item.clearable === 'false' ? false : true">
              <template slot="suffix" class="slotClass">{{ item.text }}</template>
            </el-input>
          </template>
          <!-- 时间范围类型 -->
          <template v-if="item.type === 'times'">
            <el-date-picker :disabled="searchDisabled" :key="item.para" v-model="form[item.para]"
              :clearable="item.clearable === 'false' ? false : true" :type="item.details.type" align="right"
              unlink-panels range-separator="至" :start-placeholder="item.text.split('|')[0]"
              :end-placeholder="item.text.split('|')[1]" :picker-options="pickerOptions" />
          </template>
          <!-- 级联选择 -->
          <template v-if="item.type === 'cascader'">
            <Cascader :disabled="searchDisabled" v-model="form[item.para]" :plc="item.text"
              :apiKey="item.details.apiKey" :toTree="item.details.toTree" :requestData="item.details.requestData"
              :showAllLevel="item.details.showAllLevel"></Cascader>
          </template>
          <!-- 字典下拉 -->
          <template v-if="item.type === 'dictionary'">
            <DictionarySelect :disabled="searchDisabled" v-model="form[item.para]"
              :clear="item.clearable === 'false' ? false : true" :placeholder="item.text"
              :simplify="item.details.simplify" :outer="item.details.outer" :showLike="item.details.showLike"
              @clearChange="clearChange" />
          </template>
          <!-- 接口下拉 -->
          <template v-if="item.type === 'service'">
            <ServiceSelect :disabled="searchDisabled" :key="item.para" v-model="form[item.para]"
              @clearChange="clearChange" :apiKey="item.details.apiKey" :requestData="item.details.requestData">
            </ServiceSelect>
          </template>
          <!-- bool枚举类型 -->
          <template v-if="item.type === 'bool_enum'">
            <el-select :disabled="searchDisabled" :key="item.para" v-model="form[item.para]" :placeholder="item.text"
              :clearable="item.clearable === 'false' ? false : true">
              <ElOption :label="item.details.parse[0]" value="true" />
              <ElOption :label="item.details.parse[1]" value="false" />
            </el-select>
          </template>
          <!-- 自定义枚举类型 -->
          <template v-if="item.type === 'custom_enum'">
            <el-select :disabled="searchDisabled" :key="item.para" v-model="form[item.para]" :placeholder="item.text"
              :clearable="item.clearable === 'false' ? false : true">
              <ElOption v-for="(j, i) in item.details.parse" :key="i" :label="j.label" :value="j.value" />
            </el-select>
          </template>
          <!-- 模糊查询 -->
          <template v-if="item.type === 'fuzzy'">
            <FuzzyQuery :disabled="searchDisabled" :key="item.para" v-model="form[item.para]" :plc="item.text"
              :apiKey="item.apiKey" :queryName="item.queryName" :clear="item.clearable === 'false' ? false : true">
            </FuzzyQuery>
          </template>
        </el-form-item>
        <div class="button">
          <el-button type="success" @click="searchSub" :disabled="searchDisabled">查询</el-button>
          <el-button type="" @click="resetForm('form')" :disabled="searchDisabled">重置</el-button>
        </div>
        <el-form-item class="search-form-item">

        </el-form-item>
        <el-form-item class="search-form-item">

        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script>
  import func from '@/common/func'
  import FuzzyQuery from '@/views/businessComponents/FuzzyQuery'
  import ServiceSelect from '@/views/businessComponents/ServiceSelect'
  import DictionarySelect from '@/views/businessComponents/DictionarySelect'
  import Cascader from '@/views/businessComponents/Cascader'
  import {
    pickerOptions
  } from '@/common/constant'
  export default {
    name: 'BusHeader',
    components: {
      FuzzyQuery,
      ServiceSelect,
      DictionarySelect,
      Cascader
    },
    props: {
      value: {
        type: Object,
        default: () => {}
      },
      isCondition: {
        type: Boolean,
        default: false
      },
      defaultQuery: {
        type: Object,
        default: () => {}
      }
    },
    data() {
      return {
        pickerOptions,
        borrowerList: [], // 借款人列表
        providerList: [], // 助贷机构列表
        provinceList: [], // 省份列表
        cityList: [], // 城市列表
        businessGroupList: [], // 网关-业务分组列表
        triggerWatchUpdate: true,
        form: {}
      }
    },
    computed: {
      topActions() {
        return this.$route.meta.actions && this.$route.meta.actions.topActions || []
      },
      rightActions() {
        return this.$route.meta.actions && this.$route.meta.actions.rightActions || []
      },
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || []
      },
      searchFromItems() {
        return this.value && this.value.items || []
      },
      searchDisabled() {
        return this.$store.getters.disabledSearch
      }
    },
    watch: {
      form: {
        handler: function (nd) {
          // 解析范围类型时间 item.details.parse[0] 为开始时间 [1]为结束时间
          this.searchFromItems.forEach(item => {
            if (item.type === 'times') {
              if (nd[item.para] && nd[item.para].length > 0) {
                this.form[item.details.parse[0]] = nd[item.para][0]
                this.form[item.details.parse[1]] = nd[item.para][1]
              } else {
                this.form[item.details.parse[0]] = null
                this.form[item.details.parse[1]] = null
              }
            }
          })
          // // 是否触发watch的数据更新
          // if (this.triggerWatchUpdate) {
          //   // 重置分页状态
          //   this.$store.dispatch('user/ResetTablePage', true)
          //   // 双向绑定数据传递
          //   this.$emit('input', {
          //     form: this.form,
          //     items: this.searchFromItems
          //   })
          //   // this.$emit('updateData')
          // }
          // // 继续触发watch的数据更新状态
          // this.triggerWatchUpdate = true
        },
        deep: true
      }
    },
    created() {
      // 动态添加data->form 属性 实现监听
      const _form = {}
      this.searchFromItems.forEach(item => {
        _form[item.para] = item.details && item.details.value || null
        // 解析时间属性
        if (item.type === 'times') {
          item.details.parse.forEach(j => {
            _form[j] = null
          })
        }
      })
      // 利用object.assign 保留动态添加的属性在VM事列上具有监听效果 // TODO: important 可以利用Object.assign方法保留监听对象 也可以使用vue.set 方法重新创建一个监听对象
      this.form = Object.assign(_form, this.form)
      // 防止页面创建的时候更新 造成两次请求
      this.triggerWatchUpdate = false
    },
    methods: Object.assign(func(), {
      resetForm(formName) {
        // // 重置分页状态
        // this.$store.dispatch('user/ResetTablePage', true)
        // 清空表单
        this.$refs[formName].resetFields()
        // 双向绑定数据传递
        // this.$emit('input', {
        //   form: JSON.parse(JSON.stringify(this.form)),
        //   items: JSON.parse(JSON.stringify(this.searchFromItems))
        // })
        // // 已经触发了父组件数据更新 将watch触发关闭
        // this.triggerWatchUpdate = false
        // this.$emit('updateData')
      },
      clearChange() {
        // 重置分页状态
        // this.$store.dispatch('user/ResetTablePage', true)
        // 已经触发了父组件数据更新 将watch触发关闭
        // this.triggerWatchUpdate = false
        // 传递更新Data事件
        // this.$emit('updateData')
      },
      searchSub() {
        // 重置分页状态
        this.$store.dispatch('user/ResetTablePage', true)
        // 处理condition类型搜索
        let formData = JSON.parse(JSON.stringify(this.form))
        if(this.isCondition) {
          console.log('tag', this.defaultQuery)
          let condition = {}
          let defaultQueryKeys = Object.keys(this.defaultQuery && this.defaultQuery.condition || {})
          // 处理默认数据
          if(this.defaultQuery && this.defaultQuery.condition && defaultQueryKeys.length > 0) {
            defaultQueryKeys.forEach(key => {
              condition[key] = this.defaultQuery.condition[key] || null
            })
          }
          // 处理搜索框数据
          let keys = Object.keys(this.form)
            keys.forEach(key => {
              condition[key] = this.form[key] || null
          })
          formData.condition = condition
        }
        // 双向绑定数据传递
        this.$emit('input', {
          form: formData,
          items: JSON.parse(JSON.stringify(this.searchFromItems))
        })
        this.$emit('updateData')
      }
    })
  }

</script>
<style lang="scss" scoped>
  /deep/.card-content {
    padding-top: 5px;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .el-form-item--mini.el-form-item,
    .el-form-item--small.el-form-item {
      margin-bottom: 0px;
    }

    .button {
      display: flex;
      justify-content: center;
      align-items: center;

      .el-button {
        margin: 0;
        margin-left: 4px;
      }
    }
  }

</style>
