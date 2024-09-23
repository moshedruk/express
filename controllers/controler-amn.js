import express from 'express';
import fs from 'fs/promises';
import {v4} from 'uuid'


const router = express.Router();

router.get("/", async(req,res) =>{
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

router.get("/sum" ,async (req,res) =>{
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

router.get("/:id", async(req,res)=>{
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


router.post("/", async(req,res)=>{
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
router.patch("/:id",async(req,res)=>{    
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
       
router.put("/:id",async (req,res) => {
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

export default router;