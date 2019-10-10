export default {
  /** 功能页面 */
  action: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '样式', prop: 'cssName', type: 'button' }, { title: '函数', prop: 'jsName' },
      { title: '描述', prop: 'remark' }, { title: '类型', prop: 'isShow', type: 'bool', details: { name: ['显示', '隐藏'] } },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' },{ label: 'JS方法名', prop: 'jsName', plc: 'JS方法名', },
      { label: 'CSS名称', prop: 'cssName', value: '', plc: 'CSS名称', type: 'select', details: [
        { name: '默认', value: '' }, { name: '主要', value: 'primary' }, { name: '成功', value: 'success' }, { name: '信息', value: 'info' },
        { name: '警告', value: 'warning' }, { name: '危险', value: 'danger' }] },
      { label: '状态', prop: 'isUse', value: 'true', plc: '状态类型', type: 'select', details: [{ name: '启用', value: 'true' }, { name: '禁用', value: 'false' }] },
      { label: '是否显示', prop: 'isShow', value: 'true', plc: '是否显示' , type: 'select', details: [{ name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }]},
      { label: '备注', prop: 'remark', plc: '备注' },
      { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 菜单页面 */
  menu: {
    dialog: { form: {}, columns: [
      { label: '父级', prop: 'cascader', plc: '不选择默认为当前父级', type: 'cascader', options: [], props: { value: 'id', label: 'title' } },
      { label: '名称', prop: 'title', plc: '请输入名称' },{ label: '图标', prop: 'ico', plc: '图标', },
      { label: '是否显示', prop: 'isShow', value: 'true', plc: '是否显示', type: 'select', details: [
        { name: '显示', value: 'true' }, { name: '隐藏', value: 'false' }] },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 组织机构页面 */
  organization: {
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'title', plc: '请输入名称' },{ label: '序列号', prop: 'simplify', plc: '简化序列号', },
      { label: '状态', prop: 'isUse', value: 'true', plc: '状态', type: 'select', details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }] },
      { label: '是否部门', prop: 'isDepartment', value: 'false', plc: '是否部门', type: 'select', details: [
        { name: '部门', value: 'true' }, { name: '非部门', value: 'false' }] },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 组织机构 - 岗位 */
  organizationJob: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '是否管理', prop: 'isSuper', type: 'bool', details: { name: ['管理', '非管理'] } },
      { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: '是否管理', prop: 'isSuper', value: 'false', plc: '请选择', type: 'select', details: [
        { name: '管理', value: 'true' }, { name: '非管理', value: 'false' }] },
      { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 角色页面 */
  role: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: '描述', prop: 'remark' }
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: '备注', prop: 'remark', plc: '备注' }, { label: '排序', prop: 'sort', plc: '排序' }]
    }
  },
  /** 用户页面 */
  user: {
    tableColumns: [
      { title: '姓名', prop: 'name' }, { title: '手机', prop: 'phone' },
      { title: '登录名', prop: 'loginName' }, { title: '是否手机登录', prop: 'isPhoneLogin', type: 'bool', details: { name: ['是', '否']}  }
    ],
    dialog: { form: {}, columns: [
      { label: '姓名', prop: 'name', plc: '请输入姓名' }, { label: '手机号', prop: 'phone', plc: '手机号' },
      { label: '登录名', prop: 'loginName', plc: '登录名' },
      { label: '是否手机登录', prop: 'isPhoneLogin', value: 'true', plc: '请选择', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }] }
      ]
    }
  },
  /** 项目管理页面 */
  project: {
    tableColumns: [
      { title: '名称', prop: 'name' }, { title: 'key', prop: 'key' },
      { title: '数据库类型', prop: 'databaseType', type: 'select', details: { '0': 'MySql' , '1': 'SqlServer', '2': 'Sqlite', '3': 'Oracle', '4': 'PostgreSQL' } },
      { title: '数据库名', prop: 'databaseName' }, { title: '数据库连接', prop: 'connect', overflow: true, copy: true },
      { title: '描述', prop: 'remark', overflow: true },
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name', plc: '请输入名称' }, { label: 'key', prop: 'key', plc: 'key' },
      { label: '数据库类型', prop: 'databaseType', plc: '请选择', value: '1', type: 'select', details: [
        { name: 'MySql', value: '0' }, { name: 'SqlServer', value: '1' }, { name: 'Sqlite', value: '2' }, { name: 'Oracle', value: '3' }, { name: 'PostgreSQL', value: '4' }
      ] },
      { label: '数据库名', prop: 'databaseName', plc: '数据库名' }, { label: '数据库连接', prop: 'connect', plc: '数据库连接', type: 'textarea' },
      { label: '描述', prop: 'remark', plc: '描述' }, { label: '排序', prop: 'sort', plc: '排序' } ]
    }
  }
}
