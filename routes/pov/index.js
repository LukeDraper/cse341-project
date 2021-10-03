const routes = require('express').Router();

routes.use('/03', require('./prove03'));
routes.get('/', (req, res, next) => {
    res.render("pages/proveAssignments/", {
        pageTitle: "Prove Assignments",
        path: "/proveAssignments",
        title: "Prove Assignments"
    });
});

module.exports = routes;