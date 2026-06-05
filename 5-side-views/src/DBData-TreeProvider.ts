import * as vscode from "vscode";

export class DBDataTreeProvider implements vscode.TreeDataProvider<MyDBItem> {
    onDidChangeTreeData?: vscode.Event<void | MyDBItem | MyDBItem[] | null | undefined> | undefined;
    
    getTreeItem(element: MyDBItem): vscode.TreeItem | Thenable<vscode.TreeItem> {
        return Promise.resolve(element);
    }
    
    getChildren(element?: MyDBItem | undefined): vscode.ProviderResult<MyDBItem[]> {
        return Promise.resolve(dbs);
    }
}

export class MyDBItem extends vscode.TreeItem {
    constructor (
        public readonly label: string,
        public readonly host: string,
        // public readonly port: string,
        // public readonly credentials: string,
    ) {
        super(label)
    }
}

const dbs: MyDBItem[] = [
    {
        "label": "postgres",
        "host": "jdbc://sdfghjk.dfghjk"
    },
    {
        "label": "mySQL",
        "host": "jdbc://sdfghjk.dfghjk"
    },
    {
        "label": "redis",
        "host": "jdbc://sdfghjk.dfghjk"
    },
]