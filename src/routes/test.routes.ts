import { Router } from 'express'
import { balanceController } from '../controllers/test.controller'


const router = Router()

router.get('/balance/:token/:user/:chain', balanceController)

