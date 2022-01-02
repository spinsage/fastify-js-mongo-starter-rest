const fastify = require("fastify")

const serverConfig = {
    logger: {
        prettyPrint: true
    }
}

const server = fastify(serverConfig)

server.register(require('./src/plugins/config'))
server.register(require('./src/plugins/db'))
server.register(require('./src/routes'))

const startSever = async () => {
    await server.ready()
    server.listen(server.config.SERVER_PORT, '0.0.0.0', (err) => {
        if (err) {
            server.log.error(err)
            process.exit(1)
        }
    })
}

startSever()
