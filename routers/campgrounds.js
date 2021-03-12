var express        = require("express"),
    router         = express.Router();
    allcampgrounds = require("../models/campgrounds"),
    Comment        = require("../models/comments");


router.get("/campgrounds",function(req, res){
    allcampgrounds.find({}, function(err, campgrounds){
        if(err){
            console.log(err);
        }
        else{
            res.render("campgrounds/campgrounds",{campgrounds: campgrounds});   
        }
    });
});
router.get("/campgrounds/new",isLoggedIn,function(req, res){
    res.render("campgrounds/newCampgrounds");
});
router.post("/campgrounds",isLoggedIn,function(req,res){
    var name = req.body.name;
    var url = req.body.imgURL;
    var author = {
        id: req.user.id,
        username: req.user.username
    };
    var newcamp = {name: name, url: url, author: author}
    allcampgrounds.create(newcamp, function(err,campgrounds){
        if(err){
            console.log(err);
        }
        else{
            console.log(campgrounds);
            res.redirect("/campgrounds");
        }
    });
});
router.get("/campgrounds/:id",function(req,res){
    allcampgrounds.findById(req.params.id).populate("comment").exec(function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        } else {
            res.render("campgrounds/view", {campground: campground});
        }
    });
});

router.get("/campgrounds/:id/edit",checkCampgroundOwnership, function(req,res){
    allcampgrounds.findById(req.params.id, function(err,campground){
        res.render("campgrounds/edit", {campground: campground});
    });
});

router.put("/campgrounds/:id",checkCampgroundOwnership, function(req,res){
    allcampgrounds.findByIdAndUpdate(req.params.id,{
        name: req.body.name,
        url: req.body.imgURL
    },function(err,camp){
        if(err){
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});
router.delete("/campgrounds/:id",checkCampgroundOwnership,function(req,res){
    allcampgrounds.findByIdAndRemove(req.params.id,function(err,campground){
        if(err){
            res.redirect("/campgrounds");
        }else{
            console.log("campground deleted");
            res.redirect("/campgrounds");
        }
    });
});

function checkCampgroundOwnership(req,res,next){
    if(req.isAuthenticated()){
        allcampgrounds.findById(req.params.id, function(err,campground){
            if(err){
                res.redirect("back");
            } else {
                if(campground.author.id.equals(req.user.id)){
                   next();
                } else{
                    res.redirect("back");
                }
            }
        });
        } else{
            res.redirect("/login");
        }
};
function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};
module.exports = router;