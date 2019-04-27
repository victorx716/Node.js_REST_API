const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).json({
    message: 'Successfully handling GET requests to /products'
  })
})

router.post('/', (req, res, next) => {
  const product = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    message: 'Successfully handling POST requests to /products',
    createdProduct: product
  })
})

router.get('/:productId', (req, res, next) => {
  const id = req.params.productId;
  if (id === '88') {
    res.status(200).json({
      message: 'This is the lucky ID',
      id: id
    });
  } else {
    res.status(200).json({
      message: 'This is a valid ID'
    });
  }
});

router.patch('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product has been updated'
  });
});

router.delete('/:productId', (req, res, next) => {
  res.status(200).json({
    message: 'Product is removed from your cart!'
  });
});

module.exports = router;