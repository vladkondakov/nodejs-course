const router = require('express').Router();
const Course = require('../models/course');

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Course',
        isAdd: true
    });
});

router.post('/', async (req, res) => {
    const { title, price, img } = req.body;
    const course = new Course({ 
        title, 
        price, 
        img, 
        userId: req.user
    });

    try {
        await course.save();
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;