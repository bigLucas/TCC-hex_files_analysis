import { HexFile } from "./HexFile";

const OLD_DATA = HexFile.getDataFromHexFile();
const NEW_DATA = HexFile.getDataFromHexFile('geracao_de_hex_files-V1.ino.hex');

let diferences: {index: number, newData: string, oldData: string}[] = [];

for (let i=0; i<NEW_DATA.length; i++) {
    if (NEW_DATA[i] !== OLD_DATA[i]) {
        diferences.push({index: i, newData: NEW_DATA[i].toString(16).toUpperCase(), oldData: OLD_DATA[i].toString(16).toUpperCase()});
    }
}
console.log(diferences);
diferences.map((element) => {
    console.log(`new FlashMemoryHex(${element.index}, 0x${element.newData}),`);
});