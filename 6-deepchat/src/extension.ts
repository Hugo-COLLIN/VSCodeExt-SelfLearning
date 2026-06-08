import * as vscode from 'vscode';
import ollama from 'ollama';

export function activate(context: vscode.ExtensionContext) {
	const disposable = vscode.commands.registerCommand('6-deepchat.start', () => {
		const panel = vscode.window.createWebviewPanel(
			"DeepChat",
			"Deep Chat",
			vscode.ViewColumn.One,
			{ enableScripts: true }
		)

		panel.webview.html = webviewContent();

		panel.webview.onDidReceiveMessage(async (message: any) => {
			if (! (message.command === "chat")) return;
			
			const userPrompt = message.text
			let responseText = ""

			try {
				const streamResponse = await ollama.chat({
					model: 'deepseek-r1:7b', // :latest
					messages: [{ role: "user", content: userPrompt }],
					stream: true
				})

				for await (const part of streamResponse) {
					responseText += part.message.content
					panel.webview.postMessage({ command: "chatResponse", text: responseText })
				}
			}
			catch (error) {
				panel.webview.postMessage({ command: "chatResponse", text: `Error: ${String(error)}` })
			}
		})
	});

	context.subscriptions.push(disposable);
}

function webviewContent(): string {
	return /*html*/`
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8"/>
		<style>
			body { font-family: sans-serif, margin: 1rem }
			#prompt { width: 100%; box-sizing: border-box; }
			#response { border: 1px solid #ccc; margin-top: 1rem; padding: 0.5rem;}
		</style>
	</head>
	<body>
		<h2>Deep Chat - VSCode Extension</h2>
		<textarea id="prompt" rows="3", placeholder="Ask something..."></textarea><br>
		<button id="askBtn">Ask</button>
		<div id="response"></div>

		<script>
			const vscode = acquireVsCodeApi();

			document.querySelector("#askBtn").addEventListener("click", () => {
				const text = document.querySelector("#prompt").value;
				vscode.postMessage({ command: 'chat', text })
			});

			window.addEventListener('message', event => {
				const { command, text } = event.data;
				if (command === "chatResponse") {
					document.querySelector("#response").innerText = text;
				}
			})
		</script>
	</body>
	</html>
	`
}
