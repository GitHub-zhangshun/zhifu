import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
  // 运费模板页面表单验证规则
  template: {
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
  }
}
