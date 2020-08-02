# Contributing

We love pull requests from everyone.

When contributing to this repository, please first discuss the change you wish to make by opening an issue. Please note we have a [code of conduct](CODE_OF_CONDUCT.md), please follow it in all your interactions with the project.

## Development Setup

### Fork the repository
```bash
> git clone git@github.com:ouropencode/opendocumenter.git
```

### Set up your machine
```bash
> yarn install
```

### Execute
```bash
> yarn start         # run the example 'openapi.yml' in  ./example
> yarn dev           # watch the filesystem for changes and exec `yarn start`
```

## Pull Request Process
When your feature is ready to show to others, you should follow the below process to allow for an easy contribution flow.

1. Make your changes.
2. If applicable, Update the [README.md](README.md).
3. If applicable, Update the `./example/config.json` file.
4. If applicable, Update the `./example/openapi.yml` file.
5. Push to a new branch.
6. Create a [draft pull request](https://github.blog/2019-02-14-introducing-draft-pull-requests/).
7. When ready to merge, update pull request to 'Ready for Review'.
8. Wait for us, we try to comment on pull requests within a reasonable timeframe. We may suggest changes before accepting the pull request.

## Internationalization
Any contributions should consider the existing i18n support available through the `$i18n()` method. Any new strings added to the project should use this method for string internationalization. When adding a new string you will need to edit the `./src/index.js` file, and the `./example/config.json` file.

## Configuration
All configuration is handled through a `.json` file provided by the end-user. Provided throughout the project via the `$config.*` variable. When adding a new parameter you will need to edit the `./src/index.js` file, the `./src/environment.json` file, and the `./example/config.json` file.

Care should be taken when altering the `environment.json` file - the intention if to provide enough structure for the documentation to display even if no env is available to inject (this happens when running `yarn dev-nuxt`). Ideally, this means purely structural elements such as `{}` and `[]` although this isn't a hard requirement.

## Versions
For versioning we use the [Semantic Versioning](https://semver.org) versioning scheme. Versioning will be managed by the $ourOpenCode team and contributors should leave all versions at the version forked.
