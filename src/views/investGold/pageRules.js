import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
  // 投资金商品新增页面表单验证规则
  addRules: {
    categoryId: [{ validator: validateNull, trigger: 'change', message: '请选择黄金类型' }],
    name: [{ validator: validateNull, trigger: 'blur', message: '请输入商品名称' }],
    weight: [
      { validator: validateNull, trigger: 'blur', message: '请输入商品克重' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '商品克重输入不正确' }
    ]
  }
}
