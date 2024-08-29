import { getAllFiles } from "../utils/fileContentToZip";
export const auditCommand = (directory) => {
    try {
        const files = getAllFiles(directory);
        console.log("Files found:");
        files.forEach(file => console.log(file));
    }
    catch (error) {
        console.error("Error:", error);
    }
};
