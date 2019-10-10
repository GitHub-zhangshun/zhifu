export default {
  /** 商城交易限制页面 */
  storeLimit: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '用户单笔购买限制', prop: 'singleTime', type: 'unit', details: { unit: '克' } },
      { title: '用户单日购买限制', prop: 'singleDay', type: 'unit', details: { unit: '克' } },
      { title: '平台单日购买限制', prop: 'platformDay', type: 'unit', details: { unit: '克' } },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 投资金交易限制页面 */
  investLimit: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '起购金额', prop: 'minimumMoney', type: 'unit', details: { unit: '元' } },
      { title: '用户单日限购金额', prop: 'userDayMoney', type: 'unit', details: { unit: '元' } },
      { title: '平台单日限购金额', prop: 'platformDayMoney', type: 'unit', details: { unit: '元' } },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 交易开关页面 */
  transaction: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '交易状态', prop: 'isOpen', type: 'bool', details: { name: ['已开启', '已关闭'] } },
      { title: '备注', prop: 'remark' }, { title: '操作人', prop: 'createName' },
      { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 出租利率页面 */
  rental: {
    tableColumns: [
      { title: '出租期限', prop: 'dayNumber', type: 'unit', details: { unit: '天' } },
      { title: '年化利率', prop: 'rate', type: 'unit', details: { unit: '%' } },
      { title: '状态', prop: 'isEnable', type: 'bool', details: { name: ['启用', '禁用'] } },
      { title: '排序', prop: 'sort' }, { title: '操作人', prop: 'updateId' },
      { title: '更新时间', prop: 'updateTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '出租期限', prop: 'dayNumber', plc: '出租期限', unit: '天' },
      { label: '年化利率', prop: 'rate', plc: '年化利率', unit: '%' },
      { label: '状态', prop: 'isEnable', plc: '状态', type: 'select', value: 'true', noClearable: true, details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }]
      },
      { label: '排序', prop: 'sort', plc: '排序' }]
    }
  }
}
