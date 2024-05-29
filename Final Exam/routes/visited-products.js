const express = require('express');
const router = express.Router();
const Bag = require('../models/bagModel');

router.get('/visited-products', async (req, res) => {
    try {
        const visitedBagIds = req.session.visitedProducts || [];
        const visitedBags = await Bag.find({ _id: { $in: visitedBagIds } });
        res.render('visited-products', { visitedBags });
    } catch (err) {
        console.error('Error fetching visited products:', err);
        res.status(500).send('Server error');
    }
});

module.exports = router;