import fs from "fs";
import path from "path";
// export function fileContentToZip(files) {
//   const zipFiles: Zippable = files.reduce((acc, { path, contents }) => {
//     acc[path] = strToU8(contents);
//     return acc;
//   }, {} as Zippable);
//   const zippedData = zipSync(zipFiles);
//   return zippedData;
// }
export function getAllFiles(dirPath) {
    let results = [];
    const list = fs.readdirSync(dirPath);
    list.forEach(file => {
        const filePath = path.join(dirPath, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            results = results.concat(getAllFiles(filePath));
        }
        else {
            results.push(filePath);
        }
    });
    return results;
}
