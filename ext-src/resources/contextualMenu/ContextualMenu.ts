import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

class ContextualMenu {
  public static init(uri: vscode.Uri, fileType: string) {
    let pathSelected: string = uri.fsPath;
    let currentPath: string;

    vscode.window.showInputBox({ ignoreFocusOut: true, prompt: 'Type the file name', value: 'new' + '.' + fileType + '.ts' })
      .then((filename) => {
        const partes = path.resolve(pathSelected).split(path.sep);
        for (let i = partes.length - 1; i >= 0; i--) {
          currentPath = partes.slice(0, i + 1).join(path.sep);

          const configPath = path.join(currentPath, "expressots.config.ts");
          const exists = fs.existsSync(configPath);

          if (exists) {
            if (typeof (filename) === undefined || filename === '') {
              vscode.window.showErrorMessage('Please input a valid name or press Scape to cancel the operation!');
              return this.init(uri, fileType);
            }

            let newFilePath = pathSelected + path.sep + filename;

            if (fs.existsSync(newFilePath)) {
              vscode.window.showErrorMessage(`File ${filename} already exist`);
              return;
            }

            const dir = path.normalize(currentPath).split(path.sep).join('/');
            const terminal = vscode.window.activeTerminal || vscode.window.createTerminal();
            terminal.show();
            terminal.sendText(`cd ${dir}`);
            terminal.sendText(`expressots generate ${fileType} ${filename}`);
            return;
          } 
        }
        vscode.window.showErrorMessage("No config file found, select a location with an ExpressoTS config file.");
        return;
      }
    );
  }
}

export { ContextualMenu };