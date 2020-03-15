const mongoose = require('mongoose');
mongoose.set('debug', true)

mongoose.connect(`mongodb+srv://khalyfa:khaly123@cluster0-cqojh.mongodb.net/test?retryWrites=true&w=majority`, 
        {useNewUrlParser: true, useUnifiedTopology: true}
    )
        .then(() => {
            console.log("Database Connected!!`");
        })
        .catch(err => console.log("Error " +err))


mongoose.Promise = Promise;

module.exports.User = require('./user');
module.exports.Profile = require('./profile');
module.exports.Post = require('./post');