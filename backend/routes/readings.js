const router = require("express").Router();
let Reading = require("../models/reading.model");

// GET request
router.route("/").get((req, res) => {
  Reading.find()
    .then(readings => res.json(readings))
    .catch(err => res.status(400).json("Error: " + err));
});

// POST new readings
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newReading = new Reading({
    username,
    description,
    duration,
    date
  });

  newReading
    .save()
    .then(() => res.json("Reading added"))
    .catch(err => res.status(400).json("Error: " + err));
});

// GET SPECIFIC READING by id
router.route("/:id").get((req, res) => {
  Reading.findById(req.params.id)
    .then(reading => res.json(reading))
    .catch(err => res.status(400).json("Error: " + err));
});

// DELETE
router.route("/:id").delete((req, res) => {
  Reading.findByIdAndDelete(req.params.id)
    .then(reading => res.json("Reading deleted"))
    .catch(err => res.status(400).json("Error: " + err));
});

// UPDATE
router.route("/update/:id").post((req, res) => {
  Reading.findById(req.params.id)
    .then(reading => {
      reading.username = req.body.username;
      reading.description = req.body.description;
      reading.duration = Number(req.body.duration);
      reading.date = Date.parse(req.body.date);

      reading
        .save()
        .then(() => res.json("Reading updated"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router;
