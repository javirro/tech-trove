import { Router } from 'express'
import { balanceController, nftMetadataController } from '../controllers/test.controller'


const router = Router()

router.get('/balance/:token/:user/:chain', balanceController)
router.get('/metadata/:nft/:id', nftMetadataController)

