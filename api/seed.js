const mongoose = require('mongoose');
const db = require('./models');



// const data = [{
//     fullName: "Alkaseem Abubakar",
//     rank: "software engineer",
//     skills: ["react", "graphql", "nodejs"],
//     // creator: "843uhfjdhgkb767djfgdhfgk"
// }, {
//     fullName: "Abubakar khalifa",
//     rank: "full-stack developer",
//     skills: ["jasmine", "SQL", "React"],
//     // creator: "843uhfjdhgkb767djfgdhfgk"
// }];

const data1 = [{
    title: "This is my third one",
    description: "feel like would work",

}, {
    title: "This is my fouth one",
    description: "whoooo workng",
}];

// function sampleprofile() {
//     data.forEach((profile) => {
//         const profiles = new db.Profile({
//             fullName: profile.fullName,
//             rank: profile.rank,
//             skills: profile.skills,
//             creator: "5e4445283ea87b0e448e003e"
//         })
//         return profiles.save().then(data => {
//             console.log(data)
//         }).catch(err => {
//             console.log(err)
//         });
//         // console.log(profiles)
//         // console.log(profile.full);
//     });
// }

function createPost() {
    data1.forEach(data => {
        const post = new db.Post({
            title: data.title,
            description: data.description,
            creator: "5e4445283ea87b0e448e003e"
        });
        return post.save().then(pt => {
            db.User.findById({
                _id: "5e4445283ea87b0e448e003e"
            }).then(user => {
                user.posts.push(pt);
                user.save().then(saveUser => {
                    console.log(saveUser)
                }).catch(err => {
                    console.log("user not saved " + err)
                })
            }).catch(err => {
                console.log("post not saved " + err)
            })
        }).catch(err => {
            console.log("not Ok " + err);
        });
    });
}


// function seedDB(){
//    //Remove all campgrounds
//     Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         //added a few a campgrounds
//         data.forEach(function(seed){
//             Campground.create(seed, function(err, campground){
//                 if(err){
//                     console.log(err);
//                 } else {
//                     //Create comment
//                     Comment.create(
//                     {
//                         text: "Coding is the best!!",
//                         author: "khalifa"
//                     }, function(err, comment){
//                         if(err){
//                             console.log(err);
//                         } else {
//                             campground.comments.push(comment);
//                             campground.save();
//                         }
//                     });
//                 }
//             });
//         });
//     });
// }


// module.exports = sampleprofile;
module.exports = createPost;