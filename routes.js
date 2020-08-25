const express = require('express');
const router = express.Router();

let Question = require('./models').Question;

router.param('qID', (req, res, next, id) => {
    Question.findById(id, (err, doc) => {
        if (err) {
            return next(err);
        }
        if (!doc) {
            err = new Error('Not Found');
            err.status = 404;
            return next(err);
        }
        req.question = doc;
        return next();
    });
});

router.param('aID', (req, res, next, id) => {
    req.answer = req.question.answers.id(id);
    if (!req.answer) {
        err = new Error('Not Found');
        err.status = 404;
        return next(err);
    }
    next();
});

/** request to get questions */
/** GET /questions */
router.get('/', (req, res) => {
    Question.find({}, null, { sort: { createdAt: -1 } }, (err, questions) => {
        if (err) {
            return next(err);
        }
        res.json(questions);
    });
});

/** request to get a specific question */
/** GET /questions/:qiD */
router.get('/:qID', (req, res, next) => {
    res.json(req.question);
});

/** request to post questions */
/** POST /questions */
router.post('/', (req, res, next) => {
    var question = new Question(req.body);
    question.save((err, question) => {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.json(question);
    });
});

/** request to post answers to a question */
/** POST /:qID/answers */
router.post('/:qID/answers', (req, res, next) => {
    req.question.answers = req.question.answers.concat(req.body);
    req.question.save((err, question) => {
        if (err) {
            return next(err);
        }
        res.status(201);
        res.json(question);
    });
});

/** request to create an answer */
/** POST /questions/:qID/answers/:aID */
router.put('/:qID/answers/:aID', (req, res) => {
    req.answer.update(req.body, function (err, result) {
        if (err) {
            return next(err);
        }
        res.json(result);
    });
});


/** request to DELETE an answer */
/** DELETE /questions/:qID/answers/:aID */
router.delete('/:qID/answers/:aID', (req, res) => {
    req.answer.remove((err) => {
        req.question.save((err, question) => {
            if (err) {
                return next(err);
            }
            res.json(question);
        });
    });
});
// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next) => {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
        let err = new Error("Not Found");
        err.status = 404;
        next(err);
    } else {
        req.vote = req.params.dir;
        next();
    }
}, (req, res, next) => {
    req.answer.vote(req.vote, (err, question) => {
        if (err) {
            return next(err);
        }
        res.json(question);
    });
});

module.exports = router;