import http from 'http';
import os, { arch } from 'os';
let body="";
let data=[];
const server=http.createServer((req,res)=>{
    const url=req.url;
    
    if(url=="/" && req.method=="GET"){
        res.write("<h1>Home Page</h1>")
    }
    else if(url=="/about" && req.method=="GET"){
        res.write("<h1>About Page1</h1>")
    }
    else if(url=="/contact"&& req.method=="GET"){
        res.write("<h1>Contact Page</h1>")
    }
    else if(url=="/senddata"&& req.method=="POST"){
        
        req.on("data",(chunk)=>{
            body=body+chunk;
        })
        req.on("end",()=>{
            console.log(body," data recived ");
            data.push(body);
            res.end(body+" data recived");
        })
    }
    else if(url=="/viewdata"&& req.method=="GET"){
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(data))
    }
    else if(url=="/system"&& req.method=="GET"){
        const sysdata={
            platform: os.platform(),
            arch: os.arch(),
            cpu: os.cpus().length,
            totalRam:(os.totalmem()/1024**3).toFixed(2)+"GB",
            freemem: (os.freemem()/1024**3).toFixed(2)+"GB"
        }
        res.setHeader("Content-Type","application/json")
        res.end(JSON.stringify(sysdata))
    }
    else{
        res.statusCode=404;
        res.end("Error Page")
    }
    
})

server.listen(4001,()=>{
    console.log("Server is running on port 4001")
})