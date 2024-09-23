import express from 'express';

import router from './controllers/controler-amn.js'

const app = express();
const port = 7000

app.use(express.json())
app.use('/amn', router)

const mw = (req,res,next) =>{
    console.log(`${req.method}:: ${req.url} -- kkkkkkkkkkk `)
    next()
}
app.use(mw)

app.get('/', async (req,res) => {
    res.send('Hello from Express!!!');
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
