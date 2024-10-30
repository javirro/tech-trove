import mongoose from 'mongoose'
import { nftMetadataSchema, transactionInfoSchema } from './schemas'
import { TransactionInfo } from '../contracts/getTransactionInfoFromHash'

export const addNftMetadata = async (name: string, description: string, image: string) => {
  const NftMetadata = mongoose.model('NftMetadata', nftMetadataSchema)

  const existingMetadata = await NftMetadata.findOne({ name, description, image })
  if (existingMetadata) {
    console.log('Metadata already exists. Do not save again.')
    return
  }
  const nftMetadata = new NftMetadata({ name, description, image })
  await nftMetadata.save()
}

export const addTransactionInfo = async (transactionInfo: TransactionInfo) => {
  const formatedTransaction = {
    from: transactionInfo.from,
    to: transactionInfo.to,
    transactionHash: transactionInfo.transactionHash,
    blockHash: transactionInfo.blockHash,
    blockNumber: transactionInfo.blockNumber,
    gasUsed: transactionInfo.gasUsed,
    status: transactionInfo.status,
    transactionIndex: transactionInfo.transactionIndex,
    type: transactionInfo.type
  }
  const TransactionInfo = mongoose.model('TransactionInfo', transactionInfoSchema)

  const existingTransaction = await TransactionInfo.findOne({ transactionHash: transactionInfo.transactionHash })
  if (existingTransaction) {
    console.log('Transaction already exists. Do not save again.')
    return
  }
  const transaction = new TransactionInfo(formatedTransaction)
  await transaction.save()
}
