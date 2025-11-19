import process from "node:process";
import { cac } from "cac";
import { version } from "../package.json";

function loadArgs(argv = process.argv): { [k: string]: any } {
  const cli = cac("eslint-config");
  cli.version(version).help();
  const result = cli.parse(argv);
  return result.options;
}

function main(): void {
  const args = loadArgs();

  console.log(args);
}

main();
