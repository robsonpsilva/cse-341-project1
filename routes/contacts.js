const express = require("express");
const router = express.Router();
const { createContact } = require('../controllers/contacts');

const contactsController =  require("../controllers/contacts");

router.get("/", contactsController.getAll);
router.get("/:id", contactsController.getSingle);
router.put('/', createContact);

module.exports = router;


// Rota para lidar com o método PUT e criar um contato


