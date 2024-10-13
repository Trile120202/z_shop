import { NextApiRequest, NextApiResponse } from 'next';
import knex from 'knex';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import knexConfig from '../../../knexfile';
import { StatusCode } from "@/lib/statusCodes";
import { transformResponse } from "@/lib/interceptors/transformInterceptor";

const db = knex(knexConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(StatusCode.BAD_REQUEST).json(transformResponse( {
                data: null,
                message: 'Username and password are required.',
                statusCode: StatusCode.BAD_REQUEST,
            }));
        }

        try {
            const user = await db('users').where('username', username).first();

            if (!user) {
                return res.status(StatusCode.UNAUTHORIZED).json(transformResponse({
                    data: null,
                    message: 'Invalid username or password.',
                    statusCode: StatusCode.UNAUTHORIZED,
                }));
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(StatusCode.UNAUTHORIZED).json(transformResponse({
                    data: null,
                    message: 'Invalid username or password.',
                    statusCode: StatusCode.UNAUTHORIZED,
                }));
            }

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { password: _, ...userData } = user;

            const accessToken = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_SECRET || 'your-secret-key',
                { expiresIn: '1h' }
            );

            const refreshToken = jwt.sign(
                { userId: user.id, username: user.username },
                process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
                { expiresIn: '7d' }
            );

            await db('refresh_tokens').insert({
                user_id: user.id,
                token: refreshToken,
                expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });

            res.status(StatusCode.OK).json(transformResponse({
                data: { ...userData, accessToken, refreshToken },
                message: 'Logged in successfully.',
                statusCode: StatusCode.OK,
            }));
        } catch (error) {
            console.error(error);
            res.status(StatusCode.INTERNAL_SERVER_ERROR).json(transformResponse({
                data: null,
                message: 'Failed to login.',
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            }));
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(StatusCode.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
    }
}
