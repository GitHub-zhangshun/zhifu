export default {
  /** 异常流程页面 */
  flow: {
    tableColumns: [
      { title: '名称', prop: 'name', fixed: true }, { title: '状态', prop: 'isExec', type: 'bool', details: { name: ['执行中', '已执行'] } },
      { title: '预计执行次数', prop: 'count' }, { title: '数据key', prop: 'dataKey' },
      { title: '执行链接', prop: 'link', overflow: true, copy: true },
      { title: '链接类型', prop: 'linkType', type: 'select', details: { 1: '内部KEY', 2: '外链' } }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'operator', plc: '名称' }, { label: '数据请求地址', prop: 'dataUrl', plc: '数据请求地址', type: 'textarea' },
      { label: '数据处理地址', prop: 'dataHandleUrl', plc: '数据处理地址', type: 'textarea' },
      { label: '状态', prop: 'isOpen', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' } ]
    }
  }
}
