import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
    vscode.window.showInformationMessage("Begin!");

    const command = vscode.commands.registerCommand('wrapSelection.tryCatch', async () => {
        vscode.window.showInformationMessage("Hello!");
    });

    context.subscriptions.push(command);
}