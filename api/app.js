require('dotenv').config();
const express = require('express');
const passport = require('passport');
// const session = require('express-session');
const app = express();
const port = process.env.PORT || 3000;

const seedDB = require('./seed');
const profileRoute = require('./routes/profiles');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');

//passport
require('./config/passport')(passport)


app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// seedDB();

// app.use(session({
//     secret: 'khalyscret',
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     cookie: {maxAge: 180 * 60 * 1000}
//   }));

//passport config
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.json({
        massage: "Welcome to my fucking blog"
    });
});

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profiles', profileRoute);

app.listen(port, () => {
    console.log(`App started @ ${port}`);
});