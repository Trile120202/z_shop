import { NextApiRequest, NextApiResponse } from 'next';
import knex from 'knex';
import bcrypt from 'bcrypt';
import knexConfig from '../../../knexfile';

const db = knex(knexConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password, email, firstName, lastName } = req.body;

        if (!username || !password || !email) {
            return res.status(400).json({ error: 'Username, password, and email are required.' });
        }

        try {
            const existingUser = await db('users').where('username', username).orWhere('email', email).first();
            if (existingUser) {
                return res.status(409).json({ error: 'Username or email already exists.' });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const [id] = await db('users').insert({
                username,
                password: hashedPassword,
                email,
                first_name: firstName,
                last_name: lastName,
            }).returning('id');

            res.status(201).json({ id, username, email, firstName, lastName });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Failed to register user.' });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
