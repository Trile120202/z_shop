import { NextApiRequest, NextApiResponse } from 'next';
import knex from 'knex';
import knexConfig from '../../../knexfile';
import { StatusCode } from "@/lib/statusCodes";
import { transformResponse } from "@/lib/interceptors/transformInterceptor";

const db = knex(knexConfig);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const offset = (page - 1) * limit;

            const [tags, totalResult] = await Promise.all([
                db('tags')
                    .select('*')
                    .where('status', 1)
                    .limit(limit)
                    .offset(offset),
                db('tags').where('status', 1).count('* as count').first()
            ]);

            const total = totalResult?.count as number;
            const totalPages = Math.ceil(total / limit);

            res.status(StatusCode.OK).json(transformResponse({
                data: {
                    tags,
                    pagination: {
                        currentPage: page,
                        totalPages,
                        totalItems: total,
                        itemsPerPage: limit
                    }
                },
                message: 'Tags retrieved successfully.',
                statusCode: StatusCode.OK,
            }));
        } catch (error) {
            console.error(error);
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(transformResponse({
                data: null,
                message: 'An error occurred while retrieving tags.',
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            }));
        }
    } else if (req.method === 'POST') {
        try {
            const { name } = req.body;

            if (!name) {
                return res.status(StatusCode.BAD_REQUEST).json(transformResponse({
                    data: null,
                    message: 'Tag name is required.',
                    statusCode: StatusCode.BAD_REQUEST,
                }));
            }

            const existingTag = await db('tags').where('name', name).first();
            if (existingTag) {
                return res.status(StatusCode.CONFLICT).json(transformResponse({
                    data: null,
                    message: 'Tag with this name already exists.',
                    statusCode: StatusCode.CONFLICT,
                }));
            }

            const [newTag] = await db('tags')
                .insert({ name, status: 1 })
                .returning('*');

            res.status(StatusCode.CREATED).json(transformResponse({
                data: newTag,
                message: 'Tag created successfully.',
                statusCode: StatusCode.CREATED,
            }));
        } catch (error) {
            console.error(error);
            return res.status(StatusCode.INTERNAL_SERVER_ERROR).json(transformResponse({
                data: null,
                message: 'An error occurred while creating the tag.',
                statusCode: StatusCode.INTERNAL_SERVER_ERROR,
            }));
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        return res.status(StatusCode.METHOD_NOT_ALLOWED).end(`Method ${req.method} Not Allowed`);
    }
}
