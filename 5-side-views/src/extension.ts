import * as vscode from 'vscode';
import { DBDataTreeProvider } from './DBData-TreeProvider';
import { DBDetails } from './DBDetails';

export function activate(context: vscode.ExtensionContext) {
	// --- Example TreeView ---
	// Lier l'id db-list du package.json au DBDataTreeProvider que l'on a créé
	const egTreeView = vscode.window.createTreeView('eg-list', {
		treeDataProvider: new DBDataTreeProvider()
	});

	// --- DB TreeView ---
	const dbTreeView = vscode.window.createTreeView('db-list', {
		treeDataProvider: new DBDataTreeProvider()
	});

	// --- DB WebView ---
	const dbDetails = new DBDetails();
	// Action on TreeView triggers action on WebView
	dbTreeView.onDidChangeSelection(event => {
		dbDetails.openDetails(event.selection[0]);
	});

	// Lier l'id db-details du package.json au dbDetails que l'on a créé
	const dbViewProvider = vscode.window.registerWebviewViewProvider('db-details', dbDetails);
	// Fournir la vue à VSCode
	context.subscriptions.push(dbViewProvider);
}

export function deactivate() {}
