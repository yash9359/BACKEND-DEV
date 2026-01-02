
// function add(a,b){
//     return a+b;
// }

// //// custom  banayi hai library hai  abhi private hai isse export karna padega

// // // ye module math koo YAsh bana doo
// // module.exports = "Yash"

// function sub(a,b){
//     return a-b;
// }

// module.exports = {
//     addFn: add,
//     subFn: sub
// }



/// another method of export by using exports method ka use kar lo

exports.add = (a,b)=> a+b;
exports.sub = (a,b)=>a-b;
