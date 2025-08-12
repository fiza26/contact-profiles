import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getContacts() {
    const [rows] = await pool.query('SELECT * FROM contacts')
    return rows
}

export async function addContact(name, email, phone, address) {
    const [result] = await pool.query(
        'INSERT INTO contacts (name, email, phone, address) VALUES (?, ?, ?, ?)',
        [name, email, phone, address]
    );
    return result
}

export async function updateContact(name, email, phone, address, id) {
    const [result] = await pool.query(
        'UPDATE contacts SET name = ?, email = ?, phone = ?, address = ? WHERE id = ?',
        [name, email, phone, address, id]
    );
    return result
}

export async function deleteContact(id) {
    const [result] = await pool.query('DELETE FROM contacts WHERE id = ?', [id])
    return result
}



