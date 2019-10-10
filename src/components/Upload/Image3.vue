<template>
  <div v-loading="uploadLoading">
    <el-upload list-type="picture-card" :action="uploadUrl"
    multiple show-file-list
    :before-upload="beforeUpload"
    :on-error="handleImageError"
    :on-success="handleImageSuccess"
    :http-request="uploadImgRequest"
    :file-list="imgList"
    :on-remove="rmImage">
      <i class="el-icon-plus"></i>
    </el-upload>
  </div>
</template>

<script>
  import func from '@/common/func.js'

  export default {
    name: 'SingleImageUpload5',
    props: {
      value: {
        type: Array,
        default: []
      },
      size: {
        type: Number,
        default: 2
      },
      width: {
        type: Number,
        default: 100
      },
      height: {
        type: Number,
        default: 100
      }
    },
    data() {
      return {
        uploadLoading: false,
        currentFileUid: '',
        imgList: []
      }
    },
    created() {
      this.value.map(i => {
        this.imgList.push({
          url: i
        })
      })
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
      rmImage(file) {
        if (this.currentFileUid !== file.uid) {
          this.value.splice(this.value.findIndex(v => v === file.url), 1);
          this.$emit('input', this.value)
        }
      },
      handleImageSuccess(res, file) {
        this.uploadLoading = false
        this.value.push(file.raw.link)
        this.$emit('input', this.value)
      },
      handleImageError() {
        this.uploadLoading = false
      },
      // 上传前钩子
      beforeUpload(file) {
        this.currentFileUid = file.uid
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
