const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join(__dirname, 'notes'), err => {
//     if (err) {
//         throw new Error(err);
//     }
//     console.log('The directory was created!');
// });

// fs.writeFile(
//     path.join(__dirname, 'notes', 'myNotes.txt'),
//     'Hello world',
//     (err) => {
//         if (err) {
//             throw Error(err);
//         }
//         console.log('File was created!');
        
//         fs.appendFile(path.join(__dirname, 'notes', 'myNotes.txt'),
//             '\nFrom append file',
//             (err) => {
//                 if (err) {
//                     throw new Error(err);
//                 } 
//                 console.log('File was changed!');
//                 fs.readFile(
//                     path.join(__dirname, 'notes', 'myNotes.txt'),
//                     'utf-8',
//                     (err, data) => {
//                         if (err) {
//                             throw err;
//                         }
//                         // console.log(Buffer.from(data).toString());
//                         console.log(data);
//                     }
//                 )
//             }
//         )
//     }
// );

fs.rename(
    path.join(__dirname, 'notes', 'myNotes.txt'),
    path.join(__dirname, 'notes', 'notes.txt'),
    err => {
        if (err) {
            throw err;
        }
        console.log('File was renamed!');
    }
);