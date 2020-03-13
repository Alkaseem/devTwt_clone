const mongoose = require('mongoose');
const DB_URL = process.env.DB_URL;
mongoose.set('debug', true);

// mongoose.connect(DB_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         keepAlive: true,
//     })
//     .then(() => console.log("db suceessfully connected!"))
//     .catch(err => console.log("Something Wrong!", err))

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