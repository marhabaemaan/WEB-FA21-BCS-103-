let express = require("express");
let router = express.Router();
let Bag = require("../models/bagModel");


router.get("/new", (req, res) => {
  res.render("bags/new");
});

router.post("/new", async (req, res) => {
  let bag = new Bag(req.body);
  await bag.save();
  return res.redirect("/bags");
  //   return res.send(req.body);

  //   res.render("students/new");
});

router.get("/delete/:id", async (req, res) => {
  let bag = await Bag.findByIdAndDelete(req.params.id);
  return res.redirect("/bags");
});
router.get("/add-to-cart/:id", async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart, { path: "/" });
  // res.cookie("cart", cart);

  // return res.send(req.cookies);
  return res.redirect("/bags");
});

router.get("/edit/:id", async (req, res) => {
  let bag = await Bag.findById(req.params.id);
  return res.render("bags/edit", { bag });
});
router.post("/edit/:id", async (req, res) => {
  let bag = await Bag.findById(req.params.id);
  bag.name = req.body.name;
  bag.price = req.body.price;
  bag.category = req.body.category;
  await bag.save();
  return res.redirect("/bags");
});

// router.get("/:page?", async (req, res) => {
//   let pageTitle = "List of All bags";

//   let page = req.params.page ? req.params.page : 1;
//   let pageSize = 3;
//   let skip = (page - 1) * pageSize;
//   // let total = await Student.countDocuments();
//   let totalPages = Math.ceil(total / pageSize);
//   let bags = await Bag.find().limit(pageSize).skip(skip);
//   //   return res.send(students);
//   return res.render("bags/list", {
//     pageTitle,
//     bags,
//     page,
//     pageSize,
//     total,
//     totalPages,
//   });
// });

module.exports = router;