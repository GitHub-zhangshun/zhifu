<template>
  <div class="upload-container">
    <el-upload :multiple="false" :show-file-list="false" :on-error="handleImageError" :on-success="handleImageSuccess"
      :http-request="uploadImgRequest" :action="uploadUrl" class="image-uploader" drag>
      <i class="el-icon-upload" />
      <div class="el-upload__text">
        将文件拖到此处，或<em>点击上传</em>
      </div>
    </el-upload>
    <div class="image-preview image-app-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
    <div class="image-preview">
      <div v-show="imageUrl.length>1" class="image-preview-wrapper">
        <img :src="imageUrl">
        <div class="image-preview-action">
          <i class="el-icon-delete" @click="rmImage" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import func from '@/common/func.js'

  export default {
    name: 'SingleImageUpload4',
    props: {
      value: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        uploadLoading: false
      }
    },
    computed: {
      imageUrl() {
        return this.value
      },
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      uploadUrl() {
        const url = this.hiddenActions['O_UPLOAD_URL'] || ''
        if (!url) {
          this.$notify({
            title: '提示',
            message: '引入了图片上传组件，但没有分配上传权限，请分配---来源组件: Image4'
          })
        }
        return url
      }
    },
    methods: Object.assign(func(), {
      rmImage() {
        this.$emit('input', '')
      },
      handleImageSuccess(res, file) {
        this.uploadLoading = false
        this.$emit('input', file.raw.link)
      },
      handleImageError() {
        this.uploadLoading = false
      },
      // 上传前钩子
      beforeUpload(file) {
        this.uploadLoading = true
        if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
          this.uploadLoading = false
          this.$message.error('上传图片类型只能为 png jpg jpeg')
          return false
        }
        const sizeMB = file.size / 1024 / 1024 < this.size
        if (!sizeMB) {
          this.uploadLoading = false
          this.$message.error(`上传图片大小不能超过 ${this.size}MB!`)
        }
        return sizeMB
      }
    })
  }

</script>

<style lang="scss" scoped>
  @import "~@/styles/mixin.scss";

  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;

    .image-uploader {
      width: 35%;
      float: left;
    }

    .image-preview {
      width: 200px;
      height: 200px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;

      .image-preview-wrapper {
        position: relative;
        width: 100%;
        height: 100%;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .image-preview-action {
        position: absolute;
        width: 100%;
        height: 100%;
        left: 0;
        top: 0;
        cursor: default;
        text-align: center;
        color: #fff;
        opacity: 0;
        font-size: 20px;
        background-color: rgba(0, 0, 0, .5);
        transition: opacity .3s;
        cursor: pointer;
        text-align: center;
        line-height: 200px;

        .el-icon-delete {
          font-size: 36px;
        }
      }

      &:hover {
        .image-preview-action {
          opacity: 1;
        }
      }
    }

    .image-app-preview {
      width: 320px;
      height: 180px;
      position: relative;
      border: 1px dashed #d9d9d9;
      float: left;
      margin-left: 50px;

      .app-fake-conver {
        height: 44px;
        position: absolute;
        width: 100%; // background: rgba(0, 0, 0, .1);
        text-align: center;
        line-height: 64px;
        color: #fff;
      }
    }
  }

</style>
