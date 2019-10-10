export default {
  /** 业务分组页面 */
  businessGroup: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: '备注', prop: 'remark', plc: '备注' },
      { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 业务分组-接口页面 */
  businessGroupInterfaces: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'apiKey', prop: 'apiKey', copy: true }, { title: '描述', prop: 'remark' },
      { title: '验证方式', prop: 'verifyType', type: 'select', details: { '1': '不进行验证', '2': '仅验证请求证书', '3': '前端token验证', '4': '后端token验证'}},
      { title: '链接', prop: 'link', overflow: true, copy: true }
    ]
  },
  /** 注册服务页面 */
  sign: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' }, { title: '链接', prop: 'link', overflow: true, copy: true },
      { title: '端口', prop: 'port' }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'key', prop: 'key', plc: 'key', },
      { label: '链接', prop: 'link', plc: '链接' }, { label: '端口', prop: 'port', plc: '端口' },
      { label: '备注', prop: 'remark', plc: '备注' }]
    }
  },
  /** API服务页面 */
  api: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' }, { title: '链接', prop: 'host', overflow: true, copy: true },
      { title: '帮助文档', prop: 'helperLink', overflow: true, copy: true }, { title: '监测地址', prop: 'monitorLink', overflow: true, copy: true },
      { title: '注册标识', prop: 'signId', overflow: true, copy: true },
      { title: '端口', prop: 'port' }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'key', prop: 'key', plc: 'key', },
      { label: '链接', prop: 'host', plc: '链接' }, { label: '帮助文档', prop: 'helperLink', plc: '帮助文档' }, { label: '监测地址', prop: 'monitorLink', plc: '监测地址' },
      { label: '端口', prop: 'port', plc: '端口' }, { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** API-接口页面 */
  apiInterfaces: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'apiKey', prop: 'apiKey', copy: true },
      { title: 'groupKey', prop: 'groupKey', overflow: true, copy: true }, { title: '验证方式', prop: 'verifyType', type: 'select', details: { '1': '不进行验证', '2': '仅验证请求证书', '3': '前端token验证', '4': '后端token验证'}},
      { title: '链接', prop: 'link', overflow: true, copy: true }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'apiKey', prop: 'apiKey', plc: 'apiKey', },
      { label: 'groupKey', prop: 'groupKey', plc: 'groupKey' },
      { label: '验证方式', prop: 'verifyType', value: '1', plc: '请选择', type: 'select', details: [
        { name: '不进行验证', value: '1' }, { name: '仅验证请求证书', value: '2' }, { name: '前端token验证', value: '3' }, { name: '后端token验证', value: '4' }]
      },
      { label: '链接', prop: 'link', plc: '链接' }, { label: '请求参数', prop: 'para', type: 'textarea', plc: '请求参数' }, { label: '返回参数', prop: 'result', type: 'textarea', plc: '返回参数' },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 网关信息页面 */
  info: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' },
      { title: '链接', prop: 'link', overflow: true, copy: true }, { title: '服务注册标识', prop: 'signId', overflow: true, copy: true },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'key', prop: 'key', plc: 'key', },
      { label: '服务注册标识', prop: 'signId', plc: '请选择', type: 'select-sign-service' },
      { label: '是否启用', prop: 'isUse', value: 'true', plc: '请选择', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }]
      },
      { label: '负载配置', prop: 'loadBalancerConfig', type: 'textarea', plc: '负载配置' },
      { label: '熔断配置', prop: 'qoSConfig', type: 'textarea', plc: '熔断配置' },
      { label: '限速配置', prop: 'rateLimitConfig', type: 'textarea', plc: '限速配置' },
      { label: '下游请求协议', prop: 'downScheme', plc: '下游请求协议' },
      { label: '请求标识', prop: 'requestId', plc: '请求标识' },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 网关信息-路由信息页面 */
  infoRoute: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '上游路径', type: 'group-para', details: ['upPath', 'pathPlaceholder'] },
      { title: '下游路径', type: 'group-para', details: ['downPath', 'pathPlaceholder'] }, { title: 'key', prop: 'key' },
      { title: '下游请求协议', prop: 'downScheme' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'key', prop: 'key', plc: 'key' },
      { label: 'API服务', prop: 'serviceId', plc: '请选择', type: 'select-api-service' },
      { label: '是否使用服务发现', prop: 'isSignFind', value: 'false', plc: '请选择', type: 'select', details: [
        { name: '使用', value: 'true' }, { name: '禁用', value: 'false' }]
      },
      { label: '是否启用', prop: 'isUse', value: 'true', plc: '请选择', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }]
      },
      { label: '上游匹配路径', prop: 'upPath', plc: '上游匹配路径' },
      { label: '上游请求配置', prop: 'upMethodConfig', type: 'textarea', plc: '上游请求配置' },
      { label: '下游匹配路径', prop: 'downPath', plc: '上游匹配路径' },
      { label: '下游请求协议', prop: 'downScheme', plc: '下游请求协议' },
      { label: '地址占位符', prop: 'pathPlaceholder', plc: '地址占位符' },
      { label: '下游请求协议', prop: 'downScheme', plc: '下游请求协议' },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 网关信息-聚合信息页面 */
  infoAggregate: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'apiKey', prop: 'apiKey', copy: true }, { title: '上游匹配地址', prop: 'upPath' },
      { title: '验证方式', prop: 'verifyType', type: 'select', details: { '1': '不进行验证', '2': '仅验证请求证书', '3': '前端token验证', '4': '后端token验证'}}
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: 'apiKey', prop: 'apiKey', plc: 'apiKey' },
      { label: 'keyStrs', prop: 'keyStrs', plc: 'keyStrs', type: 'textarea' },
      { label: '上游匹配地址', prop: 'upPath', plc: '上游匹配地址' },
      { label: '请求参数', prop: 'para', plc: '请求参数', type: 'textarea' },
      { label: '返回参数', prop: 'result', plc: '返回参数', type: 'textarea' },
      { label: '验证方式', prop: 'verifyType', value: '1', plc: '请选择', type: 'select', details: [
        { name: '不进行验证', value: '1' }, { name: '仅验证请求证书', value: '2' }, { name: '前端token验证', value: '3' }, { name: '后端token验证', value: '4' }]
      },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 网关信息-接口信息页面 */
  infoInterfaces: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'apiKey', prop: 'apiKey', copy: true }, { title: '链接', prop: 'link', copy: true },
      { title: '验证方式', prop: 'verifyType', type: 'select', details: { '1': '不进行验证', '2': '仅验证请求证书', '3': '前端token验证', '4': '后端token验证'}},
    ]
  }
}
