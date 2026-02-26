import http from "http";
import fs from "fs/promises"
const port=5001;
const users=[];
async function saveData(user){
    try{
       const resdata=await fs.writeFile("data.json",JSON.stringify(user));
       console.log(resdata)
    }
    catch(err){
        console.log("Error=",err.message)
    }
}
async function readData(){
    try{
    const data=await fs.readFile("data.json","utf-8");
    const parsedata=JSON.parse(data);
    users.push(parsedata);
    }
    catch(err){
    console.log("Error=",err.message)
    }
}
const server=http.createServer(async(req,res)=>{
const url=req.url;
const method=req.method;
await readData();
if(url=="/users" && method=="GET"){
    res.end(JSON.stringify(users))
}
else if(url.startsWith("/users/") && method=="GET"){
    const id=url.split("/")[2];
    const user=users.find(u=>u.id==id);
    if(!user){
        res.statusCode=400;
        console.log(`user id ${id} not found`)
        return res.end(`user id ${id} not found`)
    }
    console.log(`user id ${id} found`)
    res.end(JSON.stringify(user))
}
else if(url.startsWith("/users/") && method=="PUT"){
   const id=url.split("/")[2];
   let body="";
   req.on("data",(chunk)=>{
    body=body+chunk;
   })
   req.on("end",async()=>{
    const userIndex=users.findIndex(u=>u.id==id);
   if(userIndex==-1){
    res.statusCode=400;
    console.log(`user id ${id} not found`)
    return res.end(`user id ${id} not found`)
   }
   const updateddata=JSON.parse(body);
   users[userIndex]={...users[userIndex],...updateddata};
   await saveData(users);
   console.log(`user id ${id} updated successfully`)
   res.end(`user id ${id} updated successfully`)
   })
   
}

else if(url.startsWith("/users/") && method=="DELETE"){
    const id=url.split("/")[2];
    const userIndex=users.findIndex(u=>u.id==id);
    if(userIndex==-1){
        res.statusCode=400;
        console.log(`user id ${id} not found`);
        return res.end(`user id ${id} not found`)
    }
    users.splice(userIndex,1);
    await saveData(users);
    console.log(`user id ${id} deleted successfully`)
    res.end(`user id ${id} deleted successfully`)
}
else if(url=="/createuser" && method=="POST"){
    let body="";
    req.on("data",(chunk)=>{
     body=body+chunk;
    })
    req.on("end",async()=>{
        const data=JSON.parse(body);
         if(data.name==null || data.email==null){
            res.statusCode=400;
             return res.end(`user name or email is empty`)
        }
        const newUser={
            id: Date.now(),
            name: data.name,
            email: data.email
        }
       
        users.push(newUser);
        await saveData(users);
        res.statusCode=201;
        console.log(`user id ${newUser.id} created successfully`)
        res.end(`user id ${newUser.id} created successfully`)
    })

}
else{
    res.statusCode=404;
    res.end("Error Page")
}
})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})