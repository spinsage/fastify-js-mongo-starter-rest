const fastifyPlugin = require('fastify-plugin')
const mongoDb = require('fastify-mongodb')

const getConnectionString = (config) => {
    return `mongodb://${config.MONGO_HOST}:${config.MONGO_PORT}/${config.MONGO_DB_NAME}`
}

const dbConnector = async (server, options, next) => {

    const dbConfig = {
        forceClose: true,
        url: getConnectionString(server.config)
    }

    server.register(mongoDb, dbConfig).ready(() => {
        server.log.info('DB Ready')
        next()
    })
}

module.exports = fastifyPlugin(dbConnector)