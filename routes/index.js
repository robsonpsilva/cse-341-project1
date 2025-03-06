const router = require('express').Router();

router.get("/", (req,res) => {res.send("Hello  World - BYU - Paulo!");});
router.use('/contacts', require('./contacts'));

module.exports = router;