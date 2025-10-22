const express = require('express');
const redis = require('../redis')
const configs = require('../util/config')
const router = express.Router();

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async (_, res) => {
  let added_todos = await redis.getAsync('added_todos');


  if (added_todos === null) {
    added_todos = 0
    await redis.setAsync('added_todos', added_todos)
  }

  res.send({ added_todos: Number(added_todos) });
});

module.exports = router;
