import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

class ContextualMenu {
  // TODO: REFACTOR THIS
  public static init(uri: vscode.Uri, fileType: string) {
    let pathSelected: string = uri.fsPath;
    let currentPath: string;

    vscode.window.showInputBox({ ignoreFocusOut: true, prompt: 'Type the file name', value: 'new' + '.' + fileType + '.ts' })
      .then((filename: string) => {
        const partes = path.resolve(pathSelected).split(path.sep);
        for (let i = partes.length - 1; i >= 0; i--) {
          currentPath = partes.slice(0, i + 1).join(path.sep);

          const configPath = path.join(currentPath, "expressots.config.ts");
          console.log('->', configPath)
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

            const terminal = vscode.window.createTerminal();
            terminal.show();
            terminal.sendText(`expressots generate ${fileType} ${filename}`);
          } else {
            vscode.window.showErrorMessage("No config file found, select a location with an ExpressoTS config file.");
            return;
          }
        }
      }
    );
  }
}

export { ContextualMenu };