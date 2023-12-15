import { ObjectId } from "mongodb"
import { dbo } from "../utils/db.js"

export async function createInvoices(req, res) {
    const references = req.body.map(item => new ObjectId(item._id))
    const refInvoice = {
        kunde: 'Karl der Käufer',
        datum: Date.now(),
        artikel: references
    }

    const embededInvoice = {
        kunde: 'Marta Mysterium',
        datum: Date.now(),
        artikel: req.body
    }
    try {
        await dbo.collection('refinvoice').insertOne(refInvoice)
        await dbo.collection('embeddedinvoice').insertOne(embededInvoice)
    } catch (err) {
        console.log(err)
    }
    res.end()

}

export async function getInvoice(req, res) {
    const resultEmbedded = await dbo.collection('embeddedinvoice').aggregate([
        {
            $set: {
                gesamtpreis: { $sum: '$artikel.articleprice' }
            }
        }
    ]).toArray()

    const resultRef = await dbo.collection('refinvoice').aggregate([
        {
            $lookup: {
                from: 'article',
                localField: 'artikel',
                foreignField: '_id',
                as: 'detail'
            },
        }, {


            $set: {
                gesamtpreis: { $sum: '$detail.articleprice' }
            }
        }
    ]).toArray()
    console.log('ref', resultRef)
    console.log('emebd', resultEmbedded)
    const orders = { ref: resultRef, emb: resultEmbedded }
    res.json(orders)
}