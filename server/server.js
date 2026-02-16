import http from "http";
import os from "os";
const userdata=[];
const server=http.createServer((req,res)=>{
const url=req.url;
const method=req.method;
if(url=="/" && method=="GET"){
    res.end("Home Page")
}
else if(url=="/contact" && method=="GET"){
    res.end("Contact Page")
}
else if(url=="/system" && method=="GET"){
    const sysdata={
        platform:os.platform(),
        architecture: os.arch(),
        cpu_length: os.cpus().length,
        TotalMemory: (os.totalmem()/1024**3).toFixed(2)+"GB",
        FreeMemory: (os.freemem()/1024**3).toFixed(2)+"GB"

    }
    res.end(JSON.stringify(sysdata))
}
else if(url=="/senddata" && method=="POST"){
    let body="";
    req.on("data",(chunk)=>{
      body=body+chunk;
    })
    req.on("end",()=>{
        console.log(body,"Data send successfully")
        res.statusCode=201;
        userdata.push(body)
        res.end(JSON.stringify(userdata))
    })
}
else if(url=="/viewdata" && method=="GET"){
    res.setHeader("Content-Type","application/json")
    res.end(JSON.stringify(userdata));
}
else{
    res.statusCode=404;
    res.end("Error Page")
}
})
server.listen(5001,()=>{
    console.log(`Server is running on port 5001`)
})