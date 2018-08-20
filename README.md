# verdaccio-gitlab

Use [GitLab Community Edition](https://gitlab.com/gitlab-org/gitlab-ce)
as authentication provider for the private npm registry
[Verdaccio](https://github.com/verdaccio/verdaccio), the sinopia fork.

## Gitlab Version Compatibility

- If `legacy_mode: false` or undefined (default mode): Gitlab 11.2+
- If `legacy_mode: true`: Gitlab 9.0+

## Installation
* `$ npm i verdaccio -g`

## Configuration

Add the following in your `config.yaml`

```yaml
middlewares:
  gitlab:
    client-secret: github-app-secret # required
    git-hostname: git-enteprise-domain-name # optional 

auth:
  gitlab:
    url: <url>
    authCache:
      enabled: <boolean>
      ttl: <integer>
    legacy_mode: <boolean>
    publish: <string>
```

## Inspired by

- [verdaccio-ldap](https://github.com/Alexandre-io/verdaccio-ldap)
- [node-bacstack](https://github.com/fh1ch/node-bacstack)
- [verdaccio-bitbucket](https://github.com/idangozlan/verdaccio-bitbucket)

## License

[MIT](https://spdx.org/licenses/MIT)
