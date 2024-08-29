import { getAllFiles } from "../utils/fileContentToZip";
export var auditCommand = function (directory) {
    try {
        var files = getAllFiles(directory);
        console.log("Files found:");
        files.forEach(function (file) { return console.log(file); });
    }
    catch (error) {
        console.error("Error:", error);
    }
};
