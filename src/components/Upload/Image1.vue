<template>
  <div v-loading="uploadLoading">
    <el-upload :action="uploadUrl" :show-file-list="false" :before-upload="beforeUpload"
      :on-success="handleImageSuccess" :on-error="handleImageError" :http-request="uploadImgRequest">
      <img v-if="imageUrl" :src="imageUrl" :style="`max-width:${width}px;max-height:${width}px;`">
      <i v-else class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  import func from '@/common/func.js'

  export default {
    name: 'SingleImageUpload3',
    props: {
      value: {
        type: String,
        default: ''
      },
      size: {
        type: Number,
        default: 2
      },
      width: {
        type: [Number, String],
        default: 100
      },
      height: {
        type: [Number, String],
        default: 100
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

<style rel="stylesheet/scss" lang="scss" scoped>

</style>
