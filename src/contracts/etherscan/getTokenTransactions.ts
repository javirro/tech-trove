import { getWeb3 } from '../web3'

const getTokenTransactions = async (address: string, startBlockNumber?: number, endBlockNumber?: number): Promise<string[]> => {
  const web3 = getWeb3('0x1')
  const lastCreatedBlock: string = (await web3.eth.getBlockNumber()).toString()
  const startBlock: number = startBlockNumber ?? parseFloat(lastCreatedBlock) - 50
  const endBlock: number = endBlockNumber ?? parseFloat(lastCreatedBlock)
  const url = `https://api.etherscan.io/api
?module=logs
&action=getLogs
&address=${address}
&fromBlock=${startBlock}
&toBlock=${endBlock}
&page=1
&offset=1000
&apikey=${process.env.ETHERSCAN_API_KEY}`
  const res = await fetch(url)
  const json = await res.json()
  const result = json.result
  const transactionHashes = result.map((tx: any) => tx.transactionHash)
  const uniqueTransactionHashes = [...new Set(transactionHashes)]
  if (uniqueTransactionHashes.length < 5) return uniqueTransactionHashes as string[]
  const last5TxHashes = uniqueTransactionHashes.slice(0, 5) as string[]
  return last5TxHashes
}

export default getTokenTransactions
