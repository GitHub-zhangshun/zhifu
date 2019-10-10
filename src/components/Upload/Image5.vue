<template>
  <el-upload class="upload-demo" :action="uploadUrl" :http-request="uploadImgRequest" list-type="picture-card"
    :file-list="imgList" :on-success="handleImageSuccess" :on-error="handleImageError" :limit="1">
    <i class="el-icon-upload"></i>
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
        uploadLoading: false,
        imgList: []
      }
    },
    watch: {
      value(nd) {
        this.imgList = []
        if (nd) {
          this.imgList.push({
            url: this.value
          })
        }
      }
    },
    computed: {
      hiddenActions() {
        return this.$route.meta.actions && this.$route.meta.actions.hiddenActions || {}
      },
      uploadUrl() {
        const url = this.hiddenActions['O_UPLOAD_URL'] || ''
        if (!url) {
          this.$notify({
            title: '提示',
            message: '引入了图片上传组件，但没有分配上传权限，请分配---来源组件: Image5'
          })
        }
        return url
      }
    },
    methods: Object.assign(func(), {
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
<style lang="scss" scoped>
  .el-icon-upload {
    width: 100px;
    height: 50px;
  }

</style>
