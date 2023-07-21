const jwt = require("jsonwebtoken")
const {jwt_secret} = require("../keys")
const mongoose = require("mongoose")
const USER = mongoose.model("USER");

module.exports = (req , res , next) => {
    // console.log("hello MiddleWires")

    const {authorization} = req.headers;
    if(!authorization){
        return res.status(401).json({error : "You must have login"})
    }
    // res.json("ok");
    const token = authorization.replace("Bearer " , "")
    jwt.verify(token , jwt_secret , (err , payload) => {
        if(err){
            return res.status(401).json({error : "You must have login 2"})
        }
        const {_id} = payload
        USER.findById(_id).then(userData => {
            // console.log(userData)
            req.user = userData
            next()
        })
    })
    
}