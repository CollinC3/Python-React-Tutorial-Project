const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = 5000;
const uri = 'mongodb+srv://CollinC3:<password>@test-for-full-stack.xmzfkxh.mongodb.net/?retryWrites=true&w=majority&appName=Test-for-Full-Stack'
// app.use(express.json());
// app.use(cors());

mongoose.connect(uri);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
    console.log("Connected to DB");
    addToDB();
});


// const userSchema = new mongoose.Schema({
//     _id: Number,
//     firstName: String,
//     lastName: String,
//     email: String
// });

// const userModel = mongoose.model('contacts', userSchema);

// console.log(userModel.find());

// app.get("/getUsers", async (req, res) => {
//     const userData = await db.collection('contacts').find();
//     res.json(userData);
// })

function addToDB() {
    const contact = createContact(1, "Collin", "Campbell", "cc@gmail.com")
    db.collection('contacts').insertOne(contact);
}

function createContact(id, firstName, lastName, email) {
    return {
        _id: id,
        firstName: firstName,
        lastName: lastName,
        email: email,
    };
}

// app.get('/contacts', (req, res) => {

//     res.status(200).json({ "contacts": contacts });
// });

// app.post('/create_contact', (req, res) => {
//     const data = req.body;
//     if (data.firstName && data.lastName && data.email) {
//         contacts.push(createContact(contacts.length + 1, data.firstName, data.lastName, data.email));
//         res.status(201).json({ "message": "Message Created" });
//     } else {
//         res.status(400).json({ "message": "You must include a first name, last name, or email" });
//     }
// });

// app.patch('/update_contact/:id', (req, res) => {
//     const body = req.body;
//     let indContact = contacts.findIndex(obj => obj.id == req.params.id);
//     if (!contacts[indContact]) {
//         res.status(400).json({ "message": "User Not found" });
//     } else {
//         contacts[indContact].firstName = body.firstName;
//         contacts[indContact].lastName = body.lastName;
//         contacts[indContact].email = body.email;
//         res.status(200).json({ "message": "User Updated" });
//     }

// });

// app.delete('/delete_contact/:id', (req, res) => {
//     let indContact = contacts.findIndex(obj => obj.id == req.params.id);
//     if (!contacts[indContact]) {
//         res.status(400).json({ "message": "User Not found" });
//     } else {
//         if (contacts.length == 1) {
//             contacts.pop();
//         } else {
//             contacts.splice(indContact, indContact)
//         }
//         res.status(200).json({ "message": "User Deleted" });
//     }
//     console.log(contacts);
// })

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
