import fs from "fs/promises";
// const data=fs.readFileSync("data.txt","utf-8");
// console.log("Data=",data)
// fs.appendFileSync("data.txt","my fsd class new data");
// const data1=fs.readFileSync("data.txt","utf-8");
// console.log("Data=",data1)
// fs.unlinkSync("data.txt")

// fs.readFile("data.txt","utf-8",(err,data)=>{
// if(err){
//     console.log("Error",err.message)
// }
// else
// console.log("Data=",data)
// })
// const mydata="/n new line data";
// fs.writeFile("data.txt",mydata,(err,data)=>{
// if(err){
//    console.log("Error",err.message)
// }
// else{
// console.log("Data written successfully")
// }

// })

async function readData(){
    try{
     const data=await fs.readFile("data.txt","utf-8")
     console.log("Data=",data);
    }
    catch(err){
        console.error("Error: ",err.message)
    }
}
readData();
async function saveData(mydata){
    try{
       await fs.writeFile("data.txt",mydata);
       console.log(`Data writing successfully `)
    }
    catch(err){
       console.error("Error: ",err.message)
    }
}
const mydata="js class data";
saveData(mydata);
readData();