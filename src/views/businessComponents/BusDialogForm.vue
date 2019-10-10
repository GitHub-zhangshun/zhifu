<template>
  <div class="dialog-component">
    <el-dialog v-el-drag-dialog :title="value.title" :visible.sync="value.status" :fullscreen="fullscreen"
      @close="dialogClose">
      <el-form :model="value.form" :inline="selfInline" label-width="110px" ref="dialogForm" :rules="rules"
        :style="{maxHeight: fullscreen?'700px':'500px', overflow: 'auto'}">
        <ElFormItem v-for="(item, index) in value.columns" :key="index" :label="item.label" :prop="item.prop">
          <!-- select -->
          <el-select v-if="item.type === 'select'" v-model="value.form[item.prop]" :placeholder="item.plc"
            :clearable="!item.noClearable">
            <ElOption v-for="(para, itemIndex) in item.details" :key="itemIndex" :label="para.name"
              :value="para.value" />
          </el-select>
          <!-- 字典下拉 -->
          <DictionarySelect :key="refValue" v-else-if="item.type === 'dictionary'" v-model="value.form[item.prop]"
            :clear="!item.noClearable" :placeholder="item.plc" :simplify="item.details.simplify"
            :outer="item.details.outer" />
          <!-- 接口下拉 -->
          <template v-else-if="item.type === 'service'">
            <ServiceSelect :key="refValue" v-model="value.form[item.prop]" :apiKey="item.details.apiKey" :requestData="item.details.requestData" :show="item.details.show">
            </ServiceSelect>
          </template>
          <!-- 级联选择 -->
          <el-cascader v-else-if="item.type === 'cascader'" v-model="value.form[item.prop]" :placeholder="item.plc"
            :options="item.options" :props="item.props" change-on-select :show-all-levels="true"
            :clearable="!item.noClearable" />
          <!-- 级联选择 动态加载 -->
          <el-cascader v-else-if="item.type === 'cascader-dynamic'" v-model="value.form[item.prop]" :placeholder="item.plc"
            :props="item.props" change-on-select :show-all-levels="true"
            :clearable="!item.noClearable" />
          <!-- 文本 -->
          <el-input v-else-if="item.type === 'textarea'" v-model="value.form[item.prop]" :type="item.type"
            :placeholder="item.plc" :clearable="!item.noClearable" />
          <!-- 单文件上传 -->
          <template v-else-if="item.type === 'single-file'">
            <File1 :key="refValue" v-model="value.form[item.prop]"></File1>
          </template>
          <!-- 单图片上传 -->
          <template v-else-if="item.type === 'single-img'">
            <Image5 :key="refValue" v-model="value.form[item.prop]"></Image5>
          </template>
          <!-- 注册服务下拉 -->
          <el-select v-else-if="item.type === 'select-sign-service'" v-model="value.form[item.prop]"
            :placeholder="item.plc" :clearable="!item.noClearable">
            <ElOption v-for="sign in signList" :key="sign.id" :label="sign.name" :value="sign.id" />
          </el-select>
          <!-- API服务下拉 -->
          <el-select v-else-if="item.type === 'select-api-service'" v-model="value.form[item.prop]"
            :placeholder="item.plc" :clearable="!item.noClearable">
            <ElOption v-for="api in apiList" :key="api.id" :label="api.name" :value="api.id" />
          </el-select>
          <!-- 模糊查询下拉 -->
          <FuzzyQuery :key="refValue" v-else-if="item.type === 'fuzzy'" v-model="value.form[item.prop]" :props="item.details.props"
            :apiKey="item.details.apiKey" @objData="getObjData(item.details.objData, $event)">
          </FuzzyQuery>
          <!-- json 编辑器 -->
           <json-editor v-else-if="item.type === 'json'" ref="jsonEditor"  v-model="value.form[item.prop]" />
          <!-- 其他自定义 -->
          <!-- 动态添加标签 -->
          <template v-else-if="item.type === 'spec-tag-list'">
            <el-tag v-for="(tag, itemIndex) in value.form[item.prop]" :key="itemIndex" size="medium" closable
              :disable-transitions="false" @close="specTagClose(tag, item.prop)">
              {{ tag.name }}
            </el-tag>
            <el-input v-if="specTagInputVisible" ref="saveTagInput" v-model="specTagInputValue" class="input-new-tag"
              @keyup.enter.native="specTagInputConfirm(item.prop)" @blur="specTagInputConfirm(item.prop)" />
            <el-button v-else class="button-new-tag" @click="showSpecTagInput">+ 添加</el-button>
          </template>
          <!-- 默认 文本 -->
          <el-input v-else v-model="value.form[item.prop]" :placeholder="item.plc" :clearable="!item.noClearable">
            <span slot="suffix" v-if="item.unit">{{ item.unit }}</span>
          </el-input>
        </ElFormItem>
        <slot name="cascader-dynamic"></slot>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="" @click="selfInline = !selfInline">{{ selfInline? '竖排模式' : '行内模式' }}</el-button>
        <el-button type="" @click="fullscreen = !fullscreen">{{ fullscreen? '取消全屏' : '全屏' }}</el-button>
        <el-button @click="value.status = false">取 消</el-button>
        <el-button type="primary" :loading="value.loading" :disabled="value.loading" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import DictionarySelect from './DictionarySelect.vue'
  import FuzzyQuery from './FuzzyQuery.vue'
  import ServiceSelect from './ServiceSelect.vue'
  import File1 from '@/components/Upload/File1.vue'
  import Image5 from '@/components/Upload/Image5.vue'
  import JsonEditor from '@/components/JsonEditor'
  export default {
    name: 'BusDialogForm',
    components: {
      DictionarySelect,
      FuzzyQuery,
      ServiceSelect,
      File1,
      Image5,
      JsonEditor
    },
    props: {
      value: {
        type: Object,
        required: true,
        default: () => {}
      },
      inline: {
        type: [String, Boolean],
        default: true
      },
      rules: {
        type: Object,
        default: () => {}
      },
      outerCloseCallBack: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        fullscreen: false,
        signList: [],
        apiList: [],
        allocationKeyList: [],
        selfInline: this.inline,
        specTagInputVisible: false,
        specTagInputValue: '',
        refValue: Math.random()
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      }
    },
    watch: {
      value() {
        // 更新组件刷新值
        this.refValue = Math.random()
      }
    },
    created() {
      // 获取注册服务列表
      if (this.hiddenActions['O_SIGNS']) {
        this.$request({
          url: this.hiddenActions['O_SIGNS'],
          data: {
            index: '1',
            size: '1000'
          }
        }).then(data => {
          this.signList = data.result
        })
      }
      // 获取API服务列表
      if (this.hiddenActions['O_APIS']) {
        this.$request({
          url: this.hiddenActions['O_APIS'],
          data: {
            index: '1',
            size: '1000'
          }
        }).then(data => {
          console.log('tag', 11111)
          this.apiList = data.result
        })
      }
    },
    methods: {
      dialogClose() {
        // TODO: resetFields 方法 不确定有没有问题 
        this.$refs['dialogForm'].resetFields()
        if(this.outerCloseCallBack) {
          this.$emit('close', this.$refs['dialogForm'])
        }else {
          this.value.form = {}
        }
        
        // 更新组件刷新值
        // this.refValue = Math.random()
      },
      // 规格标签关闭
      specTagClose(tag, prop) {
        this.value.form[prop].splice(this.value.form[prop].indexOf(tag), 1)
      },
      // 规格标签输入框添加
      specTagInputConfirm(prop) {
        if (this.specTagInputValue) {
          this.value.form[prop].push({
            name: this.specTagInputValue
          })
        }
        this.specTagInputVisible = false
        this.specTagInputValue = ''
      },
      // 显示规格标签添加输入框
      showSpecTagInput() {
        this.specTagInputVisible = true
        this.$nextTick(_ => {
          this.$refs.saveTagInput[0].$refs.input.focus()
        })
      },
      submit() {
        this.$refs['dialogForm'].validate((valid) => {
          if (valid) {
            this.$emit('dialogSubmit')
          }
        })
      },
      getObjData(e1, e2) {
        if(e1) {
          this.value.form[e1.formName] = e2[e1.dataName]
        }
      }
    },
    mounted(){
      console.log(this.value)
    }
  }

</script>
<style lang="scss" scoped>
  .el-tag+.el-tag {
    margin-left: 5px;
  }

</style>
