export default {
  /** 平台金价设置页面 */
  platPrizeSet: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '获取方式', prop: 'isAutomatic', type: 'bool', details: { name: ['自动获取', '手动设置'] } },
      { title: '设置金价/比例', type: 'group-para-unit', details: [ { para: 'goldPrice', unit: '元/克' }, { para: 'rate', unit: '%' } ] },
      { title: '备注', prop: 'remark' }, { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 平台金价\阈值设置页面 */
  platSubthresholdSet: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '比例', prop: 'rate', type: 'unit', details: { unit: '%' } }, { title: '备注', prop: 'remark' },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 平台回收金价设置页面 */
  platRecycleSet: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '黄金类型', prop: 'precisionTxt' },
      { title: '获取方式', prop: 'isAutomatic', type: 'bool', details: { name: ['自动获取', '手动设置'] } },
      { title: '设置金价/比例', type: 'group-para-unit', details: [ { para: 'goldPrice', unit: '元/克' }, { para: 'rate', unit: '%' } ] },
      { title: '备注', prop: 'remark' },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 平台对手金价设置页面 */
  platOpponentSet: {
    tableColumns: [
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '平台名称', prop: 'name' }, { title: '设置金价', prop: 'price', type: 'unit', details: { unit: '元' } },
      { title: '备注', prop: 'remark' },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time' }
    ]
  }
}
