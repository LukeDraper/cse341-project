//TA02 PLACEHOLDER
// Remember, you can make more of these placeholders yourself!
const express = require('express');
const router = express.Router();

const nameList = ['Peter', 'James', 'John'];
let message = "";

router.get('/', (req, res, next) => {
  res.render('pages/teamActivities/ta02', {
    title: 'Team Activity 02',
    path: '/ta02', // For pug, EJS
    activeTA03: true, // For HBS
    contentCSS: true, // For HBS
    nameArray: nameList,
    message: message
  });
});

router.post('/addUser', (req, res, next) => {
  message = "";
  const index = nameList.indexOf(req.body.nameInput);
  if(index > -1) { 
    message = "No clones allowed."
  } else {
    nameList.push(req.body.nameInput)
  }
  res.redirect('/ta02');
});

router.post('/removeUser', (req, res, next) => {
  message = "";
  const index = nameList.indexOf(req.body.nameRemove);
  if(index > -1) { 
    nameList.splice(index, 1);
  } else {
    message = "No such person."
  }
  res.redirect('/ta02');
});

module.exports = router;
