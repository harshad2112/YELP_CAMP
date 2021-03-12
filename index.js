var express              = require("express"),
    app                  = express(),
    bodyParser           = require("body-parser"),
    mongoose             = require("mongoose"),
    methodOverride       = require("method-override"),
    passport             = require("passport"),
    localstrategy        = require("passport-local"),
    passporLocalMongoose = require("passport-local-mongoose"),
    allcampgrounds       = require("./models/campgrounds"),
    comment              = require("./models/comments"),
    user                 = require("./models/users"),
    seedDB               = require("./seeds"),
    campgroundsRouters   = require("./routers/campgrounds"),
    commentRouter        = require("./routers/comments"),
    indexRouter          = require("./routers/index"),
    {MONGODB}              = require("./config.js");
    mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true})
    
//seedDB();
app.use(require("express-session")({
    secret: "Hi this is yelp camp app",
    resave: false,
    saveUninitialized: false
}));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(methodOverride("_method"));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(function(req,res, next){
    res.locals.currentUser = req.user;
    next();
});
app.use(campgroundsRouters);
app.use(commentRouter);
app.use(indexRouter);

app.listen(3000, function(){
    console.log("Server started!!");
});