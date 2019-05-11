const express = require('express');
// require the Exercise model from database
const { Workout, Exercise } = require('../database');
const router = express.Router();

// GET all workouts
router.get('/', async (req, res, next) => {
  try {
    res.json(await Workout.findAll({
      // include the Exercise model
      include: {
        model: Exercise
      }
    }));
  } catch (err) {
    next(err);
  }
});

// GET a single workout by id
router.get('/:id', async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(+req.params.id);
    if (!workout) return res.sendStatus(404);
    res.json(workout);
  } catch (err) {
    next(err);
  }
});

// POST a new workout
router.post('/', async (req, res, next) => {
  try {
    const { name, date } = req.body;
    res.status(201);
    res.json(await Workout.create({ name, date }));
  } catch (err) {
    next(err);
  }
});

// DELETE an Workout by id
router.delete('/:id', async (req, res, next) => {
  try {
    const workout = await Workout.findByPk(+req.params.id);
    if (!workout) return res.sendStatus(404);
    await workout.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
