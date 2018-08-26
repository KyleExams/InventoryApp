'use strict';
module.exports = function(app) {
  var sampleCrud = require('../controllers/sampleCrudController');

  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader('Content-Type', 'application/json');
    next();
  });

  // sample crud Routes
  app.route('/get')
    .get(sampleCrud.get);

  app.route('/get/:id')
    .get(sampleCrud.get);

  app.route('/add')
    .post(sampleCrud.add);

  app.route('/edit/:id')
    .put(sampleCrud.edit);

  app.route('/delete/:id')
    .delete(sampleCrud.delete);
};