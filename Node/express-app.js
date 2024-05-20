const express = require("express");
const mongoose = require("mongoose");
const server = express();

let Bag = require("./models/bagModel");
server.use(express.json());
server.set("view engine", "ejs");
server.use(express.urlencoded());

let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let ejsLayouts = require("express-ejs-layouts");

let mainSiteMiddleware = require("./middlewares/main-site");
let checkAuth = require("./middlewares/check-auth");
server.use(ejsLayouts);
server.use(cookieParser());
server.use(expressSession({ secret: "My Secret Key" }));

server.use(express.static("public"));
server.use(mainSiteMiddleware);

let bagsAPIRouter = require("./routes/api/bags");
const {cookie} = require("express/lib/response");
server.use(bagsAPIRouter);

server.get("/cart", checkAuth, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let bags = await Bag.find({ _id: { $in: cart } });
  res.render("cart", { bags });
});

server.use("/bags", require("./routes/bags"));
server.use("/", require("./routes/auth"));

server.get("/login", function (req, res) {
  res.render("auth/login");  // specify the folder 'auth'
});

server.get("/register", function (req, res) {
  res.render("auth/register");  // specify the folder 'auth'
});


server.get("/", function (req, res) {
  res.render("homepage");
});



server.get("/ladies-wallet", function(request, response){
    response.render("ladies-wallet");
})
server.get("/mens-wallet", function(request, response){
    response.render("mens-wallet");
})
server.get("/ladies-bag", function(request, response){
    response.render("ladies-bag");
})
server.get("/mens-bag", function(request, response){
    response.render("mens-bag");
})


//run localhost:4000
server.listen(4000);

mongoose
  .connect("mongodb+srv://marhabaemaan:samsungS3@project0.f2rpwt8.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("Unable to connect");
  });




// server.get("/api/stories", function (request, response){
//   response.send([
//     { title: "Story 1", content: "story 1 content" },
//     { title: "story 2", content: "story 2 content" },
//   ]);
// });
// run localhost:4000/api/stories in browser
// before performing above step run nodemon express-app.js in the terminal below
// the above snippet is sending the same json that we catched using ajax in crud. 
// now this is the server side's pov how the json was sent.