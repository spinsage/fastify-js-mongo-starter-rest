const { v4: uuidv4 } = require('uuid')

const routes = async (server) => {

    server.get("/contacts/:id", async (request, response) => {
        const contact = await server.mongo.db.collection('contacts').findOne({
            uid: request.params.id
        }, { projection: { _id: 0 } })

        if (!contact) {
            return response.status(400).send()
        } else {
            return response.send(contact)
        }
    })

    server.post("/contacts", async (request, response) => {
        request.body.uid = uuidv4().replace(/-/g, '')
        const insertResponse = await server.mongo.db.collection('contacts').insertOne(
            request.body
        )
        const createdContact = await server.mongo.db.collection('contacts').findOne({
            _id: insertResponse.insertedId
        }, { projection: { _id: 0 } })

        return response.send(createdContact)
    })

    server.delete("/contacts/:id", async (request, response) => {

        const deletedContact = await server.mongo.db.collection('contacts').deleteOne({
            uid: request.params.id
        })

        if (deletedContact.deletedCount === 1) {
            return response.status(200).send()
        } else {
            return response.status(400).send()
        }
    })

    server.put("/contacts/:id", async (request, response) => {
        const updatedContact = await server.mongo.db.collection('contacts').updateOne({
            uid: request.params.id
        }, { $set: request.body })

        if (updatedContact.modifiedCount === 1) {
            return response.status(200).send()
        } else {
            return response.status(400).send()
        }
    })
}

module.exports = routes
