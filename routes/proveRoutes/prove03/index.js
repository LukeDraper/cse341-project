const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');

const router = express.Router();

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(express.static(path.join(__dirname, 'public')));

router.use('/admin', adminRoutes);
router.use(shopRoutes);

router.use(errorController.get404);

module.exports = router;
