import { validateNull, validatePositiveFloat } from '@/utils/validate'

export default {
    name: [{ validator: validateNull, trigger: 'blur', message: '请输入名称' }],
    code: [{ validator: validateNull, trigger: 'blur', message: '请输入简写码' }],
    key: [{ validator: validateNull, trigger: 'blur', message: '请输入英文名' }],
    externalId: [{ validator: validateNull, trigger: 'blur', message: '请选择三方信息' }],
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
