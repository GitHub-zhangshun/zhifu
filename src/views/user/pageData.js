export default {
  /** 用户列表页面 */
  list: {
    tableColumns: [
      { title: '昵称', prop: 'nick' }, { title: '姓名', prop: 'name' }, { title: '手机', prop: 'phone', copy: true },
      { title: '注册时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '认证状态', prop: 'isRealName', type: 'bool', details: { name: ['已认证', '未认证'] } },
      { title: '账户余额', prop: 'money' }, { title: '待返优惠金额', prop: 'interestMoney' }
    ],
    dialogPhoneTableColumns: [
      { title: '手机号', prop: 'phone' }, { title: '更换时间', prop: 'createTime', type: 'time' }
    ],
    dialogBankTableColumns: [
      { title: '银行名称', prop: 'bankName' }, { title: '银行卡号', prop: 'cardNumber' },
      { title: '预留手机号', prop: 'phone' }, { title: '更换时间', prop: 'createTime', type: 'time' }
    ]
  },
  /** 用户列表-消息列表页面 */
  listMessage: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '内容', prop: 'remark', copy: true, overflow: true },
      { title: '状态', prop: 'isRead', type: 'bool', details: { name: ['已读', '未读'] } },
      { title: '时间', prop: 'createTime', type: 'time' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '名称' },
      { label: '内容', prop: 'remark', type: 'textarea', plc: '内容' }]
    }
  },
  /** 申请注销列表页面 */
  apply: {
    tableColumns: [
      { title: '昵称', prop: 'nick' }, { title: '姓名', prop: 'name' }, { title: '手机', prop: 'phone', copy: true },
      { title: '认证状态', prop: 'isRealName', type: 'bool', details: { name: ['已认证', '未认证'] } },
      { title: '申请时间', prop: 'createTime', type: 'time', overflow: true }
    ],
    dialog: { form: {}, columns: [
      { label: '处理结果', prop: 'isAdopt', plc: '请选择', type: 'select', value: 'true', details: [
        { name: '同意注销', value: 'true' }, { name: '撤回注销', value: 'false' }
      ] },
      { label: '意见', prop: 'remark', type: 'textarea', plc: '内容' }]
    }
  },
  /** 历史注销列表页面 */
  history: {
    tableColumns: [
      { title: '昵称', prop: 'nick' }, { title: '姓名', prop: 'name	' }, { title: '手机', prop: 'phone', copy: true },
      { title: '认证状态', prop: 'isRealName', type: 'bool', details: { name: ['已认证', '未认证'] } },
      { title: '申请时间', prop: 'createTime', type: 'time', overflow: true },
      { title: '处理时间', prop: 'auditTime', type: 'time', overflow: true }, { title: '处理人', prop: 'auditorName' },
      { title: '处理结果', prop: 'isAdopt', type: 'bool', details: { name: ['同意注销', '撤回注销'] } }, { title: '备注', prop: 'auditRemark' }
    ]
  }
}
