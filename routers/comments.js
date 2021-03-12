var express        = require("express"),
    router         = express.Router();
    comment        = require("../models/comments"),
    allcampgrounds = require("../models/campgrounds");

router.get("/campgrounds/:id/comments/new",isLoggedIn, function(req,res){
    allcampgrounds.findById(req.params.id, function(err,campground){
        if(err){
            res.redirect("/campgrounds/" + req.params.id);
        } else{
            res.render("comments/new",{campground: campground});
        }
    });
});

router.post("/campgrounds/:id/comments",isLoggedIn,function(req,res){
    allcampgrounds.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err);
        } else{
            comment.create({
                text: req.body.text
            }, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    campground.comment.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/"+req.params.id);
                }
            });
        }
    });
});
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;