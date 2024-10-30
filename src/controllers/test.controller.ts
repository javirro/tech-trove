import { Request, Response } from 'express'
import { getTokenBalance } from '../contracts/getTokenBalance'
import { ChainId } from '../contracts/web3'
import { getNftMetadata, NftMetadata } from '../contracts/getNftMetadata'
import { addNftMetadata, addTransactionInfo } from '../db/manageDbData'
import getTokenTransactions from '../contracts/etherscan/getTokenTransactions'
import { getTransactionInfoFromHash, TransactionInfo } from '../contracts/getTransactionInfoFromHash'
import getBlockNumberByTimestamp from '../contracts/etherscan/getBlockNumberByTimestamp'

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

export const nftMetadataController = async (req: Request, res: Response) => {
  try {
    const { nft, id, chain } = req.params
    if (!nft || !id) {
      res.status(400).json({ message: 'Missing required parameters' })
      return
    }
    const validChains: ChainId[] = ['0x1', '0x38', '0x42161']
    if (chain && !validChains.includes(chain as ChainId)) {
      res.status(400).json({ message: 'Invalid chain' })
      return
    }

    const chainUsed = chain ?? '0x1'
    const nftMetadata: NftMetadata = await getNftMetadata(chainUsed as ChainId, nft, id)
    await addNftMetadata(nftMetadata.name, nftMetadata.description, nftMetadata.image)
    res.status(200).json(nftMetadata)
  } catch (error) {
    console.error('Error getting nft controller:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}

export const transactionController = async (req: Request, res: Response) => {
  try {
    const { address, start, end } = req.params
    if (!address) {
      res.status(400).json({ message: 'Bad request. Missing required parameters' })
      return
    }
    let startBlockNumber: number | undefined = undefined
    let endBlockNumber: number | undefined = undefined
    if (start && !isNaN(parseFloat(start))) startBlockNumber = await getBlockNumberByTimestamp(+start)
    if (end && !isNaN(parseFloat(end))) endBlockNumber = await getBlockNumberByTimestamp(+end)

    const txHashes: string[] = await getTokenTransactions(address, startBlockNumber, endBlockNumber)
    const txsInformationResult: TransactionInfo[] = []
    let i = 0
    for (const tx of txHashes) {
      const txInfo = await getTransactionInfoFromHash(tx)
      txsInformationResult.push(txInfo)
      try {
        await addTransactionInfo(txInfo)
      } catch (error) {
        console.error('Error saving transaction info:', error)
      }
    }
    res.status(200).json(txsInformationResult)
  } catch (error) {
    console.error('Transaction controller error:', error)
    res.status(500).json({ message: 'Internal server error' })
  }
}
