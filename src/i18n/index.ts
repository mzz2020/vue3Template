import { createI18n } from '@yangss/vue3-i18n'
import zh from './zh'
import en from './en'

const i18n = createI18n({
  locale: 'zh',
  fallbackLocale: 'zh', // 没找到国际化配置时，默认查找并显示中文
  messages: {
    zh,
    en
  }
})

export default i18n
