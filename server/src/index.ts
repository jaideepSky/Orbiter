import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
const app = express()
const PORT = process.env.PORT
app.get('/' , (req ,res)=>{
    res.send("Hello Orbiter")
})

app.listen(PORT , ()=>{
    console.log(`Orbiter is listening at PORT:${PORT}✅`)
})