const express = require('express');
const mongoose = require('mongoose');
const exhbs = require('express-handlebars');
const path = require('path');
const config = require('config');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cardRoutes = require('./routes/card');
const User = require('./models/user');

const app = express();

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(async (req, res, next) => {
    try {
        const user = await User.findById(config.get('TEMPORARY_USER_ID'));
        req.user = user;
        return next();
    } catch (e) {
        console.log(e);
    }
});

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/card', cardRoutes);

const start = async () => {
    try {
        const PORT = process.env.PORT || config.get('PORT') || 3000;
        const DATABASE_URL = config.get('DATABASE_URL');

        await mongoose.connect(DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false });
        
        const candidate = await User.findOne();
        if (!candidate) {
            const user = new User({
                email: 'vladisloove.kondakov@gmail.com',
                name: 'Vladislav',
                cart: { items: [] }
            });
            await user.save();
        }

        app.listen(PORT, () => {
            console.info(`App has been started on port ${PORT}...`);
        });
    } catch (err) {
        console.error('Server error', err.message);
        process.exit(1);
    }
}

start();