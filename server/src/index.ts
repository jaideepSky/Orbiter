import "dotenv/config";
import express from "express";
import prisma from "./lib/prisma.ts";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.ts";
import cors from "cors";

const PORT = process.env.PORT;
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "DELETE", "POST"],
    credentials: true,
  }),
);
app.all("/api/auth/*splat", toNodeHandler(auth));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello Orbiter");
});
app.get("/device" , async(req , res)=>{
  const {user_code} = req.query
  res.redirect(`http://localhost:3000/device?user_code=${user_code}`)
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

app.listen(PORT, () => {
  console.log(`Orbiter is listening at PORT:${PORT}✅`);
});
