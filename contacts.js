const { readFile, writeFile } = require('fs/promises')
const path = require('path')
const { nanoid } = require('nanoid')
const contactsPath = path.join(__dirname, 'db', 'contacts.json')

const getContacts = async () => {
	const result = await readFile(contactsPath)
	return JSON.parse(result)
}

async function listContacts() {
	return await getContacts()
}

async function getContactById(contactId) {
	const contacts = await getContacts()
	const result = contacts.find(({ id }) => id === contactId)
	return result || null
}

async function removeContact(contactId) {
	const contacts = await getContacts()
	const index = contacts.findIndex(({ id }) => id === contactId)

	if (index === -1) return null

	const [result] = contacts.splice(index, 1)
	writeFile(contactsPath, JSON.stringify(contacts, null, 2))
	return result
}

async function addContact({ name, email, phone }) {
	const contacts = await getContacts()
	const newContact = { name, email, phone, id: nanoid() }

	contacts.push(newContact)

	writeFile(contactsPath, JSON.stringify(contacts, null, 2))

	return newContact
}

module.exports = {
	addContact,
	removeContact,
	getContactById,
	listContacts,
}
