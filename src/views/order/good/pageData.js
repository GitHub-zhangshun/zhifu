export default {
  /** 预约购买订单页面 */
  appointment: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '送货方式', prop: 'isDelivery', type: 'bool', details: { name: ['送货上门', '门店自提'] } },
      { title: '预约期限', prop: 'term', type: 'unit', details: { unit: '天' } },
      { title: '年利率', prop: 'dayRate', type: 'unit', details: { unit: '%' } },
      { title: '订单金额', prop: 'money' }, { title: '优惠金', prop: 'interestMoney' },
      { title: '订单来源', prop: 'sourceType', type: 'enum' }, { title: '订单状态', prop: 'orderStatus', type: 'enum' },
    ]
  },
  /** 立即购买订单页面 */
  immediately: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '送货方式', prop: 'isDelivery', type: 'bool', details: { name: ['送货上门', '门店自提'] } },
      { title: '订单金额', prop: 'money' },
      { title: '订单来源', prop: 'sourceType', type: 'enum' }, { title: '订单状态', prop: 'orderStatus', type: 'enum' },
    ]
  },
  /**待发货订单页面 */
  waitDispatched: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '订单类型', prop: 'isBespoke', type: 'bool', details: { name: ['预约购买', '立即购买'] } },
      { title: '收货人', prop: 'userName' }, { title: '手机号码', prop: 'phone' }, { title: '收货地址', prop: 'address', overflow: true, copy: true }
    ]
  },
  /**待自提订单页面 */
  waitPick: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, { title: '用户姓名', prop: 'name' },
      { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '订单类型', prop: 'isBespoke', type: 'bool', details: { name: ['预约购买', '立即购买'] } },
      { title: '订单金额', prop: 'money' }, { title: '门店名称', prop: 'storeName' }, { title: '门店地址', prop: 'storeAddress' },
      { title: '自提时间', prop: 'extractTime', type: 'time' }
    ],
    // 核销 弹窗
    dialog_destruction: { form: {}, columns: [
      { label: '自提码', prop: 'code', plc: '请输入用户提供的正确的自提码' }
     ]
    },
  },
  /**预约中订单页面 */
  subscribeing: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '用户姓名', prop: 'name' }, { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '预约期限', prop: 'term', type: 'util', details: { util: '天' } },
      { title: '年利率', prop: 'term', type: 'util', details: { util: '%' } },
      { title: '订单金额', prop: 'totalMoney', type: 'util', details: { util: '元' } },
      { title: '优惠金', prop: 'interestMoney', type: 'util', details: { util: '元' } },
      { title: '生效时间', prop: 'startTime', type: 'time', overflow: true }, { title: '到期日', prop: 'endTime', type: 'time', overflow: true },
      { title: '是否提货', prop: 'extractStatus', type: 'select', details: { '0': '未选择', '1': '是', '2': '否' } }
    ]
  },
  /**预约完成订单页面 */
  subscribeed: {
    tableColumns: [
      { title: '订单编号', prop: 'number', overflow: true, copy: true, fixed: true },
      { title: '用户姓名', prop: 'name' }, { title: '手机号码', prop: 'userPhone', copy: true },
      { title: '预约期限', prop: 'term', type: 'util', details: { util: '天' } },
      { title: '年利率', prop: 'term', type: 'util', details: { util: '%' } },
      { title: '订单金额', prop: 'totalMoney', type: 'util', details: { util: '元' } },
      { title: '优惠金', prop: 'interestMoney', type: 'util', details: { util: '元' } },
      { title: '生效时间', prop: 'startTime', type: 'time', overflow: true }, { title: '到期日', prop: 'endTime', type: 'time', overflow: true },
      { title: '是否提货', prop: 'extractStatus', type: 'select', details: { '0': '未选择', '1': '是', '2': '否' } }
    ]
  },
}
