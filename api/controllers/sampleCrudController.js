'use strict';
const Inventory = require('../models/inventory');

function logInfo(method, req) {
  // caller information
  let log = 'Called ' + method + ' from ' + req.connection.remoteAddress.replace(/^.*:/, '') + ' on ' + new Date().toLocaleString();
  console.log(log); 
}

module.exports.get = (req, res, next) => {
  logInfo('GET', req);

  if(req.params.id) {
    Inventory.findById(req.params.id, (err, item) => {
      if (err) {
        return next(err);
      }
      res.json(item);
    })
  } else {
    Inventory.find({}).then((items) => {
      res.json(items);
    });
  }
};

module.exports.add = (req, res, next) => {
  logInfo('POST', req);

  console.log(req.body);

  let item = new Inventory(
    {
      name: req.body.name,
      price: req.body.price
    }
  );

  item.save((err) => {
    if (err) {
      return next(err);
    }
    res.send({});
  });
};

module.exports.edit = (req, res, next) => {
  logInfo('PUT', req);

  console.log(req.params.id);
  console.log(req.body);

  let item = {
      name: req.body.name,
      price: req.body.price
  };

  Inventory.findOneAndUpdate({_id:req.params.id}, {$set:item}, (err) => {
    if (err) {
      return next(err);
    }    
    res.send({});
  });
};

module.exports.delete = (req, res, next) => {
  logInfo('DELETE', req);

  Inventory.findOneAndRemove({_id:req.params.id}, (err) => {
    if (err) {
      return next(err);
    }
    res.send({});
  });
};