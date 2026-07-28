<div align="center">
  <a href="https://expresso-ts.com">
    <img src="https://github.com/expressots/expressots/blob/main/media/expressots.png" alt="ExpressoTS" width="120">
  </a>

  <h1>ExpressoTS VS Code Extension</h1>

  <p>CLI wrapper + snippets for ExpressoTS 4.x development.</p>

  <p>
    <a href="https://github.com/expressots/expressots-vscode-ext/blob/main/LICENSE"><img src="https://img.shields.io/github/license/expressots/expressots-vscode-ext?style=flat-square&color=181717" alt="License"></a>
    <a href="https://discord.com/invite/PyPJfGK"><img src="https://img.shields.io/badge/Discord-join-5865F2?style=flat-square&logo=discord&logoColor=white" alt="Discord"></a>
  </p>
</div>

---

## Features (v1)

1. **ExpressoTS: Generate…** — pick a schematic, enter a name, runs `ex g` in the workspace and opens the created file
2. **ExpressoTS: Open Studio** — command + status-bar button running `ex studio`
3. **Snippets** — `ex-controller`, `ex-usecase`, `ex-provider` (`IProvider`), `ex-guard`, `ex-module` (`CreateModule`)

Requires a project created with `ex new` (4.x) and `@expressots/cli` available locally or via `npx`.

## Development

```bash
npm install
npm run compile
npm test
```

Press **F5** in VS Code to launch the Extension Development Host.

### Smoke checklist

- Open a folder created with `ex new`
- Command Palette → **ExpressoTS: Generate…** → `controller` → name → file opens
- Status bar **ExpressoTS Studio** starts `ex studio` in a terminal
- Type `ex-provider` / `ex-module` in a `.ts` file and expand the snippet

### Package

```bash
npm run package
```

Produces `expressots-1.0.0.vsix`. Marketplace publish is done by maintainers under the `expressots` publisher.

## Contributing

See the [ExpressoTS Contributing Guide](https://github.com/expressots/expressots/blob/main/CONTRIBUTING.md).

## License

MIT — see [LICENSE](./LICENSE).
