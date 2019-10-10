import { validateNull, validatePositiveFloat, validateArrayPhone, validateArray, validatePhone } from '@/utils/validate'

export default {
  // 门店新增页面表单验证规则
  addRules: {
    phones: [{ validator: validateArrayPhone, trigger: 'blur' }],
    phone: [{ validator: validatePhone, trigger: 'blur' }],
    region: [{ validator: validateArray, trigger: 'blur', message: '请选择城市' }],
    name: [{ validator: validateNull, trigger: 'blur', message: '请输入门店名称' }],
    businessHours: [{ validator: validateNull, trigger: 'blur', message: '请输入门店名称' }],
    address: [{ validator: validateNull, trigger: 'blur', message: '请输入门店地址' }]
  }
}
