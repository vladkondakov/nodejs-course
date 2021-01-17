const router = require('express').Router();
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const courses = await Course.find().populate('userId', 'email name').lean();
    
    res.render('courses', {
        title: 'Courses',
        isCourses: true,
        courses
    });
});

router.get('/:id/edit', async (req, res) => {
    if (!req.query.allow) {
        return res.redirect('/');
    }

    const course = await Course.findById(req.params.id).lean();

    res.render('course-edit', {
        title: `Edit ${course.title}`,
        course
    });
});

router.post('/edit', async (req, res) => {
    const { _id } = req.body;
    delete req.body._id;
    await Course.findByIdAndUpdate(_id, req.body);

    res.redirect('/courses');
});

router.get('/:id', async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).lean();
        res.render('course', {
            layout: 'empty',
            title: `Course ${course.title}`,
            course
        });
    } catch (e) {
        console.log(e);
    }
});

router.post('/remove', async (req, res) => {
    try {
        await Course.deleteOne({ _id: req.body._id });
        res.redirect('/courses');
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;