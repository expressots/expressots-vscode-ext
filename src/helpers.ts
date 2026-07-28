import * as fs from "fs";
import * as path from "path";

export const SCHEMATICS = [
  "usecase",
  "controller",
  "dto",
  "service",
  "provider",
  "entity",
  "module",
  "middleware",
  "interceptor",
  "event",
  "handler",
  "guard",
  "config",
] as const;

export type Schematic = (typeof SCHEMATICS)[number];

/** Walk up from startDir looking for expressots.config.ts. */
export function findExpressotsConfig(startDir: string): string | undefined {
  let current = path.resolve(startDir);
  const root = path.parse(current).root;

  while (true) {
    const candidate = path.join(current, "expressots.config.ts");
    if (fs.existsSync(candidate)) {
      return candidate;
    }
    if (current === root) {
      return undefined;
    }
    current = path.dirname(current);
  }
}

/** Prefer local node_modules/.bin, then PATH binaries. */
export function resolveExBinary(workspaceRoot: string): {
  command: string;
  argsPrefix: string[];
} {
  const localEx = path.join(
    workspaceRoot,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "ex.cmd" : "ex",
  );
  if (fs.existsSync(localEx)) {
    return { command: localEx, argsPrefix: [] };
  }

  const localExpressots = path.join(
    workspaceRoot,
    "node_modules",
    ".bin",
    process.platform === "win32" ? "expressots.cmd" : "expressots",
  );
  if (fs.existsSync(localExpressots)) {
    return { command: localExpressots, argsPrefix: [] };
  }

  return {
    command: process.platform === "win32" ? "npx.cmd" : "npx",
    argsPrefix: ["--yes", "ex"],
  };
}

/**
 * File basename pattern the CLI writes: `{name}.{schematic}.ts`
 * Name may include path segments (e.g. `user/create`).
 */
export function expectedGeneratedGlob(
  schematic: Schematic,
  name: string,
): string {
  const base = path.basename(name);
  const fileSchematic = schematic === "service" ? "controller" : schematic;
  return `**/${base}.${fileSchematic}.ts`;
}
