const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('add', {
        title: 'Add Course',
        isAdd: true
    });
});

module.exports = router;