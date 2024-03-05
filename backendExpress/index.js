const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

function createContact(id, firstName, lastName, email) {
    return {
        id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
    };
}

let contacts = [
    createContact(1, "Collin", "Campbell", "cc@gmail.com")
];

app.get('/contacts', (req, res) => {
    res.status(200).json({ "contacts": contacts });
});

app.post('/create_contact', (req, res) => {
    const data = req.body;
    if (data.firstName && data.lastName && data.email) {
        contacts.push(createContact(contacts.length + 1, data.firstName, data.lastName, data.email));
        res.status(201).json({"message": "Message Created"});
    } else {
        res.status(400).json({"message": "You must include a first name, last name, or email"});
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
