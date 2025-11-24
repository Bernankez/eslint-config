import { spawn } from "node:child_process";
import process from "node:process";

function main(): void {
  // 获取所有命令行参数（排除 node 和脚本路径）
  const args = process.argv.slice(2);

  const child = spawn("npx", ["@antfu/eslint-config", ...args], {
    stdio: "inherit", // 继承标准输入输出，支持交互式操作
    shell: true, // 使用 shell 执行命令
  });

  child.on("exit", (code) => {
    process.exit(code || 0);
  });

  child.on("error", (err) => {
    console.error("Error executing @antfu/eslint-config:", err);
    process.exit(1);
  });
}

main();
