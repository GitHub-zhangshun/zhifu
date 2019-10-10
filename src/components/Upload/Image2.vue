<template>
  <div class="upload-container">
    <el-upload
    :multiple="false"
    :show-file-list="false"
    :on-success="handleImageSuccess"
    class="image-uploader"
    drag
    :on-error="handleImageError"
      :action="uploadUrl"
      :http-request="uploadImgRequest"
      :before-upload="beforeUpload">
      <i class="el-icon-upload" />
      <div class="el-upload__text">将图片拖到此处，或<em>点击上传</em></div>
    </el-upload>
    <div class="image-preview" v-loading="uploadLoading">
      <div v-show="imageUrl" class="image-preview-wrapper">
        <img :src="imageUrl+'?imageView2/1/w/200/h/200'">
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
    name: 'SingleImageUpload',
    props: {
      value: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 2
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
        if(!url) {
          this.$message.error('引入了图片上传组件，但没有分配上传权限，请分配')
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
      beforeUpload(file) {
        this.uploadLoading = true
        // if (file.type !== 'image/png' && file.type !== 'image/jpg' && file.type !== 'image/jpeg') {
        //   this.uploadLoading = false
        //   this.$message.error('上传图片类型只能为 png jpg jpeg')
        //   return false
        // }
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

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";

  .upload-container {
    width: 100%;
    position: relative;
    @include clearfix;

    .image-uploader {
      width: 60%;
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
  }

</style>
