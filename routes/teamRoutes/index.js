const routes = require('express').Router();

routes.use('/01', require('./ta01'));
routes.use('/02', require('./ta02'));
routes.use('/03', require('./ta03'));
routes.use('/04', require('./ta04'));
routes.get('/', (req, res, next) => {
    res.render("pages/teamActivities/", {
        pageTitle: "Team Activities",
        path: "/teamActivities"
    });
});

module.exports = routes;