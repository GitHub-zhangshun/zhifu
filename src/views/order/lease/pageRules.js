import { validateNull, validatePositiveFloat, validatePhone } from '@/utils/validate'

export default {
  // 租赁审核表单验证规则
  auditRules: {
    isLease: [{ validator: validateNull, trigger: 'change', message: '请选择' }],
    tenantry: [{ validator: validateNull, trigger: 'blur', message: '请输入' }],
    contactName: [{ validator: validateNull, trigger: 'blur', message: '请输入' }],
    actualGoldType: [{ validator: validateNull, trigger: 'change', message: '请选择' }],
    remark: [{ validator: validateNull, trigger: 'blur', message: '请输入' }],
    contactPhone: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePhone, trigger: 'blur', message: '输入不正确' }
    ],
    actualWeight: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
    actualPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
  },
  // 租赁归还表单验证规则
  giveBackRules: {
    time: [{ validator: validateNull, trigger: 'change', message: '请选择' }],
    remark: [{ validator: validateNull, trigger: 'blur', message: '请输入' }]
  }
}
