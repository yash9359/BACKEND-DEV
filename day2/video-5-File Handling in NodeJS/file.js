///// file handling

//file handling ka matlb  files ke sath work krna
// means file ko crete karna write karna and all
// files ke sat kaam karne ke liye fs module vchahye hota hai

const fs  = require("fs");

// create file;/// write file overwrite karta hai
// syncronus call;
// fs.writeFileSync('./test.txt','Hello world')

// Asyncronus file
// fs.writeFile("./test.txt","naya World",(err)=>{

// })



///// reading a file(notes mai notes hai iske)

// syncrons wala hmeee sidhee file ka variable return karta koi call back ki zarrorat nahi hoti hai
// const result =fs.readFileSync("./contacts.txt",'utf-8');
// console.log(result);


// Asyncronus mai callback dena zaroori hota hai , ye kuch return nahi karta 
// const result =fs.readFile("./contacts.txt",'utf-8',(err,result)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(result);
//     }
// });



/// append data on file
//syncronus
// toLocalString string maibadlta object ko
// ye file ko  overwrite nahi karta hai
// fs.appendFileSync("./test.txt",new Date().getDate().toLocaleString());
// fs.appendFileSync("./test.txt",`${Date.now()} hey there how Are You\n`);

// fs.cpSync("./test.txt","./copy.txt");

// delete a file =unlink
// copy.txt deleted bro
// fs.unlinkSync("./copy.txt");

/// file ka statics bhi dekh skte hoo

// fs.statSync("./test.txt");

//.isFile() se pata laga  ya ye file hai node file.js mai gives true
// console.log(fs.statSync("./test.txt").isFile());



/// make directory == folder

// fs.mkdirSync("my-docs");
fs.mkdirSync("my-docs/a/b",{recursive: true});








