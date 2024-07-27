const mongoose = require('mongoose');
require('dotenv').config();
exports.dbConnect = ()=> mongoose.connect(process.env.DB_URL).then(()=>console.log("db connected"))
        .catch((error)=>{
            console.error(error);
            process.exit(1)
        })