const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Product = require('../models/product')

router.get('/', (req, res, next) => {
  Product.find()
  .select('name price _id')
  .exec()
  .then(docs => {
    console.log(docs)
    const response = {
      count: docs.length,
      products: docs.map(doc => {
        return {
          name: doc.name,
          price: doc.price,
          _id: doc._id,
          request: {
            type: 'GET',
            url: 'http://localhost:3000/' + doc.id 
          }
        }
      })
    }
    if (docs.length >= 0) {
      res.status(200).json(response);
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
      message: 'Successfully created product',
      createdProduct: {
        name: result.name,
        price: result.price,
        _id: result.id,
        request: {
          type: 'POST',
          url: 'http://localhost:3000/products/' + result.id
        }
      }
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
  .select('name price _id')
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
    res.status(200).json({
      message: 'Product deleted',
      request: {
        type: 'POST',
        url: 'http://localhost:3000/products',
        body: { name: 'String', price: 'Number'}
      }
    });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
});

module.exports = router;