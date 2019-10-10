<template>
  <div class="app-container">
    <bus-header @updateData="getData" @topAction="top_execute" v-model="search"></bus-header>
    <bus-table v-model="table" @rightAction="right_execute" actionColumnWidth="250px"></bus-table>
    <bus-pagination :pageForm="pageForm" @updateData="getData"></bus-pagination>
    <el-dialog v-el-drag-dialog :title="dialog.title" :visible.sync="dialog.status" @close="dialogClose">
      <el-form :model="dialog.form" label-width="100px" :rules="rules" ref="form">
        <el-form-item label="黄金类型" prop="isHighPrecision">
          <el-select v-model="dialog.form.isHighPrecision" placeholder="请选择" @change="handleChange">
            <el-option label="Au9999 高精度" value="true"></el-option>
            <el-option label="Au999" value="false"></el-option>
          </el-select>
        </el-form-item>
        <!-- Au9999 高精度 -->
        <template v-if="dialog.form.isHighPrecision === 'true'">
          <el-form-item label="获取方式" prop="isAutomatic">
            <el-select v-model="dialog.form.isAutomatic" placeholder="请选择">
              <el-option label="自动获取" value="true"></el-option>
              <el-option label="手动设置" value="false"></el-option>
            </el-select>
          </el-form-item>
          <!-- 自动获取 -->
          <template v-if="dialog.form.isAutomatic === 'true'">
            <el-form-item label="溢价比例" prop="rate">
              <el-input v-model="dialog.form.rate" placeholder="溢价比例">
                <span slot="suffix">%</span>
              </el-input>
            </el-form-item>
          </template>
          <!-- 手动设置 -->
          <template v-if="dialog.form.isAutomatic === 'false'">
            <el-form-item label="平台金价" prop="goldPrice">
              <el-input v-model="dialog.form.goldPrice" placeholder="平台金价">
                <span slot="suffix">元/克</span>
              </el-input>
            </el-form-item>
          </template>
        </template>
        <!-- Au999 低精度 -->
        <template v-if="dialog.form.isHighPrecision === 'false'">
          <el-form-item label="获取方式" prop="isAutomatic">
            <el-select v-model="dialog.form.isAutomatic" disabled placeholder="请选择">
              <el-option label="自动获取" value="true"></el-option>
              <el-option label="手动设置" value="false"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="回收金价" prop="goldPrice">
            <el-input v-model="dialog.form.goldPrice" placeholder="平台金价">
              <span slot="suffix">元/克</span>
            </el-input>
          </el-form-item>
        </template>
        <el-form-item label="操作备注" prop="remark">
          <el-input type="textarea" placeholder="请输入内容" v-model="dialog.form.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog.status = false">取 消</el-button>
        <el-button type="primary" :loading="dialog.loading" :disabled="dialog.loading" @click="dialogSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  // component
  import BusHeader from '@/views/businessComponents/BusHeader.vue'
  import BusTable from '@/views/businessComponents/BusTable.vue'
  import BusPagination from '@/views/businessComponents/BusPagination.vue'
  // js
  import func from '@/common/func'
  import pageData from './pageData.js'
  import rules from './pageRules.js'
  export default {
    name: 'configuration-goldPrize-platRecycleSet',
    components: {
      BusHeader,
      BusTable,
      BusPagination
    },
    data() {
      return {
        rules: rules.platPrizeSet,
        table: {
          list: [],
          loading: false,
          tableChangeList: [],
          columns: pageData.platRecycleSet.tableColumns
        },
        pageForm: {
          total: 0,
          index: 1,
          size: 5
        },
        search: {
          form: {},
          items: [{
            para: 'isAutomatic',
            text: '获取方式',
            type: 'custom_enum',
            details: {
              parse: [{
                label: '自动获取',
                value: 'true'
              }, {
                label: '手工设置',
                value: 'false'
              }]
            }
          }, {
            para: 'isHighPrecision',
            text: '黄金类型',
            type: 'custom_enum',
            details: {
              parse: [{
                label: 'Au9999 高精度',
                value: 'true'
              }, {
                label: 'Au999',
                value: 'false'
              }]
            }
          }]
        },
        dialog: {
          title: '设置',
          status: false,
          loading: false,
          form: {
            isAutomatic: 'false'
          }
        },
      }
    },
    created() {
      this.getData()
    },
    methods: Object.assign(func(), {
      handleChange(){
        if(this.dialog.form.isHighPrecision === 'false') {
          this.dialog.form.isAutomatic = 'false'
        }
      },
      func_dialog(action, row) {
        switch (action.routeKey) {
          case 'set':
            this.dialog.status = true
            this.dialog.apiKey = action.apiKey
            break
          default:
            break;
        }
      },
      dialogClose() {
        this.dialog.form = {}
      },
      dialogSubmit() {
        this.$refs['form'].validate((valid) => {
          if (valid) {
            this.dialog.loading = true
            this.$request({
              url: this.dialog.apiKey,
              data: this.dialog.form
            }).then(data => {
              this.dialog.status = !data.result
              this.dialog.loading = false
              data.result ? this.$message.success('操作成功') : this.$message.error(data.msg || '未获取到失败信息')
              this.getData()
            }).catch(() => {
              this.dialog.loading = false
            })
          }
        })
      },
    })
  }

</script>
<style lang="scss" scoped>
</style>
