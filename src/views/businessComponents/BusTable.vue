<template>
  <el-table ref="table" @row-dblclick="pitchRow" v-loading="value.loading" :data="value.list" border :row-key="rowKey"
    :default-sort="{prop: 'sort', order: 'descending'}" @selection-change="handleSelectionChange">
    <el-table-column v-if="checkbox" type="selection" width="55" />
    <el-table-column v-for="(item, index) in value.columns" :key="index" :label="item.title"
      :sortable="item.prop === 'sort'" :prop="item.prop" :show-overflow-tooltip="item.overflow" :fixed="item.fixed">
      <template slot-scope="scope">
        <div class="custom-column">
          <!-- bool 类型 -->
          <span
            v-if="item.type === 'bool'">{{ scope.row[item.prop] ? item.details.name[0] : item.details.name[1] }}</span>
          <!-- select 类型 -->
          <span v-else-if="item.type === 'select'">{{ item.details[scope.row[item.prop]] }}</span>
          <!-- time 类型 -->
          <span
            v-else-if="item.type === 'time'">{{ scope.row[item.prop] && getTime(scope.row[item.prop]) || '' }}</span>
          <!-- 带单位 类型 -->
          <span
            v-else-if="item.type === 'unit'">{{ scope.row[item.prop] && `${scope.row[item.prop]}${item.details.unit}` }}</span>
          <!-- 枚举 类型 -->
          <span
            v-else-if="item.type === 'enum'">{{ scope.row[item.prop] && getEnumById(scope.row[item.prop]) && getEnumById(scope.row[item.prop]).title || '' }}</span>
          <!-- 数组枚举 类型 -->
          <span
            v-else-if="item.type === 'enum-array'">{{ scope.row[item.prop] && scope.row[item.prop].length > 0 && getEnumArrayToString(scope.row[item.prop]) || '' }}</span>
          <!-- 本身参数组合 类型 -->
          <span v-else-if="item.type === 'group-para'">
            <span v-for="(para, itemIndex) in item.details" :key="itemIndex">
              {{ scope.row[para] || para }}
            </span>
          </span>
          <!-- 本身参数组合带单位 类型 -->
          <span v-else-if="item.type === 'group-para-unit'">
            <span v-for="(innerItem, innerIndex) in item.details" :key="innerIndex">
              <span v-if="scope.row[innerItem.para]">
                {{ scope.row[innerItem.para] && `${scope.row[innerItem.para]} ${innerItem.unit}` }}
              </span>
            </span>
          </span>
          <!-- 可修改 类型 -->
          <template v-else-if="item.type === 'edit'">
            <template v-if="scope.row.edit">
              <el-input v-model="scope.row[item.prop]" class="edit-input" size="small" />
            </template>
            <span v-else>{{ scope.row[item.prop] }}</span>
            <el-button :icon="scope.row.edit ? 'el-icon-check' : 'el-icon-edit'" circle style="margin-left: 16px"
              @click="editColumn(scope.row)" />
          </template>
          <!-- button 类型 -->
          <el-button v-else-if="item.type === 'button'" :type="scope.row[item.prop]">
            {{ scope.row[item.prop] || 'default' }}
          </el-button>
          <!-- 规格列表参数参数 -->
          <el-tag v-for="tag in scope.row[item.prop]" v-else-if="item.type === 'spec-tag-list'" :key="tag.id">
            {{ tag.name }}
          </el-tag>
          <!-- 图片类型 -->
          <img v-else-if="item.type === 'img'" :src="scope.row[item.prop]" width="100" height="50" alt="">
          <!-- 文本类型 -->
          <span v-else>{{ scope.row[item.prop] }}</span>
          <div class="hover" v-if="item.copy">
            <el-button icon="el-icon-edit-outline" circle type="text" size="mini"
              @click="handleCopy(scope.row[item.prop],$event)">copy</el-button>
          </div>
        </div>
      </template>
    </el-table-column>
    <el-table-column v-if="rightActions && rightActions.length > 0 && showAction" label="操作" :width="actionColumnWidth" fixed="right">
      <template slot-scope="scope">
        <!-- <el-button-group> -->
        <el-button v-for="action in rightActions" :key="action.Id" type="text"
          @click="$emit('rightAction', {action, row: scope.row})">{{ action.name }}
        </el-button>
        <!-- </el-button-group> -->
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import clip from '@/utils/clipboard'
  import func from '@/common/func.js'
  import {
    constants
  } from 'crypto';
  export default {
    name: 'BusTable',
    props: {
      value: {
        type: Object,
        required: true,
        default: () => {}
      },
      checkbox: {
        type: Boolean,
        default: true
      },
      actionColumnWidth: {
        type: String,
        default: ''
      },
      rowKey: {
        type: String,
        default: () => 'id'
      },
      showAction: {
        type: Boolean,
        default: () => true
      }
    },
    data() {
      return {
        edit: false,
        copyCount: 0,
        currentValue: ''
      }
    },
    computed: {
      rightActions() {
        return this.$route.meta.actions && this.$route.meta.actions.rightActions || []
      }
    },
    methods: Object.assign(func(), {
      /** 列表组件 行选中事件  */
      handleSelectionChange(val) {
        this.value.tableChangeList = val
      },
      editColumn(row) {
        this.$emit('updateView')
        if (row.edit) {
          this.$emit('updateViewData', row)
        }
        row.edit = !row.edit
      },
      handleCopy(text, event) {
        if (this.copyCount > 0 && this.currentValue === text) {
          this.$message.error('胸dei, 别点了 已经copy了！！！')
          // 3秒后复原
          setTimeout(() => {
            this.copyCount = 0
          }, 1000 * 30)
        } else {
          clip(text, event)
          this.currentValue = text
          this.copyCount++
        }
      },
    })
  }

</script>
<style lang="scss" scoped>
  .custom-column {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    // border: 1px solid;
    position: relative;

    &:hover .hover {
      display: block;
    }

    .hover {
      position: absolute;
      right: 0;
      top: -3px;
      display: none;
      background: rgba(191, 238, 185, 0.9);
    }
  }

</style>
