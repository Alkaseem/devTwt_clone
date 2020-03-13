require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;

const seedDB = require('./seed');
const profileRoute = require('./routes/profiles');
const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const {
    loginRequired
} = require('./config/middleware');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
// seedDB();

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

app.listen(port, () => {
    console.log(`App started @ ${port}`);
});