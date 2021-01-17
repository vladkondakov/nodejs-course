const router = require('express').Router();
const Card = require('../models/card');
const Course = require('../models/course');

router.get('/', async (req, res) => {
    const card = await Card.fetch();

    res.render('card', {
        title: 'Shopping cart',
        isCard: true,
        courses: card.courses,
        price: card.price
    });
});

router.post('/add', async (req, res) => {
    const course = await Course.getById(req.body.id);
    await Card.add(course);
    
    res.redirect('/card');
});

router.delete('/remove/:id', async (req, res) => {
    const card = await Card.remove(req.params.id);

    return res.status(200).json(card);
});

module.exports = router;