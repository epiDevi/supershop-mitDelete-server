import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { router as articleRouter } from './article/router.js'
import { router as invoiceRouter } from './invoice/router.js'

const app = express()
app.use(cors())
app.use(express.json())
app.use('/images', express.static('./images'))

app.use('/api/article', articleRouter)
app.use('/api/invoice', invoiceRouter)



app.listen(process.env.PORT)