export default {
  /**门店列表页面 */
  list: {
    tableColumns: [
      { title: '名称', prop: 'name', overflow: true, copy: true, fixed: true },
      { title: '联系电话', prop: 'phone', overflow: true, copy: true, fixed: true },
      { title: '省', prop: 'province' }, { title: '市', prop: 'city' },
      { title: '地址', prop: 'address', overflow: true, copy: true },
      { title: '营业时间', prop: 'businessHours', overflow: true },
      { title: '经纬度', prop: 'coordinate', overflow: true, copy: true },
      { title: '备注', prop: 'remark' }
    ],
    // 核销 弹窗
    dialog: { form: {}, columns: [
      { label: '自提码', prop: 'recommend', plc: '请输入用户提供的正确的自提码' }
     ]
    }
  },
  /** 地区页面 */
  region: {
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '名称' },{ label: 'key', prop: 'key', plc: 'key', },
      { label: '坐标', prop: 'coordinate', plc: '坐标' }, { label: '后缀', prop: 'suffix', plc: '猴嘴' },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  }
}
