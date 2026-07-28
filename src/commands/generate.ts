import * as path from "path";
import * as vscode from "vscode";
import { runCli } from "../cli";
import {
  SCHEMATICS,
  Schematic,
  expectedGeneratedGlob,
  findExpressotsConfig,
  resolveExBinary,
} from "../helpers";

export async function generateCommand(
  output: vscode.OutputChannel,
): Promise<void> {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) {
    void vscode.window.showErrorMessage(
      "Open an ExpressoTS workspace folder first.",
    );
    return;
  }

  const workspaceRoot = folder.uri.fsPath;
  const configPath = findExpressotsConfig(workspaceRoot);
  if (!configPath) {
    void vscode.window.showErrorMessage(
      "No expressots.config.ts found in this workspace. Create a project with `ex new` first.",
    );
    return;
  }

  const schematicPick = await vscode.window.showQuickPick(
    SCHEMATICS.map((s) => ({ label: s, description: `ex g ${s}` })),
    { placeHolder: "Select a schematic", title: "ExpressoTS: Generate" },
  );
  if (!schematicPick) {
    return;
  }
  const schematic = schematicPick.label as Schematic;

  const name = await vscode.window.showInputBox({
    title: "ExpressoTS: Generate",
    prompt: `Name or relative path for ${schematic} (e.g. user or user/create)`,
    placeHolder: "name",
    ignoreFocusOut: true,
    validateInput: (value) => {
      if (!value.trim()) {
        return "Name is required";
      }
      if (path.isAbsolute(value.trim())) {
        return "Use a relative path (ex g rejects absolute paths)";
      }
      return undefined;
    },
  });
  if (!name) {
    return;
  }

  const { command, argsPrefix } = resolveExBinary(workspaceRoot);
  const args = [...argsPrefix, "g", schematic, name.trim()];

  output.show(true);
  output.appendLine("--- ExpressoTS Generate ---");

  const result = await vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: `ExpressoTS: generating ${schematic}…`,
      cancellable: false,
    },
    () => runCli(command, args, workspaceRoot, output),
  );

  if (result.code !== 0) {
    void vscode.window.showErrorMessage(
      `ex g failed (exit ${result.code ?? "?"}). See the ExpressoTS output channel.`,
    );
    return;
  }

  const glob = expectedGeneratedGlob(schematic, name.trim());
  const matches = await vscode.workspace.findFiles(glob, "**/node_modules/**", 5);

  if (matches.length === 0) {
    void vscode.window.showInformationMessage(
      `${schematic} generated. Could not locate the new file — check the ExpressoTS output.`,
    );
    return;
  }

  const ranked = await Promise.all(
    matches.map(async (uri) => {
      const stat = await vscode.workspace.fs.stat(uri);
      return { uri, mtime: stat.mtime };
    }),
  );
  ranked.sort((a, b) => b.mtime - a.mtime);

  const doc = await vscode.workspace.openTextDocument(ranked[0].uri);
  await vscode.window.showTextDocument(doc);
  void vscode.window.showInformationMessage(
    `Created ${path.basename(ranked[0].uri.fsPath)}`,
  );
}
