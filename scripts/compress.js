const AdmZip = require("adm-zip");
const path = require("path");

const packageFilePath = path.resolve(__dirname, "../package.json");
const packageJSON = require(packageFilePath);
const distFolderPath = path.resolve(__dirname, "../dist");

function addZero(num) {
  return num < 10 ? "0" + num : num;
}
let name = packageJSON.name;
let version = packageJSON.version;
let date = new Date();
let time =
  "" +
  date.getFullYear() +
  addZero(date.getMonth() + 1) +
  addZero(date.getDate()) +
  addZero(date.getHours()) +
  addZero(date.getMinutes());

function createZipArchive() {
  const zip = new AdmZip();
  const outputFile = `${name}_v${version}.${time}.zip`;
  zip.addLocalFolder(distFolderPath);
  zip.writeZip(outputFile);
  console.log(`[info] created ${outputFile} successfully`);
}

createZipArchive();