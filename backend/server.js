import express from 'express'
import cors from 'cors'
import { getContacts, addContact, updateContact, deleteContact } from './database.js'

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Get request to the homepage')
})

// Get all contacts
app.get('/contacts', async (req, res) => {
    try {
        const contacts = await getContacts()
        res.json({ result: contacts })
    } catch (error) {
        console.error('Error fetching contacts:', error)
        res.status(500).json({ error: 'An error occured while fetching contacts' })
    }
})

// Add contact
app.post('/contacts', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body
        const newContact = await addContact(name, email, phone, address)
        res.json({ result: newContact })
    } catch (error) {
        console.log('Error adding new contact:', error)
        res.status(500).json({ error: 'An error occured while adding new contact' })
    }
})

// Update contact
app.put('/contacts/:id', async (req, res) => {
    try {
        const { name, email, phone, address } = req.body
        const { id } = req.params
        await updateContact(name, email, phone, address, id)
        res.status(200).json({ message: 'Contact updated' })
    } catch (error) {
        console.log('Error updating contact:', error)
        res.status(500).json({ error: 'An error occured while updating contact' })
    }
})

// Delete contact
app.delete('/contacts/:id', async (req, res) => {
    try {
        const { id } = req.params
        await deleteContact(id)
        res.status(200).json({ message: 'Contact deleted' })
    } catch (error) {
        console.log('Error deleting contact:', error)
        res.status(500).json({ error: 'An error occured while deleting contact' })
    }
})

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
})

