//TA05 PLACEHOLDER
const express = require('express');
const router = express.Router();
const session = require('express-session');
router.use(session({secret:'XASDASDA'}));
let sess ;

router.post('/change-style', (req, res, next) => {
    sess = req.session;
    sess.style = req.body.color;
    console.log("Style: " + sess.style);
    res.redirect('/ta05');
});

router.post('/counter', (req, res, next) => {
    const counterMethod = req.body.countermethod;
    sess = req.session;
    if (counterMethod === "increment") {
        sess.counter++;
    } else if (counterMethod === "decrement") {
        sess.counter--;
    }
    console.log("Counter:" + sess.counter);
    res.redirect('/ta05');
});

router.post('/reset', (req, res, next) => {
    sess = req.session
    sess.destroy( () => {
        res.redirect('/ta05');
    });
});

router.get('/', (req, res, next) => {
    sess = req.session;
    if(sess.style == undefined) {
        console.log("Reset color");
        sess.style = "blue";
    }
    if(sess.counter == undefined) {
        sess.counter = 0;
    }
    console.log(sess);
  res.render('pages/ta05', {
    title: 'Team Activity 05',
    path: '/ta05', // For pug, EJS
    activeTA05: true, // For HBS
    contentCSS: true, // For HBS
    session: sess
  });
});


module.exports = router;
