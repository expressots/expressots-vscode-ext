import * as vscode from 'vscode';
import { ContextualMenu } from './resources/contextualMenu/ContextualMenu';
import { SmartComments } from './resources/smartComments/SmartComments';
import { ReactPanel } from './resources/createProject/ReactPanel';


export class CommandRegister {
	private static _context: vscode.ExtensionContext;

	constructor(context: vscode.ExtensionContext) {
		CommandRegister._context = context;
	}

	// Initialize all commands
	public initializeCommands(): void {
		this.smartCommentsActivation();
		this.registerCommands(CommandRegister._context);
	}

	private smartCommentsActivation(): void {
		let smartComment = new SmartComments(CommandRegister._context);
		smartComment.activateSmartComments();
	}

	private registerCommands(context: vscode.ExtensionContext): void {
		context.subscriptions.push(vscode.commands.registerCommand('expressots.service', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'service');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.controller', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'controller');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.dto', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'dto');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.module', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'module');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.provider', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'provider');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.usecase', async (uri: vscode.Uri) => {
			ContextualMenu.init(uri, 'usecase');
		}));

		context.subscriptions.push(vscode.commands.registerCommand('expressots.create', async () => {
			ReactPanel.createOrShow(context.extensionPath);
		}));
	}	
}