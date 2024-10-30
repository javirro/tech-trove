import { ChainId, getWeb3 } from './web3'

export interface TransactionInfo {
  readonly blockHash: string
  readonly blockNumber: string
  readonly cumulativeGasUsed?: string
  readonly effectiveGasPrice?: string | undefined
  readonly from: string
  readonly gasUsed: string
  readonly logsBloom: string
  readonly status: string
  readonly to: string
  readonly transactionIndex: string
  readonly type?: string
  readonly transactionHash: string
}
export const getTransactionInfoFromHash = async (hash: string, chain: ChainId = '0x1'): Promise<TransactionInfo> => {
  const web3 = getWeb3(chain)
  const transaction = await web3.eth.getTransactionReceipt(hash)
  const formatedTransaction: TransactionInfo = {
    blockHash: transaction.blockHash,
    blockNumber: transaction.blockNumber.toString(),
    from: transaction.from,
    gasUsed: transaction.gasUsed.toString(),
    status: transaction.status.toString(),
    to: transaction.to,
    transactionIndex: transaction.transactionIndex.toString(),
    transactionHash: transaction.transactionHash,
    logsBloom: transaction.logsBloom,
    type: transaction.type?.toString()
  }
  return formatedTransaction
}
