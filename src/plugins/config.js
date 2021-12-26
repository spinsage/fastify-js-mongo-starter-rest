const fastifyPlugin = require('fastify-plugin')
const fastifyEnv = require('fastify-env')

const schema = {
    type: 'object',
    required: ['SERVER_PORT', 'MONGO_HOST', 'MONGO_PORT', 'MONGO_DB_NAME'],
    properties: {
        SERVER_PORT: {
            type: 'string',
            default: 3001
        },
        MONGO_HOST: {
            type: 'string'
        },
        MONGO_PORT: {
            type: 'number'
        },
        MONGO_DB_NAME: {
            type: 'string'
        },
    }
}

const configReader = async (server, options, next) => {
    server
        .register(fastifyEnv, {
            dotenv: true,
            schema: schema
        })
        .ready((err) => {
            if (err) {
                server.log.error(err)
                process.exit(1)
            }
            next()
        })
}

module.exports = fastifyPlugin(configReader)