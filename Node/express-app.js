const express = require("express");
const mongoose = require("mongoose");
const server = express();

let Bag = require("./models/bagModel");
server.use(express.json());
server.set("view engine", "ejs");
server.use(express.urlencoded({ extended: true })); // Corrected body-parser usage

let cookieParser = require("cookie-parser");
let expressSession = require("express-session");
let ejsLayouts = require("express-ejs-layouts");

let mainSiteMiddleware = require("./middlewares/main-site");
let checkAuth = require("./middlewares/check-auth");
server.use(ejsLayouts);
server.use(cookieParser());
server.use(
  expressSession({
    secret: "My Secret Key",
    resave: false,
    saveUninitialized: true,
  })
); // Corrected express-session usage

server.use(express.static("public"));
server.use(mainSiteMiddleware);

let bagsAPIRouter = require("./routes/api/bags");
// const { cookie } = require("express/lib/response"); // Removed unnecessary import
server.use(bagsAPIRouter);

// server.get("/cart", async (req, res) => {
//   let cart = req.cookies.cart;
//   if (!cart) cart = [];
//   let bags = await Bag.find({ _id: { $in: cart } });
//   res.render("cart", { bags });
// });
server.get("/cart", checkAuth, async (req, res) => {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let bags = await Bag.find({ _id: { $in: cart } });
  res.render("cart", { bags });
});

server.use("/bags", require("./routes/bags"));
server.use("/", require("./routes/auth"));

server.get("/login", function (req, res) {
  res.render("auth/login");
});

server.get("/register", function (req, res) {
  res.render("auth/register");
});

server.get("/", function (req, res) {
  res.render("homepage");
});
server.get("/ladies-bag", async (req, res) => {
  try {
    // Fetch data for ladies bags from the database
    let ladiesBags = await Bag.find({ category: "ladies-bag" });
    console.log(ladiesBags);
    res.render("ladies-bag", { bags: ladiesBags }); // Pass the fetched data to the template
  } catch (error) {
    console.log("Error fetching ladies bags:", error);
    res.status(500).send("Internal Server Error");
  }
});
server.get("/mens-wallet", async (req, res) => {
  try {
    // Fetch data for men's wallets from the database
    let mensWallets = await Bag.find({ category: "mens-wallet" });
    console.log(mensWallets);
    res.render("mens-wallet", { bags: mensWallets }); // Pass the fetched data to the template
  } catch (error) {
    console.error("Error fetching men's wallets:", error);
    res.status(500).send("Internal Server Error");
  }
});
server.get("/mens-bag", async (req, res) => {
  try {
    // Fetch data for men's bags from the database
    let mensBags = await Bag.find({ category: "mens-bag" });
    res.render("mens-bag", { bags: mensBags }); // Render the HTML template with the fetched data
  } catch (error) {
    console.error("Error fetching men's bags:", error);
    res.status(500).send("Internal Server Error");
  }
});
server.get("/ladies-wallet", async (req, res) => {
  try {
    // Fetch data for men's bags from the database
    let ladiesWallet = await Bag.find({ category: "ladies-wallet" });
    res.render("ladies-wallet", { bags: ladiesWallet }); // Render the HTML template with the fetched data
  } catch (error) {
    console.error("Error fetching ladies wallet:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Define seedDatabase function
async function seedDatabase() {
  try {
    // Define seed data
    const seedData = [
      // { name: "Crossbody", price: 50, category: "ladies-bag" },
      // { name: "Office Bag", price: 50, category: "mens-bag" },
      // // Add more bags with appropriate category values
    ];

    // Check if seed data already exists in the database
    const existingBags = await Bag.find();
    if (existingBags.length === 0) {
      // Connect to MongoDB
      await mongoose.connect(
        "mongodb+srv://marhabaemaan:samsungS3@project0.f2rpwt8.mongodb.net/"
      );
      console.log("DB Connected");

      // Insert seed data into database
      await Bag.insertMany(seedData);
      console.log("Seed data inserted successfully");
    } else {
      console.log("Seed data already exists. Skipping insertion.");
    }
  } catch (err) {
    console.error("Error inserting seed data:", err);
  }
}


// Middleware and routes setup...

// Start the server after connecting to DB and seeding data
mongoose
  .connect("mongodb+srv://marhabaemaan:samsungS3@project0.f2rpwt8.mongodb.net/")
  .then(() => {
    console.log("DB Connected");
    // Seed the database after successful connection
    seedDatabase();
    // Start the server
    server.listen(4000, () => {
      console.log("Server is running on port 4000");
    });
  })
  .catch((err) => {
    console.log("Unable to connect to DB:", err);
  });
