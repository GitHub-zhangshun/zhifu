export default {
  /** 商品入库列表页面 */
  enter: {
    tableColumns: [
      { title: '入库单编号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '总数量', prop: 'totalQty' }, { title: '总重量', prop: 'totalW', type: 'unit', details: { unit: '克' } },
      { title: '状态', prop: 'status', type: 'enum' }, { title: '申请时间', prop: 'applyTime', type: 'time' },
      { title: '入库时间', prop: 'realTime', type: 'time' }
    ]
  },
  /** sku序列号列表页面 */
  sku: {
    tableColumns: [
      { title: '序列号', prop: 'serialCode', overflow: true, copy: true, fixed: true },
      { title: '二维码', prop: 'qrUrl', type: 'img' }, { title: '状态', prop: 'status', type: 'enum' },
      { title: '生成时间', prop: 'createTime', type: 'time', overflow: true }, { title: '出库时间', prop: 'outStockTime', type: 'time', overflow: true }
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
  /** 商品出库列表页面 */
  outer: {
    tableColumns: [
      { title: '出库单编号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '购买单编号', prop: 'fromOrderCode', overflow: true, copy: true, fixed: true },
      { title: '总数量', prop: 'totalQty' }, { title: '总重量', prop: 'totalW', type: 'unit', details: { unit: '克' } },
      { title: '状态', prop: 'status', type: 'enum' }, { title: '创建时间', prop: 'createTime', type: 'time' },
      { title: '出库时间', prop: 'realTime', type: 'time' }
    ]
  }
}
