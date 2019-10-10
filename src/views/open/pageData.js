export default {
  /** 开发者页面 */
  developer: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '手机', prop: 'phone' },
      { title: '类型', prop: 'isEnterprise', type: 'bool', details: { name: ['企业', '个人'] } },
      { title: '状态', prop: 'isAuth', type: 'bool', details: { name: ['已认证', '未认证']}  }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '名称' }, { label: '手机号', prop: 'phone', plc: '手机号' },
      { label: '类型', prop: 'isEnterprise', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '企业', value: 'true' }, { name: '废人', value: 'false' }
      ] },
      { label: '状态', prop: 'isAuth', value: 'true', plc: '请选择', type: 'select', details: [
        { name: '已认证', value: 'true' }, { name: '未认证', value: 'false' }
      ] }
      ]
    }
  },
   /** 开发者-证书页面 */
   developerCertificater: {
    tableColumns: [
      { title: '安全凭证', prop: 'secretId', copy: true }
    ]
  },
  /** 开发者-应用页面 */
  developerApplication: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'AppId', prop: 'showAppId', copy: true },
      { title: '限制登录类型', prop: 'limitLogin', type: 'select', details: { '0': '不限制', '1': '同应用限制', '2': '整平台限制' } },
      { title: '备注', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '名称' },
      { label: '限制登录类型', prop: 'limitLogin', plc: '请选择', value: '0', type: 'select', details: [
        { name: '不限制', value: '0' }, { name: '同应用限制', value: '1' }, { name: '整平台限制', value: '2' }
      ] },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }
      ]
    }
  },
  /** 开发者-应用-版本页面 */
  developerApplicationVersion: {
    tableColumns: [
      { title: '名称', prop: 'title' }, { title: '版本号', prop: 'name' }, { title: '版本AppId', prop: 'showAppId', overflow: true, copy: true },
      { title: '是否强制更新', prop: 'isForceUp', type: 'bool', details: { name: ['是', '否'] } },
      { title: '是否当前', prop: 'isCurrent', type: 'bool', details: { name: ['是', '否'] } },
      { title: '下载链接', prop: 'downLink', overflow: true, copy: true }, { title: '备注', prop: 'remark' }
    ],
    dialogAdd: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '名称' }, { label: '版本号', prop: 'name', plc: '版本号' },
      { label: '是否强制更新', prop: 'isForceUp', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '是否当前', prop: 'isCurrent', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '下载链接', prop: 'downLink', plc: '下载链接' }, { label: '备注', prop: 'remark', plc: '备注' }
      ]
    },
    dialogForce: { form: {}, columns: [
      { label: '是否强制更新', prop: 'item', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] }
      ]
    },
    dialogLink: { form: {}, columns: [
      { label: '下载链接', prop: 'item', plc: '下载链接' }
      ]
    },
    dialogCurrent: { form: {}, columns: [
      { label: '是否当前', prop: 'item', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] }
      ]
    },
    dialogNoteAdd: { form: {}, columns: [
      { label: '是否当前', prop: 'item', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] }
      ]
    }
  },
  /** 开发者-应用-接口页面 */
  developerApplicationInterfaces: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'apiKey', prop: 'apiKey', copy: true }, { title: '描述', prop: 'remark' },
      { title: '验证方式', prop: 'verifyType', type: 'select', details: { '1': '不进行验证', '2': '仅验证请求证书', '3': '前端token验证', '4': '后端token验证'}},
      { title: '链接', prop: 'link', overflow: true, copy: true }
    ]
  },
}
