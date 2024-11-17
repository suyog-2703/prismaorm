import express from "express";
import "dotenv/config";
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended:false}));
const PORT=process.env.PORT || 8000
app.get("/", (req,res)=>{
    return res.json({message:'Hello Prisma ORM'})
});

import ApiRouter from './routes/api.js'
app.use('/api', ApiRouter)

app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`))