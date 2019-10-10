export default {
  /** 黄金订单页面 */
  list: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '购买人手机', prop: 'phone', copy: true }, { title: '黄金克重', prop: 'weight', type: 'unit', details: { unit: '克' } },
      { title: '订单金额', prop: 'money' }, { title: '订单来源', prop: 'sourceType', type: 'enum' },
      { title: '订单状态', prop: 'status', type: 'enum' }, { title: '操作状态', prop: 'operStatus', type: 'enum' },
    ]
  },
  /** 黄金出租订单页面 */
  leased: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '购买人手机', prop: 'phone', copy: true }, { title: '黄金克重', prop: 'totalWeight', type: 'unit', details: { unit: '克' } },
      { title: '期限', prop: 'termDay', type: 'unit', details: { unit: '天' } },
      { title: '年化率', prop: 'profitRate', type: 'unit', details: { unit: '%' } },
      { title: '收益', prop: 'profitMoney', type: 'unit', details: { unit: '元' } },
      { title: '到期日', prop: 'endTime', type: 'time', overflow: true },
      { title: '订单状态', prop: 'status', type: 'enum' },
      { title: '是否提货', prop: 'extractStatus', type: 'select', details: { '0': '未选择', '1': '是', '2': '否' }},
    ]
  },
  /** 黄金提货订单-快递页面 */
  delivery: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '购买人手机', prop: 'phone', copy: true }, { title: '黄金克重', prop: 'orderWeight', type: 'unit', details: { unit: '克' } },
      { title: '收货人', prop: 'userName' }, { title: '收货人手机', prop: 'userPhone' }, { title: '收货地址', prop: 'address', overflow: true, copy: true },
      { title: '订单状态', prop: 'status', type: 'enum' },
    ]
  },
  /** 黄金提货订单-自提页面 */
  pick: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '购买人手机', prop: 'phone', copy: true }, { title: '黄金克重', prop: 'orderWeight', type: 'unit', details: { unit: '克' } },
      { title: '门店', prop: 'storeName', overflow: true, copy: true },
      { title: '预约自提时间', prop: 'extractTime', type: 'time', overflow: true },
      { title: '订单状态', prop: 'status', type: 'enum' },
    ]
  },
}
