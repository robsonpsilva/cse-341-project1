const express = require("express");
const router = express.Router();

const contactsController =  require("../controllers/contacts");


router.get("/contacts", contactsController.getAll); // Rota para buscar todos os contatos
router.get("/contacts/:id", contactsController.getSingle); // Rota para buscar um contato pelo ID
router.put("/inputcontact", contactsController.upsertContact); // Rota para criar/atualizar contato

module.exports = router;