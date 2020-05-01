import * as fs from 'fs';

export class HexFile {
    public static getDataFromHexFile(fileName: string = 'BASE_DATA.hex'): number[] {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            const lines = data.split('\n');
            let cleanedLines: string[] = [];
            let newData: number[] = [];
            const PREFIX = '0x';
            lines.map(line => {
                cleanedLines.push(line.substring(9, (line.length - 3)));
            });
            Promise.all(cleanedLines.map(line => {
                for (let i=0; i<line.length; i+=2) {
                    newData.push(Number.parseInt(PREFIX.concat(line.charAt(i).concat(line.charAt(i+1)))));
                }
            }));
            return newData;
        } catch (err) {
            console.error(err);
        }
    }

    public static writeDataFromHexFile(fileName: string = 'BASE_DATA.hex') {
        try {
            const data = fs.readFileSync(fileName, 'utf8');
            const lines = data.split('\n');
            let cleanedLines: string[] = [];
            let newData: string[] = [];
            const PREFIX = '0x';
            lines.map(line => {
                cleanedLines.push(line.substring(9, (line.length - 3)));
            });
            Promise.all(cleanedLines.map(line => {
                for (let i=0; i<line.length; i+=2) {
                    newData.push(PREFIX.concat(line.charAt(i).concat(line.charAt(i+1))));
                }
            }));
            const file = fs.createWriteStream('BASE_DATA.ts');
            file.write('const BASE_DATA = [\n')
            newData.map((byte, index) => {
                if(index%16 === 0 && index !== 0) {
                    file.write('\n');
                }
                file.write(byte.concat(', '));
            });
            file.write('\n];');
            file.close();
        } catch (err) {
            console.error(err);
        }
    }
}
