import { Command } from "commander";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import path from "path";
import { auditCommand } from "./command/audit";
export function getPackageJson() {
    var dirname;
    try {
        // for test as we cannot use import.meta.url in Jest
        dirname = __dirname;
    }
    catch (_a) {
        var __filename_1 = fileURLToPath(import.meta.url);
        dirname = path.dirname(__filename_1);
    }
    var filePath = path.resolve(dirname, "../package.json");
    var data = readFileSync(filePath, "utf-8");
    var packageJson = JSON.parse(data);
    return packageJson;
}
function init() {
    var pkg = getPackageJson();
    var commander = new Command();
    commander.version(pkg.version, "-v, --version");
    commander
        .command("audit")
        .description("ai audit")
        .option("-d, --directory <directory>", "Specify a directory to list files from")
        .action(function () {
        // Use provided directory or default to current working directory
        var directory = commander.opts().directory || process.cwd();
        console.log("Running audit process...");
        auditCommand(directory);
    });
    commander
        .command("build")
        .description("build")
        .action(function () {
        console.log("Running build process...");
    });
    commander
        .command("deploy")
        .description("deploy")
        .action(function () {
        console.log("Running deploy process...");
    });
    commander
        .command("export")
        .description("export")
        .action(function () {
        console.log("Running export process...");
    });
    commander.parse(process.argv);
}
function run() {
    init();
}
export { run };
