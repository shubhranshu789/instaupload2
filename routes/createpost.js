const express = require("express");
const router = express.Router()
const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const POST = mongoose.model("POST")

//Routes

//Display all the posts on home
router.get("/allposts" ,requireLogin, (req , res)=> {
    POST.find()
    .populate("postedBy","_id name")
    .populate("comments.postedBy" , "_id , name")

    .then(posts => res.json(posts))
    .catch(err => console.log(err))
})

//for creating posts
router.post("/createPost",requireLogin , (req , res) => {
    const {body , pic} = req.body;
    // console.log(pic)
    if(!body || !pic){
        return res.status(422).json({error : "Please add all the fields"})
    }
    // req.user
    const post = new POST({
        body,
        photo : pic,
        postedBy : req.user
    })
    post.save().then((result)=>{
        return res.json({post:result})
    }).catch(err => console.log(err))

    // res.json("ok")
})

//for displaying posts on profile
router.get("/myposts" ,requireLogin ,(req , res) => {
    // console.log(req.user)
    POST.find({postedBy : req.user._id})
    .populate("postedBy" , "_id name")
    .populate("comments.postedBy" , "_id , name")
    .then(myposts => {
        res.json(myposts)
    })
})

//For Likes(updating)
router.put("/like", requireLogin, (req, res) => {
    POST.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true //NEW UPDATE
    }).populate("postedBy", "_id name Photo")

       .exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })


   
    })

//For UnLikes(updating)
router.put("/unlike" , requireLogin , (req , res) => {
    POST.findByIdAndUpdate(req.body.postId , {
        $pull : {likes : req.user._id}    // subracting using pull
    },{
        new : true
    }).populate("postedBy", "_id name Photo")
    .exec((err , result) => {
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})


//For updating comments

router.put("/comment" , requireLogin , (req , res) => {
    const comment = {
        comment : req.body.text,
        postedBy : req.user._id
    }
    POST.findByIdAndUpdate(req.body.postId , {
        $push : {comments : comment}
    },{
        new : true
    })
    .populate("comments.postedBy" , "_id name")
    .populate("postedBy" , "_id name")
    .exec((err, result) => {
        if (err) {
            return res.status(422).json({ error: err })
        } else {
            res.json(result)
        }
    })
})



// Api to delete post
router.delete("/deletePost/:postId", requireLogin, (req, res) => {
    console.log(req.params.postId)
    POST.findOne({ _id: req.params.postId })
        .populate("postedBy", "_id")

        .exec((err, post) => {
            if (err || !post) {
                return res.status(422).json({ error: err })
                // console.log(post)
            }

            if (post.postedBy._id.toString() == req.user._id.toString()) { // cannot comapre 2 objects

                post.remove()
                    .then(result => {
                        return res.json({ message: "Successfully deleted" })
                    }).catch((err) => {
                        console.log(err)
                    })
            }
        })
})

// to show following post
router.get("/myfollwingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})


//to show following Posts
router.get("/myfollwingpost", requireLogin, (req, res) => {
    POST.find({ postedBy: { $in: req.user.following } })
        .populate("postedBy", "_id name")
        .populate("comments.postedBy", "_id name")
        .then(posts => {
            res.json(posts)
        })
        .catch(err => { console.log(err) })
})


module.exports = router