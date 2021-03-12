var express     = require("express"),
    router      = express.Router();
    user        = require("../models/users"),
    passport    = require("passport");

router.get("/", function(req, res){
    res.render("Home");
});

router.get("/register", function(req,res){
    res.render("users/register");
});

router.post("/register",function(req,res){
    user.register(({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            res.redirect("/register");
        } else{
            passport.authenticate("local")(req, res, function(){
                res.redirect("/campgrounds");
            });
        }
    });
});

router.get("/login", function(req,res){
    res.render("users/login");
});

router.post("/login", passport.authenticate("local",{
    successRedirect: "/campgrounds",
        failureRedirect: "/login"
}), function(req,res){
});

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/campgrounds");
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
};

module.exports = router;