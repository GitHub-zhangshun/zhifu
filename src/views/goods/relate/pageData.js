export default {
  /** 分类管理页面 */
  type: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark', overflow: true },
      { title: '是否展示', prop: 'isUse', type: 'bool', details: { name: ['是', '否'] } }, { title: '排序', prop: 'sort', type: 'edit' }, { title: '商品数量', prop: 'productCount' },
      { title: '更新人', prop: 'opName' }, { title: '更新时间', prop: 'updateTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },
      { label: '是否展示', prop: 'isUse', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 规格分类页面 */
  specType: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark', overflow: true }, { title: '属性数量', prop: 'specCount' },
      { title: '商品数量', prop: 'productCount' },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } },
      { title: '更新人', prop: 'opName' }, { title: '更新时间', prop: 'updateTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },
      { label: '状态', prop: 'isUse', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' } ]
    }
  },
  /** 规格分类-规格列表页面 */
  specTypeList: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark', overflow: true }, { title: '参数列表', prop: 'attributeDtos', type: 'spec-tag-list', overflow: true, copy: true },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } },
      { title: '更新人', prop: 'opName' }, { title: '更新时间', prop: 'updateTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },
      { label: '参数', prop: 'attributeDtos', type: 'spec-tag-list' },
      { label: '状态', prop: 'isUse', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 标签管理页面 */
  tag: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark', overflow: true },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } }, { title: '排序', prop: 'sort', type: 'edit' }, { title: '商品数量', prop: 'productCount' },
      { title: '更新人', prop: 'opName' }, { title: '更新时间', prop: 'updateTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },
      { label: '是否展示', prop: 'isUse', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
}
