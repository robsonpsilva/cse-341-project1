const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=["Users"]
    const result = await mongodb.getDatabase().db().collection("contacts").find();
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts);
    });
};

const getSingle = async (req, res) => {
    //#swagger.tags=["Users"]
    const contactId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection("contacts").find({_id:contactId});
    result.toArray().then((contacts) => {
        res.setHeader("Content-Type", "application/json");
        res.status(200).json(contacts[0]);
    });  
};

const insertContact = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;
    
        // Validação básica
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields are required." });
        }
    
        // Obter referência da coleção do MongoDB
        const contactsCollection = await mongodb.getDatabase().db().collection("contacts");
    
        // Inserir os dados na coleção
        const newContact = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday, // Certifique-se de enviar uma data válida
        };
    
        const result = await contactsCollection.insertOne(newContact);
    
        // Retorna a resposta de sucesso
        res.status(201).json({
            message: "Contact saved successfully",
            contactId: result.insertedId,
        });
    } catch (error) {
        console.error("Error saving contact:", error);
        res.status(500).json({ error: "Failed to save contact" });
    }
};

const deleteContact = async (req, res) => {
    //#swagger.tags=["Users"]
    try {
        const { id } = req.params; // Obtém o ID da URL

        // Verificar se o ID é válido
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        // Obter referência à coleção do MongoDB
        const contactsCollection = await mongodb.getDatabase().db().collection("contacts");

        // Excluir o contato com o ID fornecido
        const result = await contactsCollection.deleteOne({ _id: new ObjectId(id) });

        // Verificar se o contato foi encontrado e excluído
        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "Contact not found." });
        }

        // Responder com sucesso
        res.status(200).json({ message: "Contact deleted successfully." });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).json({ error: "Failed to delete contact." });
    }
};


// Função para atualizar um contato
const updateContact = async (req, res) => {
    try {
        const { id } = req.params; // ID do registro a ser atualizado
        const { firstName, lastName, email, favoriteColor, birthday } = req.body;

        // Valida o formato do ID
        if (!ObjectId.isValid(id)) {
            return res.status(400).json({ error: "Invalid ID format." });
        }

        // Valida os dados enviados pelo cliente
        if (!firstName || !lastName || !email || !favoriteColor || !birthday) {
            return res.status(400).json({ error: "All fields are required." });
        }

        // Obter a coleção do MongoDB
        const contactsCollection = await mongodb.getDatabase().db().collection("contacts");

        // Dados a serem atualizados
        const updatedData = {
            firstName,
            lastName,
            email,
            favoriteColor,
            birthday,
        };

        // Atualizar o contato pelo ID
        const result = await contactsCollection.updateOne(
            { _id: new ObjectId(id) }, // Filtro pelo ID
            { $set: updatedData } // Atualização parcial
        );

        // Verifica se o registro foi encontrado e atualizado
        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "Contact not found." });
        }

        res.status(200).json({ message: "Contact updated successfully." });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).json({ error: "Failed to update contact." });
    }
};


module.exports = {
    getAll,
    getSingle,
    insertContact,
    deleteContact,
    updateContact
};