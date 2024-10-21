const express = require('express');
const router = express.Router();
const db = require('./../db');
const { v4: uuidv4 } = require('uuid');
router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
});
router.route('/testimonials/random').get((req, res) => {
    const randomIndex = Math.floor(Math.random() * db.testimonials.length);
    const random = db.testimonials[randomIndex];
    res.json(random);
});
router.route('/testimonials/:id').get((req, res) => {
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    res.json(testimonial);
});
router.route('/testimonials').post((req, res) => {
    const { author, text } = req.body;
    const newTestimonial = { id: uuidv4(), author, text };
    db.testimonials.push(newTestimonial);
    res.json({ message: 'OK' });
});
router.route('/testimonials/:id').put((req, res) => {
    const { author, text } = req.body;
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    testimonial.author = author;
    testimonial.text = text;
    res.json({ message: 'OK' });
});
router.route('/testimonials/:id').delete((req, res) => {
    const testimonial = db.testimonials.find(testimonial => testimonial.id === parseInt(req.params.id));
    db.testimonials.splice(testimonial, 1);
    res.json({ message: 'OK' });
});
module.exports = router;