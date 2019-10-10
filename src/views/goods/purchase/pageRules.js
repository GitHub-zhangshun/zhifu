import { validateNull, validateArray, validatePositiveFloat } from '@/utils/validate'

export default {
  // 新增采购单页面表单验证规则
  dialogAddRules: {
    categoryId: [{ validator: validateNull, trigger: 'change', message: '请选择商品分类' }],
    good: [{ validator: validateArray, trigger: 'change', message: '请选择商品' }],
    purchaseMan: [{ validator: validateNull, trigger: 'blur', message: '采购人不能为空' }],
    purchaseTime: [{ validator: validateNull, trigger: 'blur', message: '采购时间不能为空' }],
    purchaseContract: [{ validator: validateNull, trigger: 'blur', message: '采购合同不能为空' }],
    price: [
      { validator: validateNull, trigger: 'blur', message: '请输入商品单价' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '商品单价输入不正确' }
    ]
  },
  // 采购审核 验证
  dialogAuditRules: {
    isPass: [{ validator: validateNull, trigger: 'change', message: '请选择审核结果' }],
    remark: [{ validator: validateArray, trigger: 'blur', message: '请输入意见' }],
  }
}
