const express  =require('express');
const app = express();
require('dotenv').config();
const fileUpload = require('express-fileupload');
app.use(fileUpload());
const Connection = require('./config/dbConnect').dbConnect();
app.use(express.json());
PORT = process.env.PORT || 4000
const Files  = require('./routes/Files')
app.use('/api/v1',Files)





app.get('/',(req,res)=>{
    res.send("<h1>welcome to first route</h1>")
})
app.listen(PORT ,()=>{
    console.log(`server on running on this ${PORT}`);
})