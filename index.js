import express from 'express';

const app = express();
const port = 7000










app.get("/amn" ,(req,res) =>{
    res.send("Hello - World");
})

app.get("/anm/:id",(req,res)=>{
    const id = req.params.id
    res.send(`Hello - World ${id}`)    
})

app.get("/amn/sum" ,(req,res) =>{
    res.send("Hello - World");
})
app.post("/amh",(req,res)=>{

})
app.patch("/amn/:id",(req,res)=>{
    res.send("Hello - World")
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
