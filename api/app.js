require('dotenv').config();
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 3000;

const profileRoute = require('./routes/profiles');
const usersRoute = require('./routes/users');
const errorHandler    =   require("./config/error");
const postsRoute = require('./routes/posts');
const {
    loginRequired
} = require('./config/middleware');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use((req, res, next) => {
    res.locals.currentUserId = req.userId
    next()
});

app.get('/', (req, res) => {
    res.json({
        massage: "Welcome to my fucking blog"
    });
});

app.use('/api/users', usersRoute);
app.use('/api/posts', postsRoute);
app.use('/api/profiles', loginRequired, profileRoute);

app.use((req,res,next)=>{
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(errorHandler);

app.listen(port, () => {
    console.log(`App started @ ${port}`);
});