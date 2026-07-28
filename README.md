<div align="center">
  <a href="https://expresso-ts.com">
    <img src="https://github.com/expressots/expressots/blob/main/media/expressots.png" alt="ExpressoTS" width="120">
  </a>

  <h1>ExpressoTS VS Code Extension</h1>

  <p>Lean VS Code extension foundation for ExpressoTS 4.x (CLI wrapper).</p>

  <p>
    <a href="https://github.com/expressots/expressots-vscode-ext/blob/main/LICENSE"><img src="https://img.shields.io/github/license/expressots/expressots-vscode-ext?style=flat-square&color=181717" alt="License"></a>
    <a href="https://discord.com/invite/PyPJfGK"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  </p>
</div>

---

## About

### Generate

Command Palette → **ExpressoTS: Generate…** → pick schematic → name → runs `ex g` and opens the created file.

### Snippets

TypeScript prefixes: `ex-controller`, `ex-usecase`, `ex-provider` (`IProvider`), `ex-guard`, `ex-module` (`CreateModule`).

Rescoped foundation for ExpressoTS 4.x. The legacy React/webview CRA scaffold is removed. Follow-up PRs add snippets, `ex g` Generate, Studio launcher, and vsix CI ([expressots/expressots#943](https://github.com/expressots/expressots/issues/943)).

## Development

```bash
npm install
npm run compile
npm test
```

Press **F5** in VS Code to launch the Extension Development Host.

### Package

```bash
npm run package
```

Marketplace publish is done by maintainers under the `expressots` publisher.

## Contributing

See the [ExpressoTS Contributing Guide](https://github.com/expressots/expressots/blob/main/CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
