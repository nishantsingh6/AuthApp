const express = require('express');
const app = express();
const cors = require('cors');

//cookie parser
const cookieParser = require('cookie-parser');
app.use(cookieParser());

 app.use(express.json());
const allowedOrigins = ['https://auth-app-bmpl.onrender.com'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

 require('dotenv').config();


 const db = require('../AuthApp/config/dataBase');
db();

const port  = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`App is running on  ${port} number`);
});


app.get("/", (req,res) => {
    res.send("Hello");
});

const routers = require("../AuthApp/routes/routes");

app.use("/api/v1/authApp", routers);
