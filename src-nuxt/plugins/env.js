export default (context, inject) => {
  const env = key => process.env[key] || undefined
  inject('env', env)
  context.$env = env
}
