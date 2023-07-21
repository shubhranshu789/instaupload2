const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types

const userSchema = new mongoose.Schema({
    name:{
        type : String,
        require : true
    },

    userName :{
        type : String,
        require : true
    },
    email :{
        type : String,
        require : true
    },
    password :{
        type : String,
        require : true
    },
    followers : [
        {type : ObjectId , ref : "USER"}
    ],
    following : [
        {type : ObjectId , ref : "USER"}
    ]
})

mongoose.model("USER" , userSchema);