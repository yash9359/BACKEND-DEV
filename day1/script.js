
var  arr = [1,2,3,4];

// arr.forEach(function(val){
    
//     console.log(val+" hello")
// }) 


// let  newArr =   arr.map(function(val){

//     return val*3;
// });

// console.log(newArr);


// //filter

// let newArray = arr.filter(function(val){
//     return val>=3 ? true :false;
// });
// console.log(newArray);


//// array mai kuch bhi  dhuddhna find dega dhudh ke

// arr.find(function(val){
//     if(val===2){
//         console.log(val);
//         return val;
//     }
// });


//// index off = indexOf

// ye find ki tarah hota hai Element daloo index dega agar hoga tooo nahi to -1 dega

// let obj = {
//     name : "yash",
//     age:35
// }

// console.log(obj.name,obj.age);

// /// hmm freeze bhi kar sakte agar kisi ko  value dalne se banacahna hai

// Object.freeze(obj)



// obj.age = 25;
// console.log(obj.name,obj.age);


// fn ki length no's of parameter hoti hai
// function abcd(a,b,c){

//     return 12;

// }


// let blob =  await fetch("https://randomuser.me//api?gender=female");
// console.log(blob.json());

async function nameh() {

    let find = await fetch(`https://randomuser.me//api?gender=female`);
    let Data = await find.json();
    console.log( Data);
    console.log(Data.results)
    
}

nameh();
