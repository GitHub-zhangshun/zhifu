export default {
  /** 投资金商品列表页面 */
  list: {
    tableColumns: [
      { title: '编号', prop: 'code', overflow: true, copy: true }, { title: '黄金类型', prop: 'categoryName' },
      { title: '名称', prop: 'name' }, { title: '黄金克重', prop: 'weight', type: 'unit', details: { unit: '克' } },
      { title: '状态', prop: 'isUse', type: 'bool', details: { name: ['启用', '禁用'] } }
    ],
    dialog: { form: {}, columns: [
      { label: '黄金类型', prop: 'categoryId', type: 'service', details: { apiKey: 'O_GOOD_TYPE', show: { isUse: false } }  }, { label: '名称', prop: 'name' },
      { label: '黄金克重', prop: 'weight', unit: '克' }, { label: '税收编码', prop: 'taxNumber', type: 'fuzzy', details: {
        props: { label: 'u_code', cusLabel: 'u_name|u_rate', value: 'u_code' }, apiKey: 'O_CONTROL_LIST', objData: { formName: 'taxRate', dataName: 'u_rate' }
      } },
      { label: '状态', prop: 'isUse', plc: '请选择', type: 'select', value: 'true', noClearable: true, details: [
        { name: '启用', value: 'true' }, { name: '禁用', value: 'false' }]
      },
      { label: '排序', prop: 'sort' }
     ]
    }
  },
  /** 商品列表-库存信息页面 */
  listInventory: {
    tableColumns: [
      { title: '平台总库存', prop: 'skuStock'}, { title: '平台真实库存', prop: 'realQty'},
      { title: '平台冻结库存', prop: 'frozenQty'}, { title: '第三方库存', prop: 'checkStock'},
    ],
    dialog: { form: {}, columns: [
      { label: '是否推荐', prop: 'recommend', plc: '请选择', type: 'select', value: 'true', noClearable: true, details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }]
      }]
    }
  },
  /** sku序列号列表页面 */
  sku: {
    tableColumns: [
      { title: '序列号', prop: 'serialCode', overflow: true, copy: true, fixed: true },
      { title: '二维码', prop: 'qrUrl', type: 'img' }, { title: '状态', prop: 'status', type: 'enum' },
      { title: '生成时间', prop: 'createTime', type: 'time', overflow: true }, { title: '出库时间', prop: 'outStockTime', type: 'time', overflow: true }
    ],
    // 审核弹窗
    dialog: { form: {}, columns: [
      { label: '审核', prop: 'isPass', plc: '请选择', type: 'select', noClearable: true, details: [
        { name: '同意', value: 'true' }, { name: '拒绝', value: 'false' }]
      },
      { label: '意见', prop: 'remark', plc: '请输入意见', type: 'textarea' }
     ]
    }
  },
  /** 库存明细列表页面 */
  details: {
    tableColumns: [
      { title: '类型', prop: 'type' }, { title: '流水号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '重量', prop: 'weight', type: 'unit', details: { unit: 'g' } }, { title: '数量', prop: 'qty' },
      { title: '平台总库存', prop: 'currentQty' }, { title: '第三方库存', prop: 'checkCurrentQty' },
      { title: '操作时间', prop: 'opTime', type: 'time', overflow: true }, { title: '成功时间', prop: 'successTime', type: 'time', overflow: true }
    ]
  },
  /** 商品列表-采购信息页面 */
  purchase: {
    tableColumns: [
      { title: '采购数量', prop: 'skuStock'}
    ],
    dialog: { form: {}, columns: [
      { label: '是否推荐', prop: 'recommend', plc: '请选择', type: 'select', value: 'true', noClearable: true, details: [
        { name: '是', value: 'true' }, { name: '否', value: 'false' }]
      }]
    }
  },
  /** 采购明细列表页面 */
  purchaseDetails: {
    tableColumns: [
      { title: '流水号', prop: 'orderCode', overflow: true, copy: true, fixed: true },
      { title: '重量', prop: 'weight', type: 'unit', details: { unit: 'g' } }, { title: '数量', prop: 'qty' },
      { title: '操作时间', prop: 'createTime', type: 'time', overflow: true }
    ]
  },
}
