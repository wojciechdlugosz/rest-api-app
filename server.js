const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

app.listen(8000, () => {
    console.log('server on port 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//testimonials
app.get('/testimonials', (req, res) => {
    res.json(db.testimonials);
});

app.get('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    res.json(testimonial);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const random = db.testimonials[randomIndex];
    res.json(random);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const newTestimonial = { id: uuidv4(), author, text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    db.testimonials.splice(testimonial, 1);
    res.json({ message: 'OK' });
});

//concerts
app.get('/concerts', (req, res) => {
    res.json(db.concerts);
});
app.get('/concerts/:id', (req, res) => {
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    res.json(concert);
});
app.post('/concerts', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = { id: uuidv4(), performer, genre, price, day, image };
    db.concerts.push(newConcert);
    res.json({ message: 'OK' });
});
app.delete('/concerts/:id', (req, res) => {
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    db.concerts.splice(concert, 1);
    res.json({ message: 'OK' });
});
app.put('/concerts/:id', (req, res) => {
    const { performer, genre, price, day, image } = req.body;
    const concert = db.concerts.find(concert => concert.id === parseInt(req.params.id));
    concert.performer = performer;
    concert.genre = genre;
    concert.price = price;
    concert.day = day;
    concert.image = image;
    res.json({ message: 'OK' });
});

//seats
app.get('/seats', (req, res) => {
    res.json(db.seats);
});
app.get('/seats/:id', (req, res) => {
    const seat = db.seats.find(seat => seat.id === parseInt(req.params.id));
    res.json(seat);
});
app.post('/seats', (req, res) => {
    const { day, seat, client, email } = req.body;
    const newSeats = { id: uuidv4(), day, seat, client, email };
    db.seats.push(newSeats);
    res.json({ message: 'OK' });
});
app.delete('/seats/:id', (req, res) => {
    const seat = db.seats.find(seat => seat.id === parseInt(req.params.id));
    db.seats.splice(seat, 1);
    res.json({ message: 'OK' });
});
app.put('/seats/:id', (req, res) => {
    const { day, seat, client, email } = req.body;
    const seatSelect = db.seats.find(seat => seat.id === parseInt(req.params.id));
    seatSelect.day = day;
    seatSelect.seat = seat;
    seatSelect.client = client;
    seatSelect.email = email;
    res.json({ message: 'OK' });
});

//wrong adress
app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
});