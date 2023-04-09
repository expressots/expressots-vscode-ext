import * as vscode from 'vscode';
import * as fs from 'fs';

export function getWebviewHTML(title: string, cspSource: string, ...content: vscode.Uri[]): string {
    let html = fs.readFileSync(content[0].fsPath, "utf8"); 
    // Replace html content
    html = html.replace(`{{webviewTitle}}`, title);
    html = html.replace(`{{script}}`, content[1].toString());
    html = html.replace(`{{stylecss}}`, content[2].toString());
    html = html.replace(`{{vscodecss}}`, content[3].toString());
    html = html.replace(`{{banner}}`, content[4].toString());
    html = html.replace(/{{cspSource}}/g, cspSource);    
    return html;
}
