# OpenDocumenter
OpenDocumenter is a automatic documentation generator for [OpenAPI v3](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.0.md) schemas. Simply provide your schema file in JSON or YAML, then sit back and enjoy the documentation.

Powered by [nuxt.js](https://nuxtjs.org/https://nuxtjs.org/) and [swagger-parser](https://github.com/swagger-api/swagger-parser).

## Example
![Image](https://raw.githubusercontent.com/ouropencode/OpenDocumenter/master/res/example.png)

## Installation

```bash
> npm install -g opendocumenter
```
or
```bash
> yarn global add opendocumenter
```

## Usage
```
> opendocumenter --help

   _____             ____                            _
  |     |___ ___ ___|    \ ___ ___ _ _ _____ ___ ___| |_ ___ ___
  |  |  | . | -_|   |  |  | . |  _| | |     | -_|   |  _| -_|  _|
  |_____|  _|___|_|_|____/|___|___|___|_|_|_|___|_|_|_| |___|_|
        |_|                                                                      

  OpenDocumenter is a automatic documentation generator for OpenAPI v3 schemas.
  Simply provide your schema file in JSON or YAML, then sit back and enjoy the documentation.

  Powered by nuxt.js and swagger-parser.

  Usage:

    opendocumenter --schema=<file> --output=<dir>

  Arguments:

    --schema=<file>    The OpenAPI 3 format file to generate documentation from
    --output=<dir>     The output destination directory
    --config=<file>    A configuration file to load advanced options from.
```

## Configuration
OpenDocumenter can be configured using a `.json` file stored alongside your schema file.

### Merge From Directory
The `mergeFromDirectory` parameter allows you to specify a directory that will be copied over the base template before building. This allows customization of any part of OpenDocumenter to suit your needs.

```json
{
  "mergeFromDirectory": "./overrides"
}
```

Any part of the OpenDocumenter nuxt source (see: [./src-nuxt](./src-nuxt)) can be overridden, just ensure to follow the same directory structure!
```
overrides
 |- assets
 | '- theme.less
 '- components
   |- DocHeader.vue
   '- DocEntry.vue
```

### 'Generated Using' Footer
By default, a small 'Generated Using' message is included on the footer of the generated documentation. Although we'd love you to keep it, you can disable this by setting the `disableGeneratedUsingFooter` parameter to true.

```json
{
  "disableGeneratedUsingFooter": true
}
```

### Aborting on Invalid Schema
OpenDocumenter is capable of generating documentation for OpenAPI schemas that don't match the OpenAPI Specification entirely. When generating we attempt to validate your schema, display any validation warnings, and then continue to generate. If you would like the generation to abort when a schema is invalid you can set the `abortOnInvalidSchema` parameter to true.

```json
{
  "abortOnInvalidSchema": true
}
```

### Badges
Various badges are included in the generated documentation header, such as the API version. Additional badges can be added using the `badges` parameter. Each badge is an object containing either the `url` key, or a combination of `left`, `right` and `color`. The `translate` parameter can be used (`left`, `right`, `both`) to run the text through the internationalization handler. All badges are generated using [shields.io](https://shields.io) unless a URL is provided.

```json
{
  "badges": [
    { "url": "https://img.shields.io/badge/test-1.2.3--test-blue" },
    { "left": "test", "right": "1.2.3-test", "color": "blue"}
  ]
}
```

### Internationalization
Most of the documentation text is taken directly from the OpenAPI schema file, however, there are various strings throughout the project that cannot be stored within the schema file. All of these strings are customizable by editing the `i18n` parameter.
```json
{
  "i18n": {
    "API_SDK_DOCUMENTATION": "API and SDK Documentation",
    "VERSION": "version",
    "NO_INDEPTH_DOCS_AVAILABLE_ENDPOINT": "No in-depth API documentation is available for this endpoint.",
    "NO_INDEPTH_DOCS_AVAILABLE_TAG": "No in-depth API documentation is available for this section.",
    "CLICK_TO_COPY": "click to copy",
    "COPIED": "copied",
    "REQUEST_BODY": "Request Body",
    "REQUEST_RESPONSES": "Request Responses",
    "DEFINITION": "Definition",
    "DEFINITIONS": "Definitions",
    "SERVER": "Server",
    "LANGUAGE": "Language",
    "GENERATED_USING": "Generated using OpenDocumenter by $ourOpenCode",
    "HAVE_ANY_QUESTIONS_CONTACT": "Have any questions? Please contact",
    "US": "us",
    "OR": "or",
    "VIA_EMAIL": "via email",
    "VIA_OUR_WEBSITE": "via our website"
  }
}
```

## Licence
Licenced under the MIT licence. Please see [LICENCE.md](LICENCE.md) for more details.
