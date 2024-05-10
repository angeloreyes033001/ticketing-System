require('dotenv').config();
const http = require('http');
const express = require('express');
const bodyParse = require('body-parser');
const cookieParse = require('cookie-parser');
const cors = require('cors');
const router = require('./routers/routers');
const errors = require('./utils/errors');
const InitializeSocket = require('./socket');
const bycrpt = require('bcrypt');
const app = express();

app.use(cors({
    credentials:true,
    origin: "http://localhost:5173",
}))

app.use(bodyParse.urlencoded({extended:true}));
app.use(bodyParse.json());
app.use(express.json());
app.use(cookieParse())
app.use('/api',router);

const server = http.createServer(app);
InitializeSocket(server)

server.listen(process.env.PORT,()=>{
    try {
        console.log(`PORT: ${process.env.PORT}`) 
    } catch (error) {
        errors.TryCatchError(error)
    }
});