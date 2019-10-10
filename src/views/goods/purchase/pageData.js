export default {
  /** 采购列表页面 */
  list: {
    tableColumns: [
      { title: '采购单编号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '创建人', prop: 'opName' },
      { title: '采购合同编号', prop: 'purchaseContract', overflow: true, copy: true, fixed: true },
      { title: '采购人', prop: 'purchaseMan' }, { title: '总数量', prop: 'totalQty' },
      { title: '总重量', prop: 'totalW', type: 'unit', details: { unit: '克' } },
      { title: '总价格', prop: 'totalMoney', type: 'unit', details: { unit: '元' } },
      { title: '状态', prop: 'status', type: 'enum' }
    ]
  },
  /** 审核列表页面 */
  audit: {
    tableColumns: [
      { title: '采购单编号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '创建人', prop: 'opName' },
      { title: '采购合同编号', prop: 'purchaseContract', overflow: true, copy: true, fixed: true },
      { title: '采购人', prop: 'purchaseMan' }, { title: '总数量', prop: 'totalQty' },
      { title: '总重量', prop: 'totalW', type: 'unit', details: { unit: '克' } },
      { title: '总价格', prop: 'totalMoney', type: 'unit', details: { unit: '元' } },
      { title: '状态', prop: 'status', type: 'enum' }
    ],
    // 审核弹窗
    dialog: { form: {}, columns: [
      { label: '审核', prop: 'isPass', plc: '请选择', type: 'select', noClearable: true, details: [
        { name: '同意', value: 'true' }, { name: '拒绝', value: 'false' }]
      },
      { label: '意见', prop: 'remark', plc: '请输入意见', type: 'textarea' }
     ]
    }
  },
  /** 采购记录列表页面 */
  log: {
    tableColumns: [
      { title: '采购单编号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '采购合同编号', prop: 'purchaseContract', overflow: true, copy: true, fixed: true },
      { title: '采购人', prop: 'purchaseMan' }, { title: '总数量', prop: 'totalQty' },
      { title: '总重量', prop: 'totalW', type: 'unit', details: { unit: '克' } },
      { title: '总价格', prop: 'totalMoney', type: 'unit', details: { unit: '元' } },
      { title: '状态', prop: 'status', type: 'enum' }, { title: '对应入库单数量', prop: 'inStockOrderCount' }
    ],
    // 审核弹窗
    dialog: { form: {}, columns: [
      { label: '审核', prop: 'isPass', plc: '请选择', type: 'select', noClearable: true, details: [
        { name: '同意', value: 'true' }, { name: '拒绝', value: 'false' }]
      },
      { label: '意见', prop: 'remark', plc: '请输入意见', type: 'textarea' }
     ]
    }
  }
}
