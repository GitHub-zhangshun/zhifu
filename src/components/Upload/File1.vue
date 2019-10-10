<template>
  <el-upload class="upload-demo" drag :action="uploadUrl" :http-request="uploadFileRequest"
    :on-success="handleImageSuccess"
    :on-error="handleImageError"
    :limit="1" accept=".docx">
    <i class="el-icon-upload"></i>
    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
    <div class="el-upload__tip" slot="tip">只能上传docx文件</div>
  </el-upload>
</template>
<script>
  import func from '@/common/func.js'

  export default {
    name: 'file1',
    props: {
      value: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 5
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
            message: '引入了文件上传组件，但没有分配上传权限，请分配---来源组件: File1'
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
        const sizeMB = file.size / 1024 / 1024 < this.size
        if (!sizeMB) {
          this.uploadLoading = false
          this.$message.error(`上传文件大小不能超过 ${this.size}MB!`)
        }
        return sizeMB
      }
    })
  }

</script>
<style lang="scss" scoped>
</style>
