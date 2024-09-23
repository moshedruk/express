import express from 'express';
import fs from 'fs/promises'
import {v4} from 'uuid'

const app = express();
const port = 7000




app.use(express.json())

app.get("/amn", async(req,res) =>{
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
app.get("/amn/sum" ,async (req,res) =>{
    try{
        const data = JSON.parse (await fs.readFile("./data.json",'utf8'))    
        const result = data.reduce((obj,cur) =>{
            cur.active && obj.active++
            cur.status && obj.in_stoock++
            return obj
        }
        ,
        {
            active:0,
            in_stoock:0
        })

        result.sum = data.length
        res.json(result)
    }
    catch (arr){
        console.log(arr)
        res.status(500).json({
            arr: true,
            massage: arr
        })
    }
})

app.get("/amn/:id", async(req,res)=>{
    try{
    const data = JSON.parse (await fs.readFile("./data.json",'utf8'))    
    const dataBiId = data.find(am => am.id === req.params.id)    
    res.json((dataBiId))
    }
    catch (arr){
        console.log(arr)
        res.status(500).json({
            arr: true,
            massage: arr
        })
    }        
})


app.post("/amn", async(req,res)=>{
    try {
    const data = JSON.parse (await fs.readFile("./data.json",'utf8')) 
    const newItem = {   
        id: v4(), 
        ...req.body        
    }
    data.push(newItem)
    await fs.writeFile('./data.json',JSON.stringify(data),{
        encoding:'utf-8'
    })       
    res.json(req.body.type)
    } catch (err) {
        console.log(arr)
        res.status(500).json({
            arr: true,
            massage: arr
        })
    }   

}); 
app.patch("/amn/:id",async(req,res)=>{    
        try {
        const data = JSON.parse (await fs.readFile("./data.json",'utf8')) 
        const index = data.findIndex(am => am.id === req.params.id) 
        data[index] = { ...data[index], ...req.body };
        
        await fs.writeFile('./data.json',JSON.stringify(data),{
            encoding:'utf-8'
        })       
        res.json(data[index])
        }
        catch (err) {
            console.log(arr)
            res.status(500).json({
                arr: true,
                massage: arr
            })
        }      
})       
       
app.put("/amn/:id",async (req,res) => {
    try {
        const data = JSON.parse (await fs.readFile("./data.json",'utf8')) 
        const index = data.findIndex(am => am.id === req.params.id) 
        data[index] = {...req.body };
        
        await fs.writeFile('./data.json',JSON.stringify(data),{
            encoding:'utf-8'
        })       
        res.json(data[index])
        }
        catch (err) {
            console.log(arr)
            res.status(500).json({
                arr: true,
                massage: arr
            })
        }      
})
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
