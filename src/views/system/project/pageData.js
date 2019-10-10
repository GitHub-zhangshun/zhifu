export default {
  /** 列表页面 */
  list: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' },
      { title: '运行时链接', prop: 'runHost' }, { title: '描述', prop: 'remark', overflow: true }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: 'key', prop: 'key', plc: 'key' },
      { label: '运行时链接', prop: 'runHost', plc: '运行时链接' }, { label: 'http链接', prop: 'httpLink', plc: 'http链接' },
      { label: '初始API接口', prop: 'initAction', plc: '初始API接口' },
      { label: '数据库类型', prop: 'databaseType', plc: '请选择', value: '1', type: 'select', details: [
        { name: 'MySql', value: '0' }, { name: 'SqlServer', value: '1' }, { name: 'Sqlite', value: '2' }, { name: 'Oracle', value: '3' }, { name: 'PostgreSQL', value: '4' }
      ] },
      { label: '数据库名', prop: 'databaseName', plc: '数据库名' }, { label: '数据库连接', prop: 'connect', plc: '数据库连接', type: 'textarea' },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 配置类型页面 */
  type: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' },
      { title: '描述', prop: 'remark', overflow: true },
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: 'key', prop: 'key', plc: 'key' },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 配置类型-KEY页面 */
  typeKey: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'keyName', prop: 'keyName' },
      { title: '描述', prop: 'remark', overflow: true },
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: 'keyName', prop: 'keyName', plc: 'keyName' },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  },
  /** 配置类型-配置信息页面 */
  typeAllocationInfo: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' },
      { title: '主体', prop: 'content', overflow: true, copy: true }, { title: '描述', prop: 'remark', overflow: true },
    ]
  },
  /** 定时服务页面 */
  timing: {
    tableColumns: [
      { title: '名称', prop: 'operator', fixed: true }, { title: '数据请求地址', prop: 'dataUrl', overflow: true, copy: true },
      { title: '数据处理地址', prop: 'dataHandleUrl', overflow: true, copy: true },
      { title: '状态', prop: 'isOpen', type: 'bool', details: { name: ['启用', '禁用'] } },
      { title: '描述', prop: 'remark', overflow: true },
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'operator', plc: '名称' }, { label: '时间控制表达式', prop: 'cron', plc: '时间控制表达式' },
      { label: '是否先请求数据', prop: 'isGetData', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '数据请求地址', prop: 'dataUrl', plc: '数据请求地址', type: 'textarea' },
      { label: '请求是否内部', prop: 'requestIsInternal', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '数据处理地址', prop: 'dataHandleUrl', plc: '数据处理地址', type: 'textarea' },
      { label: '处理是否内部', prop: 'responseIsInternal', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '状态', prop: 'isOpen', plc: '请选择', value: 'true', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }
      ] },
      { label: '描述', prop: 'remark', plc: '描述' } ]
    }
  }
}
