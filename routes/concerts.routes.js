const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
});
router.route('/concerts/:id').get((req, res) => {
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    res.json(concert);
});
router.route('/concerts').post((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = { id: uuidv4(), performer, genre, price, day, image };
    db.concerts.push(newConcert);
    res.json({ message: 'OK' });
});
router.route('/concerts/:id').delete((req, res) => {
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    db.concerts.splice(concert, 1);
    res.json({ message: 'OK' });
});
router.route('/concerts/:id').put((req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    res.json({ message: 'OK' });
});
module.exports = router;