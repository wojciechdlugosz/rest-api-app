const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');

router.route('/seats').get((req, res) => {
    res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
    const seat = db.seats.find(seat => seat.id === parseInt(req.params.id));
    res.json(seat);
});

router.route('/seats').post((req, res) => {
    const { day, seat, client, email } = req.body;
    const takenSeat = db.seats.some(takenSeat => takenSeat.day == day && takenSeat.seat == seat);
    if (takenSeat) {
        res.status(400).json({ message: "The slot is already taken..." });
    } else {
        const newSeat = { id: uuidv4(), day, seat, client, email };
        db.seats.push(newSeat);
        res.json({ message: 'OK' });    
    };
});

router.route('/seats/:id').delete((req, res) => {
    const seat = db.seats.find(seat => seat.id === parseInt(req.params.id));
    db.seats.splice(seat, 1);
    res.json({ message: 'OK' });
});

router.route('/seats/:id').put((req, res) => {
    const { day, seat, client, email } = req.body;
    const seatSelect = db.seats.find(seat => seat.id === parseInt(req.params.id));
    seatSelect.day = day;
    seatSelect.seat = seat;
    seatSelect.client = client;
    seatSelect.email = email;
    res.json({ message: 'OK' });
});

module.exports = router;