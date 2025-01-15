import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'yourpassword',
    database: 'edunify'
});

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { name, address, city, state, contact, email_id, image } = req.body;
        if (!name || !address || !city || !state || !contact || !email_id || !image) {
            return res.status(400).json({ message: 'All fields are required!' });
        }
        try {
            await db.query(
                `INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [name, address, city, state, contact, email_id, image]
            );
            res.status(200).json({ message: 'School added successfully!' });
        } catch (error) {
            res.status(500).json({ message: 'Database error', error });
        }
    } else if (req.method === 'GET') {
        try {
            const [rows] = await db.query(`SELECT id, name, address, city, image FROM schools`);
            res.status(200).json(rows);
        } catch (error) {
            res.status(500).json({ message: 'Database error', error });
        }
    } else {
        res.setHeader('Allow', ['POST', 'GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
