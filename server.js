const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.listen(8000, () => {
    console.log('server on port 8000');
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = [
    { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
    { id: 2, author: 'Amanda Doe', text: 'They really know how to make you happy.' },
];

app.get('/testimonials', (req, res) => {
    res.json(db);
});

app.get('/testimonials/:id', (req, res) => {
    const testimonial = db.find(testimonial => testimonial.id === parseInt(req.params.id));
    res.json(testimonial);
});

app.get('/testimonials/random', (req, res) => {
    const randomIndex = Math.floor(Math.random() * db.length);
    const random = db[randomIndex];
    res.json(random);
});

app.post('/testimonials', (req, res) => {
    const { author, text } = req.body;
    const newTestimonial = { id: uuidv4(), author, text };
    db.push(newTestimonial);
    res.json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
    const { author, text } = req.body;
    const testimonial = db.find(testimonial => testimonial.id === parseInt(req.params.id));
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
    const testimonial = db.find(testimonial => testimonial.id === parseInt(req.params.id));
    db.splice(testimonial, 1);
    res.json({ message: 'OK' });
});

app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
});