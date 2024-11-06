const express = require("express");
const router = express.Router();

const Seat = require("../models/seat.model");

router.get("/seats", async (req, res) => {
  try {
    res.json(await Seat.find());
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.get("/seats/:id", async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: "Not found" });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.post("/seats", async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.json({ message: "OK" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.delete("/seats/:id", async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: "OK", seat });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put("/seats/:id", async (req, res) => {
  const { day, seat, client, email } = req.body;
  try {
    const sea = await Seat.findById(req.params.id);
    if (sea) {
      sea.day = day;
      sea.seat = seat;
      sea.client = client;
      sea.email = email;
      await sea.save();
      res.json({ message: "OK", sea });
    } else res.status(404).json({ message: "Not found" });
  } catch (err) {
    res.status(500).json({ message: err });
  }
});

module.exports = router;