const fs = await import('fs');
async function readFile(name) {
    try {
        const parsedFile = await fs.promises.readFile(`./data/${name}.json`, 'utf-8');
        return parsedFile ? JSON.parse(parsedFile) : [];
    }
    catch (err) {
        console.error('error at fileReader: ', err);
        return [];
    }
}
const lessons = await readFile('lessons');
const users = await readFile('users');
export { lessons, users };
//# sourceMappingURL=fileReader.js.map