import * as vscode from 'vscode';
import { DBDataTreeProvider } from './DBData-TreeProvider';

export function activate(context: vscode.ExtensionContext) {
	// Lier l'id db-list du package.json au DBDataTreeProvider que l'on a créé
	const egTreeView = vscode.window.createTreeView('eg-list', {
		treeDataProvider: new DBDataTreeProvider()
	});

	//DB View
	const dbTreeView = vscode.window.createTreeView('db-list', {
		treeDataProvider: new DBDataTreeProvider()
	});
}

export function deactivate() {}
