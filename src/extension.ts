import * as vscode from "vscode";
import { generateCommand } from "./commands/generate";

let output: vscode.OutputChannel;

export function activate(context: vscode.ExtensionContext): void {
  output = vscode.window.createOutputChannel("ExpressoTS");
  context.subscriptions.push(output);

  context.subscriptions.push(
    vscode.commands.registerCommand("expressots.generate", () =>
      generateCommand(output),
    ),
  );
}

export function deactivate(): void {
  // disposables cleaned via context.subscriptions
}
