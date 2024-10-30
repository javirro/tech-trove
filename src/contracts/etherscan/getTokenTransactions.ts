

const getTokenTransactions = async (address: string): Promise<string[]> => {
  const url = `https://api.etherscan.io/api
?module=logs
&action=getLogs
&address=${address}
&fromBlock=21076719
&toBlock=21076731
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
