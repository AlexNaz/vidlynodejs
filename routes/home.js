const express = require('express');
const router = express.Router();

const homeData = 'node_test';

router.get('/', (req, res) => {
  res.send(homeData);
});

module.exports = router;