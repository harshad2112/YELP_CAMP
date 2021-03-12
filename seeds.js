var mongoose   = require("mongoose"),
    campground = require("./models/campgrounds"),
    Comment    = require("./models/comments"),
    data       = [
        {
            name: "Shimla",
            url: "https://upload.wikimedia.org/wikipedia/commons/5/5e/Ridge%2C_Shimla.JPG",
            description: "This Campground is in shimla, a very beautiful and lovely place. a little bit crowdy though but just see the beauty"
        },
        {
            name: "Chopta",
            url:"https://dmgupcwbwy0wl.cloudfront.net/system/images/000/237/752/3fbfde4528e89119784dd3cff77c322a/x600gt/chandrashila-top-view.jpg?1552062079",
            description: "You may not have heard of this beautiful location but this place is really amazing, I have been here once and want to go there again"
        }
    ];

function seedDB(){
    campground.remove({},function(err){
        if(err){
            console.log(err)
        } else{
            data.forEach(function(seed){
                campground.create(seed,function(err,campground){
                    if(err){
                        Console.log(err);
                    } else{
                        console.log("added");
                        Comment.create({
                            text:"Hey I have also been there. Really lovely place",
                            author:"Chunnu"
                        }, function(err, comments){
                            if(err){
                                console.log(err);
                            } else{
                                campground.comment.push(comments);
                                campground.save();
                                console.log(campground);
                            }
                        });
                    }
                });
            });
        };
    });
};
module.exports = seedDB;