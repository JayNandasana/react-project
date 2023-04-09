import express from "express";
import dotenv from "dotenv";
import Router from "./routes/route.js";
import cors from 'cors';
import bodyParser from "body-parser";

import Connection from "./database/db.js";

const app = express();

dotenv.config();
 
app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json({extended:true}));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);

const PORT = 8000; 

const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);

app.listen(PORT,()=>console.log("http://localhost:8000/"));
