export default {
  /** 短信模板页面 */
  template: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: 'KEY', prop: 'smsKey' }, { title: '内容', prop: 'content', overflow: true },
      { title: '模板类型', prop: 'templateType', type: 'select', details: {'1': '验证类', '2': '通知类', '3': '营销类', '4': '综合类'} },
      { title: '短信类型', prop: 'isDelay', type: 'bool', details: { name: ['延时短信', '及时短信'] }},
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] }}
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' }, { label: 'KEY', prop: 'smsKey', plc: 'smsKey' },
      { label: '模板类型', prop: 'templateType', plc: '请选择', type: 'select', value: 1, details: [
        { name: '验证类', value: 1 }, { name: '通知类', value: '2' }, { name: '营销类', value: '3' }, { name: '综合类', value: '4' }
      ], noClearable: true },
      { label: '短信类型', prop: 'isDelay', plc: '请选择', type: 'select', value: 'false', details: [
        { name: '延时短信', value: 'true' }, { name: '及时短信', value: 'false' }
      ], noClearable: true },
      { label: '状态', prop: 'isUse', plc: '请选择', type: 'select', value: 'true', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '内容', prop: 'content', type: 'textarea', plc: '内容' }]
    }
  },
  /** 特殊号码列表(黑、白、灰名单)页面 */
  specialPhoneList: {
    tableColumns: [
      { title: '手机号', prop: 'phone' }, { title: '创建时间', prop: 'createTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '手机号', prop: 'phone', plc: '手机号' }]
    }
  },
  /** 授权记录列表页面 */
  authList: {
    tableColumns: [
      { title: '手机号', prop: 'phone' }, { title: '数量', prop: 'count' }, { title: '限制值', prop: 'limit' }, { title: '创建时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 发送记录列表页面 */
  sendList: {
    tableColumns: [
      { title: '手机号', prop: 'phone' }, { title: '标题', prop: 'title' }, { title: '内容', prop: 'content', overflow: true },
      { title: '短信类型', prop: 'isDelay', type: 'bool', details: { name: ['延时短信', '及时短信'] } }, { title: 'smsKey', prop: 'smsKey' },
      { title: '时间', prop: 'createTime', type: 'time' }, { title: '状态', prop: 'status', type: 'enum' },
      { title: '服务类型', prop: 'serviceType', type: 'select', details: { 1: '创蓝', 2: '腾讯', 3: '其他', 'null': '其他' } }
    ]
  }
}
