export default {
  /** 合同模板页面 */
  template: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: 'KEY', prop: 'key' }, { title: '文件链接', prop: 'fileLink', overflow: true, copy: true }, { title: '备注', prop: 'remark', overflow: true },
      { title: '总页数', prop: 'totalPage' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' }, { label: 'KEY', prop: 'key' },
      { label: '文件链接', prop: 'fileLink', type: 'single-file' },
      { label: '总页数', prop: 'totalPage', plc: '请输入总页数' }, { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort', plc: '内容' }]
    }
  },
  /** 合同模板-KEY管理页面 */
  templateKey: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: 'keyVal', prop: 'keyVal' }, { title: '替换关键字', prop: 'name' },
      { title: 'keyType', prop: 'keyType', type: 'select', details: { '1': '填充', '2': '签名' }},
      { title: '备注', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' }, { label: 'keyVal', prop: 'keyVal', plc: 'keyVal' },
      { label: '替换关键字', prop: 'name', plc: '替换关键字' },
      { label: 'keyType', prop: 'keyType', value: '1', plc: '请选择', type: 'select', details: [
        { name: '填充', value: '1' }, { name: '签名', value: '2' }]
      },
       { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort', plc: '内容' }]
    }
  },
  /** 合同模板-默认签署人管理页面 */
  templateSignUser: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: 'accountKey', prop: 'accountKey' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' }, { label: 'accountKey', prop: 'accountKey', plc: 'accountKey' }]
    }
  },
  /** 账号列表页面 */
  account: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '证件号', prop: 'identNo' }, { title: '手机', prop: 'phone' },
      { title: '用户类型', prop: 'accountType', type: 'select', details: { '0': '企业', '1': '个人' }},
      { title: '签名关键字', prop: 'signKeyword' }, { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] }},
    ]
  },
  /** 合同列表页面 */
  generate: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: '源文件', prop: 'sourceFileLink', overflow: true, copy: true }, { title: '状态', prop: 'status', type: 'enum' }
    ]
  },
}
