import { Command } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { auditCommand } from "./command/audit";
export function getPackageJson() {
    let dirname;
    try {
        // for test as we cannot use import.meta.url in Jest
        dirname = __dirname;
    }
    catch (_a) {
        const __filename = fileURLToPath(import.meta.url);
        dirname = path.dirname(__filename);
    }
    const filePath = path.resolve(dirname, "../package.json");
    const data = readFileSync(filePath, "utf-8");
    const packageJson = JSON.parse(data);
    return packageJson;
}
function init() {
    const pkg = getPackageJson();
    const commander = new Command();
    commander.version(pkg.version, "-v, --version");
    commander
        .command("audit")
        .description("ai audit")
        .option("-d, --directory <directory>", "Specify a directory to list files from")
        .action(() => {
        // Use provided directory or default to current working directory
        const directory = commander.opts().directory || process.cwd();
        console.log("Running audit process...");
        auditCommand(directory);
    });
    commander
        .command("build")
        .description("build")
        .action(() => {
        console.log("Running build process...");
    });
    commander
        .command("deploy")
        .description("deploy")
        .action(() => {
        console.log("Running deploy process...");
    });
    commander
        .command("export")
        .description("export")
        .action(() => {
        console.log("Running export process...");
    });
    commander.parse(process.argv);
}
function run() {
    init();
}
export { run };
