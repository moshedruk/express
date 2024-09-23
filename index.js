import express from 'express';
import fs from 'fs/promises'

const app = express();
const port = 7000










app.get("/amn" , async(req,res) =>{
    try{
        const deta = await fs.readFile("./data.json",'utf8')
        res.json(JSON.parse(deta));
    }
    catch (arr){
        res.status(500).json({
            arr: true,
            massage: arr
        })
    }    
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
