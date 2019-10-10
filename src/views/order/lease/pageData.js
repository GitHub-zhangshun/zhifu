export default {
  /** 所有租赁订单列表页面 */
  list: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'phone', copy: true }, { title: '联系人', prop: 'contactName' },
      { title: '联系电话', prop: 'contactPhone' }, { title: '黄金类型', prop: 'goldType' },
      { title: '黄金重量', prop: 'weight' }, { title: '租赁期限', prop: 'leaseTerm' },
      { title: '订单状态', prop: 'status', type: 'enum' }
    ]
  },
  /** 租赁中订单列表页面 */
  underway: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'phone', copy: true }, { title: '联系人', prop: 'contactName' },
      { title: '联系电话', prop: 'contactPhone' }, { title: '黄金类型', prop: 'goldType' },
      { title: '黄金重量', prop: 'weight' }, { title: '租赁期限', prop: 'leaseTerm' }
    ]
  },
  /** 租赁完成订单列表页面 */
  completed: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'phone', copy: true }, { title: '联系人', prop: 'contactName' },
      { title: '联系电话', prop: 'contactPhone' }, { title: '黄金类型', prop: 'goldType' },
      { title: '黄金重量', prop: 'weight' }, { title: '租赁期限', prop: 'leaseTerm' },
      { title: '时间归还日期', prop: 'returnTime', type: 'time', overflow: true }
    ]
  }
}
