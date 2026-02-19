import http from "http";
const port=5001;
const users=[
    {id:1,name:"ABC",email:"abc@gmail.com"},
    {id:2,name:"ABC1",email:"abc1@gmail.com"}
]
const server=http.createServer((req,res)=>{
      const url=req.url;
      const method=req.method;
      if(url=="/" && method=="GET"){
        res.end("Home Page");
      }
      else if(url=="/users" && method=="GET"){
        res.end(JSON.stringify(users));
      }
      else if(url=="/users" && method=="GET"){
        res.end(JSON.stringify(users));
      }
      else if(url.startsWith("/users/") && method=="GET"){
        const id=url.split("/")[2];
        const user=users.find(u=>u.id==id);
        console.log("Data Found",user);
        if(!user){
            res.statusCode=404;
            return res.end("user not found")
        }
        res.end(JSON.stringify(user));
      }
      else if(url=="/createuser" && method=="POST"){
        res.statusCode=201;
        res.end("Create User");
      }
      else if(url.startsWith("/users/") && method=="PUT"){
        res.end("Edit User");
      }
      else if(url.startsWith("/users/") && method=="DELETE"){
        const id=url.split("/")[2];
        const userindex=users.findIndex(u=>u.id==id);
        if(userindex==-1){
            res.statusCode=400;
            return res.end(id+" user not found");
        }
        users.splice(userindex,1);
        console.log(id," User Deleted Successfully")
        res.end(id+"User Deleted Successfully");
      }
      else{
        res.statusCode=404;
        res.end("Error Page")
      }

})
server.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})