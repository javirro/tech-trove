import { ChainId, getWeb3 } from './web3'

interface TransactionInfo {
  readonly blockHash: string
  readonly blockNumber: bigint
  readonly cumulativeGasUsed?: bigint
  readonly effectiveGasPrice?: bigint | undefined
  readonly from: string
  readonly gasUsed: bigint
  readonly logs: any[]
  readonly logsBloom: string
  readonly status: bigint
  readonly to: string
  readonly transactionIndex: bigint
  readonly type?: bigint
}
export const getTransactionInfoFromHash = async (hash: string, chain: ChainId = '0x1'): Promise<TransactionInfo> => {
  const web3 = getWeb3(chain)
  const transaction: TransactionInfo = await web3.eth.getTransactionReceipt(hash)
  return transaction
}
