const Concert = require("../models/concert.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Concert.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (!conc) res.status(404).json({ message: "Not found" });
    else res.json(conc);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPerformer = async (req, res) => {
  try {
    const performerName = req.params.performer;
    const regex = new RegExp(performerName.split("").join(".*"), "i");
    const concerts = await Concert.find({ performer: regex });

    if (!concerts || concerts.length === 0)
      res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByGenre = async (req, res) => {
  try {
    const genreName =
      req.params.genre[0].toUpperCase() +
      req.params.genre.slice(1).toLowerCase();
    const concerts = await Concert.find({ genre: genreName });
    if (!concerts || concerts.length === 0)
      res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByPrice = async (req, res) => {
  try {
    const min = req.params.price_min;
    const max = req.params.price_max;
    const concerts = await Concert.find({ price: { $gte: min, $lte: max } });
    if (!concerts || concerts.length === 0)
      res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getByDay = async (req, res) => {
  try {
    const concerts = await Concert.find({ day: req.params.day });
    if (!concerts || concerts.length === 0)
      res.status(404).json({ message: "Not found" });
    else res.json(concerts);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.post = async (req, res) => {
  try {
    const { performer, genre, price, day, image } = req.body;
    const newConcert = new Concert({
      performer: performer,
      genre: genre,
      price: price,
      day: day,
      image: image,
    });
    await newConcert.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.delete = async (req, res) => {
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      await Concert.deleteOne({ _id: req.params.id });
      res.json({ message: "OK", conc });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.putById = async (req, res) => {
  const { performer, genre, price, day, image } = req.body;
  try {
    const conc = await Concert.findById(req.params.id);
    if (conc) {
      conc.performer = performer;
      conc.genre = genre;
      conc.price = price;
      conc.day = day;
      conc.image = image;
      await conc.save();
      res.json({ message: "OK", conc });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};