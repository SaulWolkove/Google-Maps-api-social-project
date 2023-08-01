const express = require("express");
const dotenv = require("dotenv")
//const morgan = require("morgan");
const cors = require("cors");
const router = require("./router")
const mongoose = require("mongoose");
const fileUpload = require("express-fileupload");
const fs = require("fs");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
dotenv.config();
const app = express();

app.use(express.json())
//app.use(morgan("tiny"));
app.use(cors());
app.use(fileUpload())


//upload endpoint
app.post("/upload", (req,res)=>{
    if (req.files.file === null){
        return res.status(400).json({msg: "No File Uploaded"})
    }

    const file = req.files.file;

    let directory = __dirname
    directory = directory.slice(0,-6)
    const folder = file.name.slice(0,-4)

    fs.mkdir(`${directory}/client/src/components/UserImages/${folder}`, (err)=>{
        console.log(err)
    })
    file.mv(`${directory}/client/src/components/UserImages/${folder}/${file.name}`, err => {
        if(err){
            console.error(err);
            return res.status(500).send(err)
        }
        res.json({fileName: file.name, filePath: `/photoUploads/${file.name}`})
    })
})
//app.use(notFound)
//app.use(errorHandler)

app.use(router);
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log("mongoose is working, listening on port 3001")
})


app.listen(3001);