const router = require('express').Router();

router.get("/", (req,res) => {res.send("Hello  World - BYU! type https://cse-341-project1-t08e.onrender.com/contacts para obter todos os contatos, ou https://cse-341-project1-t08e.onrender.com/contacts/67ca09d206dd9a333bc7be0e para recuperar o contato com id 67ca09d206dd9a333bc7be0e .");});
router.use('/contacts', require('./contacts'));

module.exports = router;