<template>
  <div class="createPost-container">
    <el-form ref="form" :model="form" :rules="rules" class="form-container">
      <sticky class-name="sub-navbar published">
        <el-row>
          <el-col :span="4">
            <span style="color: #fff;font-weight: 600;">{{ pageTitle }}</span>
          </el-col>
          <el-col :span="6" :offset="14">
            <SourceUrlDropdown v-model="form.link" />
            <el-button :loading="loading" :disabled="loading" style="margin-left: 10px;" type="success" @click="submit">提交
            </el-button>
          </el-col>
        </el-row>
      </sticky>

      <div class="createPost-main-container">
        <el-row>
          <el-col :span="24">
            <el-form-item style="margin-bottom: 40px;" prop="title">
              <MDinput v-model="form.title" :maxlength="100" name="title" required>
                标题
              </MDinput>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item style="margin-bottom: 40px;" label-width="45px" label="摘要:">
          <el-input :rows="1" v-model="form.brief" type="textarea" class="article-textarea" autosize
            placeholder="请输入内容" />
          <span v-show="contentShortLength" class="word-counter">{{ contentShortLength }}字</span>
        </el-form-item>

        <el-form-item>
          <el-select v-model="form.isShow" placeholder="是否展示">
            <el-option label="显示" value="true"></el-option>
            <el-option label="隐藏" value="false"></el-option>
          </el-select>
          <el-select v-if="typeList && typeList.length > 0" v-model="form.typeId" placeholder="类型">
            <el-option v-for="item in typeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
          <el-input style="width: 180px;" v-model="form.key" placeholder="请输入key"></el-input>
        </el-form-item>

        <div class="editor-container">
          <Tinymce ref="editor" :height="400" v-model="form.content" />
        </div>

        <!-- <div style="margin-bottom: 20px;">
          <Image4 v-model="form.imgLink" :size="2" />
        </div> -->
      </div>
    </el-form>

  </div>
</template>

<script>
  import Tinymce from '@/components/Tinymce'
  import MDinput from '@/components/MDinput'
  import Sticky from '@/components/Sticky' // 粘性header组件
  import {
    validURL
  } from '@/utils/validate'
  import {
    SourceUrlDropdown
  } from './Dropdown'
  import Image4 from '@/components/Upload/Image4'
  import func from '@/common/func'

  export default {
    name: 'ArticleDetail',
    components: {
      Tinymce,
      MDinput,
      Sticky,
      SourceUrlDropdown,
      Image4
    },
    props: {
      pageTitle: {
        type: String,
        default: () => '新增'
      },
      isEdit: {
        type: Boolean,
        default: false
      }
    },
    data() {
      const validateSourceUri = (rule, value, callback) => {
        if (value) {
          if (validURL(value)) {
            callback()
          } else {
            this.$message({
              message: '外链url填写不正确',
              type: 'error'
            })
            callback(new Error('外链url填写不正确'))
          }
        } else {
          callback()
        }
      }
      return {
        form: {
          title: '',
          brief: '',
          isShow: 'true',
          typeId: ''
        },
        loading: false,
        rules: {
          title: [{
            required: true,
            message: '标题不能为空',
            trigger: 'blur'
          }],
          link: [{
            validator: validateSourceUri,
            trigger: 'blur'
          }]
        },
        typeList: []
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      contentShortLength() {
        return this.form.brief.length
      }
    },
    created() {
      // 是否修改
      if(this.isEdit) {
        // 获取详情
        this.getInfo().then(data => {
          this.form = data.result
          this.form.isShow = this.form.isShow ? 'true' : 'false'
        })
      }
      // 获取类型列表
      this.$request({
        url: this.hiddenActions['O_MAIN_TYPE_LIST_CHILDREN'],
        data: {
          parent: this.$route.query.type,
          isTree: false
        }
      }).then(data => {
        this.typeList = data.result
      })
    },
    methods: Object.assign(func(), {
      submit() {
        this.$refs.form.validate(valid => {
          if (valid) {
            this.form.typeId = this.form.typeId || this.$route.query.type
            this.loading = true
            this.$request({
              url: this.hiddenActions['F_EXECUTE'],
              data: this.form
            }).then(data => {
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
              this.loading = false
              this.$router.go(-1)
            }).catch(() => {
              this.loading = false
            })
          }
        })
      },
      getInfo(){
        return this.$request({
          url: this.hiddenActions['O_INFO'],
          data: this.$route.query.id
        })
      }
    })
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .createPost-container {
    position: relative;

    .createPost-main-container {
      padding: 40px 45px 20px 50px;

      .postInfo-container {
        position: relative;
        @include clearfix;
        margin-bottom: 10px;

        .postInfo-container-item {
          float: left;
        }
      }

      .editor-container {
        min-height: 500px;
        margin: 0 0 30px;

        .editor-upload-btn-container {
          text-align: right;
          margin-right: 10px;

          .editor-upload-btn {
            display: inline-block;
          }
        }
      }
    }

    .word-counter {
      width: 40px;
      position: absolute;
      right: -10px;
      top: 0px;
    }
  }

</style>
