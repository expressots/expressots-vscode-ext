import * as vscode from "vscode";
import { findExpressotsConfig, resolveExBinary } from "../helpers";

export function createStudioStatusBar(
  context: vscode.ExtensionContext,
): vscode.StatusBarItem {
  const item = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Left,
    100,
  );
  item.text = "$(play) ExpressoTS Studio";
  item.tooltip = "Open ExpressoTS Studio (ex studio)";
  item.command = "expressots.studio";
  item.show();
  context.subscriptions.push(item);
  return item;
}

export async function studioCommand(): Promise<void> {
  const folder = vscode.workspace.workspaceFolders?.[0];
  if (!folder) {
    void vscode.window.showErrorMessage(
      "Open an ExpressoTS workspace folder first.",
    );
    return;
  }

  const workspaceRoot = folder.uri.fsPath;
  if (!findExpressotsConfig(workspaceRoot)) {
    void vscode.window.showErrorMessage(
      "No expressots.config.ts found in this workspace. Create a project with `ex new` first.",
    );
    return;
  }

  const { command, argsPrefix } = resolveExBinary(workspaceRoot);
  const terminal =
    vscode.window.terminals.find((t) => t.name === "ExpressoTS Studio") ??
    vscode.window.createTerminal({
      name: "ExpressoTS Studio",
      cwd: workspaceRoot,
    });

  terminal.show();
  const quoted = command.includes(" ") ? `"${command}"` : command;
  const line = [quoted, ...argsPrefix, "studio"].join(" ");
  terminal.sendText(line);
}
