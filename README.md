# Zenload [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

[NPMIMGURL]: https://img.shields.io/npm/v/zenload.svg?style=flat
[BuildStatusURL]: https://github.com/coderaiser/zenload/actions?query=workflow%3A%22Node+CI%22 "Build Status"
[BuildStatusIMGURL]: https://github.com/coderaiser/zenload/workflows/Node%20CI/badge.svg
[LicenseIMGURL]: https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]: https://npmjs.org/package/zenload "npm"
[LicenseURL]: https://tldrlegal.com/license/mit-license "MIT License"
[CoverageURL]: https://coveralls.io/github/coderaiser/zenload?branch=master
[CoverageIMGURL]: https://coveralls.io/repos/coderaiser/zenload/badge.svg?branch=master&service=github

Load couple loaders and apply transforms one-by-one.

## Install

```
npm i zenload -g
```

## How to use?

Using configuration file `.zenload.json`:

```js
[
    "mock-import",
    "c4",
];
```

## How it works?

It uses [loader hooks](https://nodejs.org/docs/latest/api/esm.html#loaders).
Loads all loaders then apply them one-by-one. Source is passed overriding `defaultLoad`, so nothing should be done
on loaders side. The only rule is get the source using provided by `Node.js` team method: `defaultLoad`.

## Supported Loaders

- ✅ [mock-import](https://github.com/coderaiser/mock-import);
- ✅ [c4](https://github.com/coderaiser/c4);
- ✅ [putout](https://github.com/coderaiser/putout);

## License

MIT
