const express = require('express');
const router = express.Router();

/** request to get questions */
/** GET /questions */
router.get('/', (req, res) => {
    res.json({ name: "Sahil" });
});

/** request to get a specific question */
/** GET /questions/:qiD */
router.get('/:qID', (req, res) => {
    res.json({ answer: "You sent a request for " + req.params.qID });
});

/** request to post questions */
/** POST /questions */
router.post('/', (req, res) => {
    res.json({
        answer: "You sent a post request",
        body: req.body
    });
});

/** request to post answers to a question */
/** POST /:qID/answers */
router.post('/:qID/answers', (req, res) => {
    res.json({
        answer: "You sent a post request to /answers",
        body: req.body,
        questionID:req.params.qID,
    });
});

/** request to create an answer */
/** POST /questions/:qID/answers/:aID */
router.put('/:qID/answers/:aID', (req, res) => {
    res.json({
        answer: "You sent a put request to /answers",
        body: req.body,
        questionID: req.params.qID,
        answerID: req.params.aID

    });
});


/** request to DELETE an answer */
/** DELETE /questions/:qID/answers/:aID */
router.delete('/:qID/answers/:aID', (req, res) => {
    res.json({
        answer: "You sent a put request to /answers",
        questionID: req.params.qID,
        answerID: req.params.aID

    });
});
// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Vote on a specific answer
router.post("/:qID/answers/:aID/vote-:dir", (req, res, next)=>{
    if(req.params.dir.search(/^(up|down)$/) === -1) {
        var err = new Error("Not Found");
        err.status = 404;
        next(err);
    } else {
        next();
    }
}, (req, res)=>{
res.json({
    response: "You sent me a POST request to /vote-" + req.params.dir,
    questionId: req.params.qID,
    answerId: req.params.aID,
    vote: req.params.dir
});
});

module.exports = router;