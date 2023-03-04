import { FastifyPluginAsync } from 'fastify'
import { db } from '../app'

const root: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/', async function (request, reply) {
    return { root: true }
  })

  fastify.get('/covers-list', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', '*');
    const covers = await db.query('SELECT name FROM covers;');
    return covers.rows;
  });

  fastify.get('/random-cover', async (request, reply) => {
    reply.header('Access-Control-Allow-Origin', '*');
    reply.header('Access-Control-Allow-Methods', '*');
    const covers = await db.query('SELECT name FROM covers ORDER BY RANDOM() LIMIT 1;');
    return covers.rows[0];
  });
}

export default root;
