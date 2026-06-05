import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
    vscode.window.showInformationMessage("Begin!");

    const command = vscode.commands.registerCommand('firstDisposable.showAndAsk', async () => {
        vscode.window.showInformationMessage("Hello!");

        const answer = await vscode.window.showInformationMessage("How was your day?", "Good", "Bad");
        if (answer === "Bad") vscode.window.showInformationMessage("Sorry to hear that");
        else if (answer === "Good") vscode.window.showInformationMessage("Nice to hear!");
    });

    context.subscriptions.push(command);
}