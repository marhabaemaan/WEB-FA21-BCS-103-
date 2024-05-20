let express = require("express");
let router = express.Router();
let Bag = require("../models/bagModel");

router.get("/add-to-cart/:id", async (req, res) => {
    let cart = req.cookies.cart;
    if (!cart) cart = [];
    cart.push(req.params.id);
    res.cookie("cart", cart);
  
    // return res.send(req.cookies);
    return res.redirect("/students");
  });

  module.exports = router;