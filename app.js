// const http = require('http');

// const server = http.createServer((req , res) => {
//     console.log("Server created");
//     res.end("working");
// });

// server.listen(5000,"localhost", () => {
//     console.log("server is running on 5000no");
// })



//imports
const express = require('express');
const app = express()

// const PORT = 5000;
const PORT = process.env.port || 5000;

// const data = require("./data.js");
const mongoose = require("mongoose");
const {mongoUrl} = require("./keys");
const cors = require("cors");

const path = require("path") 

app.use(cors())

require('./models/model');
require('./models/post');

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/createpost'))
app.use(require('./routes/user'))



mongoose.connect(mongoUrl);

mongoose.connection.on("connected" , () => {
    console.log("Connected to MongoDB");
})


//serving the frontEnd
app.use(express.static(path.join(__dirname , "./frontend/build")))

app.get("*"  ,(req,res)=> {
    res.sendFile(
        path.join(__dirname , "./frontend/build/index.html"),

        function(err){
            res.status(500).send(err)
        }
    )
})




mongoose.connection.on("error" , () => {
    console.log("Not Connected to MongoDB");
})






// app.use(cors());



app.listen(PORT , ()=> {
    console.log("Server is running on "+ PORT);
});