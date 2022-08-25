import Config from '@lib/config'
import * as Mongo from 'mongodb'

export async function Database(collection: 'users') {
    const client: Mongo.MongoClient = new Mongo.MongoClient(`mongodb://${Config.mongo.host}`)
    await client.connect()

    const db: Mongo.Db = client.db(Config.mongo.database)

    const Collection: Mongo.Collection = db.collection(collection)

    return Collection
}