const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(docs => {
    console.log(docs)
    if (docs.length >= 0) {
      res.status(200).json(docs);
    } else {
      res.status(404).json({
        message: 'no entries found'
      });
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({
      error: err
    });
  });
})

router.post('/', (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price
  })
  product.save().then(result => {
    console.log(result)
    res.status(201).json({
      message: 'Successfully handling POST requests to /products',
      createdProduct: product
    })
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error: err})
  })
});

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then(doc => {
      console.log(doc)
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({message: "no valid entry found for that product ID"})
      }
    })
      .catch(err => { 
        console.log(err);
        res.status(500).json({error: err})
    });
});

router.patch('/:productId', (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.updateOne({_id: id}, {$set: updateOps})
    .then(res => {
      console.log(res)
      res.status(200).json(res)
    })
    .catch( err => {
      console.log(err)
      res.status(500).json({
        error: err
      })
    })
});

router.delete('/:productId', (req, res, next) => {
  const id = req.params.productId;
  Product.deleteOne({_id: id})
  .then(res => {
    res.status(200).json(res);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;