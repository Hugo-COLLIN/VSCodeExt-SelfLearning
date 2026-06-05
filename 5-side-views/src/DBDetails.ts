import * as vscode from "vscode";
import { MyDBItem } from "./DBData-TreeProvider";

export class DBDetails implements vscode.WebviewViewProvider {

    private _view?: vscode.WebviewView;

    resolveWebviewView(webviewView: vscode.WebviewView, context: vscode.WebviewViewResolveContext, token: vscode.CancellationToken): Thenable<void> | void {
        this._view = webviewView;
    }

    openDetails(db: MyDBItem) {
        if (this._view) {
            this._view.webview.html = `
            <html>
                <body>
                    <p>Host: ${db.host}
                </body>
            </html>
            `
        }
    }
}