const router = require('express').Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.getAll();
    
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
});

module.exports = router;