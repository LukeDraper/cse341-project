exports.get404 = (req, res, next) => {
  res.status(404).render('pages/proveAssignments/prove03/404', { pageTitle: 'Page Not Found', path: '/proveAssignments/03/404' });
};
