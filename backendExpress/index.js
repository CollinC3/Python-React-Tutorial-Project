const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const uri = 'mongodb+srv://CollinC3:Collsta1$@test-for-full-stack.xmzfkxh.mongodb.net/?retryWrites=true&w=majority&appName=Test-for-Full-Stack'
const Contact = require('./models/contactModal')

app.use(express.json());
app.use(cors());

//Connect to MongoDB
async function connect() {
    await mongoose.connect(uri);
    console.log("Connected to Database");
}

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find({});
        res.status(200).json({"contacts": contacts});
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }

});

app.post('/create_contact', async (req, res) => {
    try {
        const data = req.body;
        if (!data.firstName || !data.lastName || !data.email) {
            return res.status(400).json({ "message": "Please enter a first name, last name, and email" });
        }
        Contact.create(req.body);
        res.status(201).json({ "message": "Contact created" });
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }
});

app.patch('/update_contact/:id', async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndUpdate(id, req.body, { returnDocument: 'after' });
        if (!contact) {
            return res.status(404).json({ "message": "Cannot find contact" });
        }
        res.status(200).json({ "message": "Contact updated" });
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }
});

app.delete('/delete_contact/:id', async (req, res) => {
    try {
        const { id } = req.params
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ "message": "Cannot find contact" });
        }
        res.status(200).json({ "message": "Contact deleted" });
    } catch (error) {
        res.status(400).json({ "message": "Server Error" });
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

connect();
