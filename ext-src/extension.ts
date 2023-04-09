import * as vscode from 'vscode';
import { CommandRegister } from '../ext-src/CommandRegister';

export function deactivate() {}

export function activate(context: vscode.ExtensionContext) {
	const commands = new CommandRegister(context);
	commands.initializeCommands();
}
