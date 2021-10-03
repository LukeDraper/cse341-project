const routes = require('express').Router();

const proveActivities = require('./proveroutes');
const teamActivities = require('./teamroutes');
// Hopefully this works this time. Heroku doesn't like my app.

routes.use('/proveAssignments', proveActivities);
routes.use('/teamActivities', teamActivities);

routes.get('/', (req, res, next) => {
    res.render('pages/index', {title: "Welcome to my CSE341 repo", path: '/'});
});
routes.use((req,res,next) => {
    res.render("pages/404", {title: "404 - Page Not Found", path: req.url})
});

module.exports = routes;