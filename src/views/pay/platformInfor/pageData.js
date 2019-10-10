export default {
  /** 支付业务 */
  list: {
    tableColumns: [
      { title: '名称', prop: 'name', overflow: true, fixed: true },
      { title: '简写码', prop: 'code', overflow: true, fixed: true },
      { title: '备注', prop: 'remark', overflow: true, fixed: true },      
      { title: '排序', prop: 'sort'},      
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, 
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name' ,plc: '请输入名称' },
      { label:'简写码',prop: 'code' ,plc: '请输入简写码' },
      { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort' }
     ]
    }
  },
}
