import express from 'express'
import { createInvoices, getInvoice } from './controller.js'

export const router = new express.Router()

router.post('/', createInvoices)
router.get('/', getInvoice)