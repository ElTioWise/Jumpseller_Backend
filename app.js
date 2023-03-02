require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morganBody = require("morgan-body")
const loggerStream = require("./utils/handleLogger")
const dbConnect = require('./config/mongo')
const app = express();
const PORT = process.env.PORT || 3000;

const morgan = require('morgan');

app.use(cors())
app.use(express.json())

morganBody(app,{
    noColors:true,
    stream: loggerStream,
    skip : function (req, res){
        return res.statusCode < 400
    }
})
app.use(morgan())

//Rutas
app.use("/api", require("./routes"))
app.listen(PORT, ()=> console.log(`Servidor corriendo en el puerto ${PORT}`));
dbConnect()