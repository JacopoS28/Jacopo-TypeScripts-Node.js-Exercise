/* Use a method with callbak */

const fs = require('fs');

const filePath = 'output.txt';
const fileContent = 'This is the content of the file.\n';

fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
        console.error(`Error writing to file: ${err}`);
    } else {
        console.log(`File has been successfully written: ${filePath}`);
    }
});
