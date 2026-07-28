import * as assert from "assert";
import * as fs from "fs";
import * as os from "os";
import * as path from "path";
import {
  expectedGeneratedGlob,
  findExpressotsConfig,
  SCHEMATICS,
} from "../helpers";

function testFindConfig(): void {
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "ex-vscode-"));
  const nested = path.join(tmp, "a", "b");
  fs.mkdirSync(nested, { recursive: true });
  fs.writeFileSync(path.join(tmp, "expressots.config.ts"), "export default {};");

  assert.strictEqual(
    findExpressotsConfig(nested),
    path.join(tmp, "expressots.config.ts"),
  );

  const empty = fs.mkdtempSync(path.join(os.tmpdir(), "ex-vscode-empty-"));
  assert.strictEqual(findExpressotsConfig(empty), undefined);

  fs.rmSync(tmp, { recursive: true, force: true });
  fs.rmSync(empty, { recursive: true, force: true });
}

function testExpectedGlob(): void {
  assert.strictEqual(
    expectedGeneratedGlob("controller", "user"),
    "**/user.controller.ts",
  );
  assert.strictEqual(
    expectedGeneratedGlob("service", "user/create"),
    "**/create.controller.ts",
  );
  assert.strictEqual(
    expectedGeneratedGlob("usecase", "app/login"),
    "**/login.usecase.ts",
  );
}

function testSchematics(): void {
  assert.ok(SCHEMATICS.includes("guard"));
  assert.ok(SCHEMATICS.includes("config"));
  assert.strictEqual(SCHEMATICS.length, 13);
}

testFindConfig();
testExpectedGlob();
testSchematics();
console.log("ok");
