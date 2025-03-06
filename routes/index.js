const router = require('express').Router();

router.get("/", (req,res) => {res.send("Hello  World - BYU!");});
router.use('/users', require('./users'));

module.exports = router;