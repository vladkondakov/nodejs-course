const express = require('express');
const exhbs = require('express-handlebars');
const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');

const app = express();

const hbs = exhbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(express.static('public'));
app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);

const PORT = process.env.PORT || 3000;

const start = () => {
    try {
        app.listen(PORT, () => {
            console.info(`App has been started on port ${PORT}...`);
        });
    } catch (err) {
        console.error('Server error', err.message);
        process.exit(1);
    }
}

start();