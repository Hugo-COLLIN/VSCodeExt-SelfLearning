import * as vscode from 'vscode';
import { DBDataTreeProvider } from './DBData-TreeProvider';

export function activate(context: vscode.ExtensionContext) {
	// Lier l'id db-list du package.json au DBDataTreeProvider que l'on a créé
	const treeView = vscode.window.createTreeView('db-list', {
		treeDataProvider: new DBDataTreeProvider()
	})
}

export function deactivate() {}
