import { Request, Response } from 'express'
import { getTokenBalance } from '../contracts/getTokenBalance'
import { ChainId } from '../contracts/web3'

export const balanceController = async (req: Request, res: Response) => {
  try {
    const { token, user, chain } = req.params
    if (!token || !user) {
      res.status(400).json({ message: 'Missing required parameters' })
      return
    }
    const validChains: ChainId[] = ['0x1', '0x38', '0x42161']
    if (chain && !validChains.includes(chain as ChainId)) {
      res.status(400).json({ message: 'Invalid chain' })
      return
    }

    const chainUsed = chain ?? '0x1'
    const balanceRes = await getTokenBalance(chainUsed as ChainId, token, user)
    res.status(200).json(balanceRes)
  } catch (error) {
    console.error('Balance controller error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
export const testController = (req: Request, res: Response) => {
  try {
    console.log('Test controller called')
    res.status(200).json({ message: 'Test controller called' })
  } catch (error) {
    console.error('Test controller error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
