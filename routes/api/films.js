const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.post('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.put('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

router.delete('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

module.exports = router;