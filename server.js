const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');
const db = require('./db');

app.listen(8000, () => {
    console.log('server on port 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
});