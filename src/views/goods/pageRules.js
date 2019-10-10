import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
  // 商品新增页面表单验证规则
  addRules: {
    categoryId: [{ validator: validateNull, trigger: 'change', message: '请选择商品分类' }],
    name: [{ validator: validateNull, trigger: 'blur', message: '请输入商品名称' }],
    weight: [
      { validator: validateNull, trigger: 'blur', message: '请输入商品克重' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '商品克重输入不正确' }
    ],
    madePrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入加工费' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '加工费输入不正确' }
    ],
    poundageRate: [
      { validator: validateNull, trigger: 'blur', message: '请输入手续费率' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '手续费率输入不正确' }
    ],
  }
}
