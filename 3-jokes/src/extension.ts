// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import axios from "axios";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "2-jokes" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	const disposable = vscode.commands.registerCommand('2-jokes.helloWorld', () => {
		let url: string;
		vscode.window.showQuickPick(["Chuck", "Dev"], {
			placeholder: "Kind of joke?",
			canPickMany: false
		} as const).then((result) => {
			if (result === undefined) return; // utilisateur a annulé

			let url: string;
			if (result === "Chuck")
				url = "https://api.chucknorris.io/jokes/random";
			else
				url = "https://v2.jokeapi.dev/joke/Programming?format=txt&type=single";

			axios.get(url).then((response) => {
				vscode.window.showInformationMessage(response.data.value ?? response.data);
			})
			.catch((error: Error) => {
				vscode.window.showErrorMessage(`Erreur : ${error}`);
			});
		})

	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
