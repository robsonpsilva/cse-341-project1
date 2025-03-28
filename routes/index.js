const router = require('express').Router();

router.get("/", (req,res) => {res.send(`<html>
            <head>
                <title>Robson Paulo da Silva</title>
            </head>
            <body>
                <h1>Welcome to Project: Contacts Part 2 Exercise</h1>
                <p>Click on the links below</p>
                <ul>
                    <li><a href=https://cse-341-project1-t08e.onrender.com/contacts>All contacts</a>></li>
                    <li><a href=https://cse-341-project1-t08e.onrender.com/contacts/67ca09d206dd9a333bc7be0e>Contact Id: ca09d206dd9a333bc7be0e </a></li>
                </ul>
            </body>
        </html>`);});

const contactsController = require("../controllers/contacts");
const validation = require("../middleware/validate");

router.use("/",require("./swagger"));
// Rotas para contatos
router.get(
    //#swagger.tags=[`Get all contacts `]
    "/contacts", contactsController.getAll); // Route to search all contacts
router.get("/contacts/:id", validation.saveContact, contactsController.getSingle); // Route to search for a contact by ID
router.post("/contacts", validation.saveContact, contactsController.insertContact); // Route to create contact
router.put("/contacts/:id", contactsController.updateContact);//route to update contact
router.delete("/contacts/:id", contactsController.deleteContact); //Route to delete contact

module.exports = router;