var router = require('express').Router();
const fs = require('fs');
var mocks = require('./mock');
var assign = require('object-assign');

router.get('/costs', function (req, res, next) {
    var costs = mocks.costs.map(function (cost) {
            return assign({}, cost, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || costs.length,
        offset = Number(req.query.offset) || 0;

    res.json(costs.slice(offset, limit + offset))
});

router.get('/costtype', function (req, res, next) {
    var costTypes = mocks.costType.map(function (type) {
            return assign({}, type, {
                text: undefined
            })
        }),
        limit = Number(req.query.limit) || costTypes.length,
        offset = Number(req.query.offset) || 0;

    res.json(costTypes.slice(offset, limit + offset))
});

router.get('/fontconfig', function (req, res, next) {
    var fontConfig = JSON.parse(fs.readFileSync('./src/fonts/config.json', 'utf8'))
    var responseFontConfig = assign({}, {glyphs: fontConfig.glyphs, css_prefix_text: fontConfig.css_prefix_text}),
        limit = Number(req.query.limit) || fontConfig.length,
        offset = Number(req.query.offset) || 0;

    res.json(responseFontConfig)
});
router.post('/costs', function (req, res, next) {
    var body = req.body;
    var cost = {

        comment: body.comment,
        type: body.type,
        date: Date.now(),
        sum: body.sum,
        id: Date.now().toString()
    };
    mocks.costs.push(cost);
    res.json(cost)
});

router.post('/costtype', function (req, res, next) {
    var body = req.body;
    var type = {
        name: body.name,
        icon: body.icon,
        id: Date.now().toString()
    };
    mocks.costs.push(type);
    res.json(type)
});
/*
router.post('/grades', function (req, res, next) {
    var body = req.body;
    var grade = {

        id: Date.now().toString(),
        title: body.title,
        students: body.students
    };
    mocks.grades.push(grade);
    res.json(grade)
});


router.post('/students', function (req, res, next) {
    var comment = {
        id : Date.now().toString(),
        name : req.body.name,
        gpa : req.body.gpa
    };
    mocks.students.push(comment);
    res.json(comment)
});
*/

module.exports = router;
