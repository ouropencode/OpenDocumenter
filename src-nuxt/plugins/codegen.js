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

  php(server, def) {
    return `<?php
require_once(__DIR__ . '/vendor/autoload.php');

$api_instance = new OpenAPITools\Client\Api\AuthenticateApi();
$apiThing = {"username":"test"}; // AuthenticationUser |

try {
    $result = $api_instance->authenticateRegisterPost($authenticationUser);
    print_r($result);
} catch (Exception $e) {
    echo 'Exception when calling AuthenticateApi->authenticateRegisterPost: ', $e->getMessage(), PHP_EOL;
}`
  }

}

export default (context, inject) => {
  const codegen = (lang, def) => {
    const server = context.store.getters.currentServer
    if(!generators[lang])
      return ""
    return generators[lang](server, def)
  }

  inject('codegen', codegen)
  context.$codegen = codegen
}
