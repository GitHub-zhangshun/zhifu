export default {
  /** 所有回收订单列表页面 */
  list: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'phone', copy: true }, { title: '联系人', prop: 'contactName' },
      { title: '联系电话', prop: 'contactPhone' }, { title: '黄金类型', prop: 'goldType' },
      { title: '黄金重量', prop: 'weight' }, { title: '订单状态', prop: 'status', type: 'select', details: { 0: '待处理', 1: '已回收', 2: '未回收' } }
    ]
  }
}
