import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
  // 平台金价设置页面表单验证规则
  platPrizeSet: {
    isAutomatic: [{ validator: validateNull, trigger: 'change', message: '请选获取方式' }],
    isHighPrecision: [{ validator: validateNull, trigger: 'change', message: '请选择黄金类型' }],
    rate: [
      { validator: validateNull, trigger: 'blur', message: '请输入溢价比例' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '溢价比例输入不正确' }
    ],
    goldPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入金价' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金价输入不正确' }
    ]
  },
  // 平台对手金价设置页面表单验证规则
  platOpponentSet: {
    name: [{ validator: validateNull, trigger: 'blur', message: '名称不能为空' }],
    price: [
      { validator: validateNull, trigger: 'blur', message: '请输入价格' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '价格输入不正确' }
    ]
  }
}
