const express = require("express");
let router = express.Router();

let Bag = require("../../models/bagModel");

router.post("/api/bags", async function(req, res){
    let data = req.body;
    let bag = new Bag(data);
    await bag.save();
    res.send(bag);
});

router.delete("/api/bags/:id", async function(req, res){
    let bag = await Bag.findByIdAndDelete(req.params.id);
    if(!bag) return res.status(404).send("record not found");
    res.send(bag);
});

router.put("/api/bags/:id", async function(req, res){
    let bag = await Bag.findById(req.params.id);
    if(!bag) return res.status(404).send("record not found");
    bag.name = req.body.name;
    bag.price = req.body.price;
    await bag.save();
    res.send(bag);
});

router.get("/api/bags/:id", async function(req, res){
    let bag = await Bag.findById(req.params.id);
    if(!bag) return res.status(404).send("record not found");
    res.send(bag);
});

router.get("/api/bags", async function(req, res){
    let bags = await Bag.find();
    if(!bags) return res.status(404).send("record not found");
    res.send(bags);
});

module.exports = router;