import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext){
    vscode.window.showInformationMessage("Begin!");

    const command = vscode.commands.registerCommand('wrapSelection.tryCatch', async () => {
        const editor = vscode.window.activeTextEditor;

        if (!editor) {
            vscode.window.showWarningMessage("No active editor found"); 
            return;
        }

        const selection = editor.selection //texte selectionne dans l'editeur
        const selectedText = editor.document.getText(selection)

        if (!selectedText || selectedText.trim().length === 0){
            vscode.window.showWarningMessage("No text selected"); 
            return;
        }

        const document = editor.document;
        const startLine = document.lineAt(selection.start);
        const indentMatch = startLine.text.match(/^(\s*)/);
        const baseIndent = indentMatch ? indentMatch[1] : "";

        const lines = selectedText.split("\n");

        let minIndent = Number.MAX_SAFE_INTEGER;
        const nonEmptyLines = lines.filter(line => line.trim().length > 0);

        nonEmptyLines.forEach(line => {
            const indentMatch = line.match(/^(\s*)/);
            if (indentMatch) minIndent = Math.min(minIndent, indentMatch[1].length);
        })

        const normalizedLines = lines.map(line =>{
            if (line.trim().length === 0) return line;
            const indentMatch = line.match(/^(\s*)/);
            if (indentMatch && indentMatch[1].length >= minIndent) 
                return line.substring(minIndent);
            return line;
        });

        const indentedLines = normalizedLines.map(line => {
            if (line.trim().length === 0) return line;
            return baseIndent + "    " + line;
        });

        const wrappedCode = `${baseIndent} try {\n`
                        + `${indentedLines.join("\n")}\n`
                        + `${baseIndent}} catch (error) {\n`
                        + `${baseIndent}    console.error(error);\n`
                        + `${baseIndent}}\n`;

        const success = await editor.edit(editBuilder => {
            editBuilder.replace(selection, wrappedCode);
        });

        if (!success) vscode.window.showErrorMessage("Failed to wrap selection")

        vscode.window.showInformationMessage("ok!")
        // vscode.window.showInformationMessage(wrappedCode)
    });

    context.subscriptions.push(command);
}