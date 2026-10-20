import express from 'express'
import dotenv from 'dotenv'
import prisma from './lib/prisma.ts'
dotenv.config()
const app = express()
const PORT = process.env.PORT
app.get('/' , (req ,res)=>{
    res.send("Hello Orbiter")
})

app.get("/db-test", async (_req, res) => {
  try {
    const users = await prisma.user.findMany();

    res.status(200).json({
      success: true,
      message: "Neon database connected successfully!",
      users,
    });
  } catch (error) {
    console.error("Database test failed:", error);

    res.status(500).json({
      success: false,
      message: "Database query failed",
    });
  }
});

app.listen(PORT , ()=>{
    console.log(`Orbiter is listening at PORT:${PORT}✅`)
})