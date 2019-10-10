import defaultSettings from '@/settings'
import i18n from '@/lang'

const title = defaultSettings.title || '黄金平台中控'

export default function getPageTitle(key) {
  const hasKey = i18n.te(`route.${key}`)
  if (hasKey) {
    const pageName = i18n.t(`route.${key}`)
    return `${pageName} - ${title}`
  }
  const _title = key ? `${key} - ${title}` : title
  return _title
}
