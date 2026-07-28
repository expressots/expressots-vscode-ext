import * as vscode from "vscode";
import { generateCommand } from "./commands/generate";
import { createStudioStatusBar, studioCommand } from "./commands/studio";

let output: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext): void {
  output = vscode.window.createOutputChannel("ExpressoTS");
  context.subscriptions.push(output);

  context.subscriptions.push(
    vscode.commands.registerCommand("expressots.generate", () =>
      generateCommand(output),
    ),
  );

  context.subscriptions.push(
    vscode.commands.registerCommand("expressots.studio", () => studioCommand()),
  );

  createStudioStatusBar(context);
}

export function deactivate(): void {
  // disposables cleaned via context.subscriptions
}
