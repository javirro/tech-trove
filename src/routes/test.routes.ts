import { Router } from 'express'
import { balanceController, nftMetadataController, transactionController } from '../controllers/test.controller'


const router = Router()

router.get('/balance/:token/:user/:chain', balanceController)
router.get('/metadata/:nft/:id', nftMetadataController)
router.get('/transactions/:address/:start/:end', transactionController)

export default router