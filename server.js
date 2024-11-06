const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

//import routes
const testimonialsRoutes = require('./routes/testimonials.routes');
const concertsRoutes = require('./routes/concerts.routes');
const seatsRoutes = require('./routes/seats.routes');

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use('/api', testimonialsRoutes);
app.use('/api', concertsRoutes);
app.use('/api', seatsRoutes);

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

// Find our app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

//wrong adress
app.use((req, res) => {
    res.status(404).json({ message: '404 not found...' });
});

// connects our backend code with the database
mongoose.connect('mongodb://0.0.0.0:27017/NewWaveDB', { useNewUrlParser: true });
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

const server = app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
});
const io = socket(server);

//listen to socket

io.on('connection', (socket) => {
    console.log('New socket ' + socket.id);
});