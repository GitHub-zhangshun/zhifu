import router from '@/router/index'
export default {
  /** 三方业务 */
  list: {
    tableColumns: [
      { title: '名称', prop: 'name'},
      { title: '简写码', prop: 'code'},
      { title: '备注', prop: 'remark' },
      { title: '创建时间', prop: 'createTime', type: 'time'}, 
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name' ,plc: '请输入名称' },
      { label : '配置信息', prop: 'extendConfig', type: 'json'},
      { label:'简写码',prop: 'code' ,plc: '请输入简写码' },
      { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort' }
     ]
    }
  },
  // 三方信息
  listInfo: {
    tableColumns: [
      { title: '名称', prop: 'name', overflow: true, fixed: true },
      { title: '简写码', prop: 'code', overflow: true, fixed: true },
      { title: '备注', prop: 'remark', overflow: true, fixed: true },
      { title: '回调通知apiKey', prop: 'callBackApiKey'},
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, 
    ],
    dialog: { form: {}, columns: [
      { label: '名称', prop: 'name' ,plc: '请输入名称' },
      { label: '回调通知apiKey', prop: 'callBackApiKey' ,plc: '请输入回调通知apiKey' },
      { label : '配置信息', prop: 'extendConfig', type: 'json'},
      { label:'简写码',prop: 'code' ,plc: '请输入简写码' },
      { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort' }
     ]
    }
  },
  //业务
  listBusiness: {
    tableColumns: [
      { title: '名称', prop: 'name', overflow: true, fixed: true },
      { title: '简写码', prop: 'code', overflow: true, fixed: true },
      { title: '业务码', prop: 'businessCode'},
      { title: '形式', prop: 'pattern', overflow: true, fixed: true },
      { title: '备注', prop: 'remark', overflow: true, fixed: true },
      { title: '实现apikey', prop: 'apiKey', overflow: true, fixed: true },
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, 
    ],
    dialog: { form: {}, columns: [
      { label: '业务', prop: 'businessId', type: 'service', details: { apiKey: 'O_BUS_FEILD', requestData: {
        index: '1', size: '10000', condition: {}
      } }  },
      { label: '名称', prop: 'name' ,plc: '请输入名称' },
      { label:'简写码',prop: 'code' ,plc: '请输入简写码' },
      { label:'形式',prop: 'pattern' },
      { label : '配置信息', prop: 'extendConfig', type: 'json'},     
      { label:'实现apikey',prop: 'apiKey'},
      { label: '备注', prop: 'remark', plc: '请输入备注' },
      { label: '排序', prop: 'sort' }
     ]
    }
  },
  // 三方字段
  operationField:{
    tableColumns: [     
      { title: '字段名称', prop: 'name' },
      { title: '业务字段', prop: 'businessField' },
      { title: '三方业务字段', prop: 'key' },
      { title: '是否索引', prop: 'isIndex' ,details: { name: ['是', '否'] },type:'bool'},
      { title: '是否必填', prop: 'isMust',details: { name: ['是', '否'] } ,type:'bool'},
      { title: '正则表达式', prop: 'regex',overflow: true},
      { title: '字段类型', prop: 'fieldType' },
      { title: '是否结果字段', prop: 'isResult' ,details: { name: ['是', '否'] },type:'bool'},
      { title: '排序', prop: 'sort',overflow: true},
      { title: '备注', prop: 'remark', overflow: true},
      { title: '创建时间', prop: 'createTime', type: 'time', overflow: true }, 
    ],
    dialog: { form: {}, columns: [
      { label: '业务', prop: 'fieldId', type: 'service', details: { apiKey: 'O_OP_FEILD', requestData: {
        index: '1', size: '10000', condition: {}
      } }  },
      { label: '三方业务字段', prop: 'key'},      
      { label: '是否索引', prop: 'isIndex',plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '是否必填', prop: 'isMust',plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '正则表达式', prop: 'regex'},
      { label: '排序', prop: 'sort' },
      { label: '字段类型', prop: 'fieldType'},
      { label: '是否结果字段', prop: 'isResult',plc: '请选择', value: 'true', type: 'select', details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }
      ] },
      { label: '备注', prop: 'remark',}
     ]
    }
  }
}