import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
  // 租赁审核表单验证规则
  auditRules: {
    status: [{ validator: validateNull, trigger: 'change', message: '请选择' }],
    actualGoldType: [{ validator: validateNull, trigger: 'change', message: '请选择' }],
    remark: [{ validator: validateNull, trigger: 'blur', message: '请输入' }],
    actualRecoveryPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
    actualWeight: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
    actualPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
  }
}
