import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const output = vscode.window.createOutputChannel("ExpressoTS");
  context.subscriptions.push(output);
}

export function deactivate(): void {
  // disposables cleaned via context.subscriptions
}
