export default (context, inject) => {
  const i18nMap = process.env.i18n || {}
  const i18n = key => i18nMap[key] || key
  inject('i18n', i18n)
  context.$i18n = i18n
}
