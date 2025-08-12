@@ .. @@
 import express from "express";
 import fetch from "node-fetch";
 import dotenv from "dotenv";
 import cors from "cors";
 import multer from "multer";
 import fs from "fs";
 
 dotenv.config();
 const app = express();
@@ .. @@
 // --------------------- IMAGE GENERATION (AI) ---------------------
app.post("/generate-image", async (req, res) => {
}
)
+app.post("/generate-image", ClerkExpressRequireAuth(), async (req, res) => {
   const { prompt } = req.body;
}
)
 
   if (!prompt) {
     return res.status(400).json({ error: "Prompt is required" });
   }
 
   try {
     const response = await fetch(
       "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
     )
   }