import Vue from 'vue'
import store from '@/store'

const generators = {

  curl(server, def) {
    let cmd = `curl -X ${def.method.toUpperCase()} "${server}${def.path}"`

    if (def.requestBody) {
      if(def.requestBody.content['application/json']) {
        let example = JSON.stringify(def.requestBody.content['application/json'].example || {});
        cmd += ` -H "Content-Type: application/json" --data ${example}`
      }
    }

    return cmd
  },

}

const codegen = (lang, def) => {
  const server = store.getters.currentServer
  if(!generators[lang])
    return ""
  return generators[lang](server, def)
}

Vue.prototype.$codegen = codegen
