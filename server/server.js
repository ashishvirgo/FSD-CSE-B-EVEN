import http from "http";
const server=http.createServer((req,res)=>{
const url=req.url;
const data={
    name:"XYZ",
    rollno: "123"
}
if(url=="/"){
    res.write("Home Page");
}
else if(url=="/data"){
    res.setHeader("ContentType","application/json")
    res.write(JSON.stringify(data))
}
else if(url=="/about"){
    res.write("About Page");
}
else if(url=="/contact"){
    res.write("Contact Page");
}
else{
    res.write("Page not Found")
}
res.end();
})
server.listen(4001,()=>{
    console.log(`Server is running on port 4001`)
});
