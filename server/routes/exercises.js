const express = require('express');
const { Exercise } = require('../database');
const router = express.Router();

// GET all exercises
router.get('/', async (req, res, next) => {
  try {
    res.json(await Exercise.findAll());
  } catch (err) {
    next(err);
  }
});

// GET a single exercise by id
router.get('/:id', async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(+req.params.id);
    if (!exercise) return res.sendStatus(404);
    res.json(exercise);
  } catch (err) {
    next(err);
  }
});

// POST a new exercise
router.post('/', async (req, res, next) => {
  try {
    const { name, completed, description } = req.body;
    res.status(201);
    res.json(await Exercise.create({ name, completed, description }));
  } catch (err) {
    next(err);
  }
});

// PATCH an existing exercise
router.patch('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedFields = req.body;
    const exercise = await Exercise.findByPk(id);
    // if (!exercise) return res.sendStatus(404);
    exercise.update(updatedFields);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
/** PATCH an existing exercise
router.patch('/:id', (req, res, next) => {
  try {
    const { id } = req.params
    const { updatedFields } = req.body

    Exercise.update({ ...updatedFields }, { where: { id } })
    res.sendStatus(204)
  } catch (err) {
    next(err)
  }
}) */

// DELETE an exercise by id
router.delete('/:id', async (req, res, next) => {
  try {
    const exercise = await Exercise.findByPk(+req.params.id);
    if (!exercise) return res.sendStatus(404);
    await exercise.destroy();
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
