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
OpenDocumenter can be configured using a `.json` file stored alongside your schema file. This file can contain any of the following options:

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

### Disable 'Generated Using' Footer
By default a small 'Generated Using' message is included on the footer the generated documentation. Although we'd love you to keep it, you can disable this by setting the `disableGeneratedUsingFooter` parameter to true.

```json
{
  "disableGeneratedUsingFooter": true
}
```

### Internationalization
Most of the documentation text is taken directly from the OpenAPI schema file, however, there are various strings throughout the project that cannot be stored within the schema file. All of these strings are customizable by editing the `i18n` parameter.
```json
{
  "i18n": {
    "API_SDK_DOCUMENTATION": "API and SDK Documentation",
    "VERSION": "Version",
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
    "GENERATED_USING": "Generated using OpenDocumenter by OurOpenCode",
  },
}
```

## Licence
Licenced under the MIT licence. Please see [LICENCE.md](LICENCE.md) for more details.
