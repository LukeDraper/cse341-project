const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('pages/proveAssignments/prove03/shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/proveAssignments/03/products'
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, product => {
    res.render('pages/proveAssignments/prove03/shop/product-detail', {
      product: product,
      pageTitle: product.title,
      path: '/proveAssignments/03/products'
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('pages/proveAssignments/prove03/shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/proveAssignments/03/'
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    Product.fetchAll(products => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          prod => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render('pages/proveAssignments/prove03/shop/cart', {
        path: '/proveAssignments/03/cart',
        pageTitle: 'Your Cart',
        products: cartProducts
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/proveAssignments/03/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, product => {
    Cart.deleteProduct(prodId, product.price);
    res.redirect('/proveAssignments/03/cart');
  });
};

exports.getOrders = (req, res, next) => {
  res.render('pages/proveAssignments/prove03/shop/orders', {
    path: '/proveAssignments/03/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('pages/proveAssignments/prove03/shop/checkout', {
    path: '/proveAssignments/03/checkout',
    pageTitle: 'Checkout'
  });
};
