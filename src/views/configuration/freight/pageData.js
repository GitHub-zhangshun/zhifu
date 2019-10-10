export default {
  /** 运费模板页面 */
  template: {
    tableColumns: [
      { title: '名称', prop: 'title' },
      { title: '计价方式', prop: 'valuationMode', type: 'select', details: { 1: '按重量计价', 2: '按件计价' }},
      { title: '首重', prop: 'firstWeight', type: 'unit', details: { unit: '元/KG' } },
      { title: '续重', prop: 'continuedWeight', type: 'unit', details: { unit: '元/KG' } },
      { title: '保价服务起步价', prop: 'startingPrice', type: 'unit', details: { unit: '元' } },
      { title: '保价费率', prop: 'rate', type: 'unit', details: { unit: '%' } },
      { title: '状态', prop: 'isEnable', type: 'bool', details: { name: ['启用', '禁用'] } },
      { title: '操作人', prop: 'createName' }, { title: '操作时间', prop: 'createTime', type: 'time', overflow: true }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '名称' },
      { label: '计价方式', prop: 'valuationMode', plc: '计价方式', type: 'select', value: '1', noClearable: true, details: [
        { name: '按重量计价', value: '1' }, { name: '按件计价', value: '2' }]
      },
      { label: '首重', prop: 'firstWeight', plc: '首重', unit: '元/KG' },
      { label: '续重', prop: 'continuedWeight', plc: '续重', unit: '元/KG' },
      { label: '保价服务起步价', prop: 'startingPrice', plc: '保价服务起步价', unit: '元' },
      { label: '保价服务费率', prop: 'rate', plc: '保价服务费率', unit: '%' }]
    }
  }
}
