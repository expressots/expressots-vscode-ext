import { spawn, SpawnOptionsWithoutStdio } from "child_process";
import * as vscode from "vscode";

export interface RunCliResult {
  code: number | null;
  stdout: string;
  stderr: string;
}

export function runCli(
  command: string,
  args: string[],
  cwd: string,
  output?: vscode.OutputChannel,
): Promise<RunCliResult> {
  return new Promise((resolve) => {
    const options: SpawnOptionsWithoutStdio = {
      cwd,
      env: { ...process.env, NO_COLOR: "1" },
      shell: process.platform === "win32",
    };

    output?.appendLine(`$ ${command} ${args.join(" ")}`);

    const child = spawn(command, args, options);
    let stdout = "";
    let stderr = "";

    child.stdout.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stdout += text;
      output?.append(text);
    });
    child.stderr.on("data", (chunk: Buffer) => {
      const text = chunk.toString();
      stderr += text;
      output?.append(text);
    });
    child.on("error", (err) => {
      stderr += err.message;
      output?.appendLine(err.message);
      resolve({ code: 1, stdout, stderr });
    });
    child.on("close", (code) => {
      resolve({ code, stdout, stderr });
    });
  });
}
