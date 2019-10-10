import { validateNull, validatePositiveFloat, validatePositiveInteger } from '@/utils/validate'

export default {
  // 充值提现手续费页面表单验证规则
  charge: {
    minimumRecharge: [
      { validator: validateNull, trigger: 'blur', message: '请输入最低充值金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '最低充值金额输入不正确' }
    ],
    minimumWithdraw: [
      { validator: validateNull, trigger: 'blur', message: '请输入最低提现金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '最低提现金额输入不正确' }
    ],
    limitMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入阶梯值' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '阶梯值输入不正确' }
    ],
    limitTimelyMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入阶梯值' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '阶梯值输入不正确' }
    ],
    oneUpperMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    oneUpperRate: [
      { validator: validateNull, trigger: 'blur', message: '请输入比例' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '比例输入不正确' }
    ],
    oneLowerMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    oneLowerRate: [
      { validator: validateNull, trigger: 'blur', message: '请输入比例' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '比例输入不正确' }
    ],
    timelyUpperMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    timelyUpperRate: [
      { validator: validateNull, trigger: 'blur', message: '请输入比例' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '比例输入不正确' }
    ],
    timelyLowerMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    timelyLowerRate: [
      { validator: validateNull, trigger: 'blur', message: '请输入比例' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '比例输入不正确' }
    ]
  },
  // 商城交易限制页面表单验证规则
  storeLimit: {
    singleTime: [
      { validator: validateNull, trigger: 'blur', message: '请输入克重' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '克重输入不正确' }
    ],
    singleDay: [
      { validator: validateNull, trigger: 'blur', message: '请输入克重' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '克重输入不正确' }
    ],
    platformDay: [
      { validator: validateNull, trigger: 'blur', message: '请输入克重' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '克重输入不正确' }
    ],
  },
  // 投资金交易限制页面表单验证规则
  investLimit: {
    minimumMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    userDayMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    platformDayMoney: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
  },
  // 交易开关页面表单验证规则
  transaction: {
    openPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    highestPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
    minimumPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
  },
  // 出租利率页面表单验证规则
  rental: {
    dayNumber: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveInteger, trigger: 'blur', message: '输入不正确' }
    ],
    rate: [
      { validator: validateNull, trigger: 'blur', message: '请输入' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '输入不正确' }
    ],
    minimumPrice: [
      { validator: validateNull, trigger: 'blur', message: '请输入金额' },
      { validator: validatePositiveFloat, trigger: 'blur', message: '金额输入不正确' }
    ],
  }
}
