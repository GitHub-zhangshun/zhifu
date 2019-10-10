export default {
  /**主体类型列表页面 */
  mainType: {
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '名称' },{ label: 'key', prop: 'key', plc: 'key', },
      { label: '主体KEY状态', prop: 'isUseKey', plc: '请选择', type: 'select', value: 'true', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /**主体类型-扩展KEY管理页面 */
  mainTypeKey: {
    tableColumns: [
      { title: '名称', prop: 'name', fixed: true },
      { title: 'keyName', prop: 'keyName', overflow: true, copy: true }
    ],
    // 核销 弹窗
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '名称' }, { label: 'keyName', prop: 'keyName', plc: 'keyName' },
      { label: '排序', prop: 'sort', plc: '排序' }
     ]
    }
  },
}
