const mongoose = require('mongoose');
const contactSchema = mongoose.Schema (
    {
        firstName: {
            type: String,
            required: [true, "Please enter a first name."]
        },
        lastName: {
            type: String,
            required: [true, "Please enter a last name."]
        },
        email: {
            type: String,
            required: [true, "Please enter a email."]
        }
    }
)

const Contact = mongoose.model('Contacts', contactSchema)

module.exports = Contact;