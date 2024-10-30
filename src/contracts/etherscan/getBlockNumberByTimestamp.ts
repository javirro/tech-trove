const getBlockNumberByTimestamp = async (timestamp: number): Promise<number> => {
  const url = `https://api.etherscan.io/api
?module=block
&action=getblocknobytime
&timestamp=${timestamp}
&closest=before
&apikey=${process.env.ETHERSCAN_API_KEY}`

  const res = await fetch(url)
  const json = await res.json()
  const blockNumber = json.result as number
  return blockNumber
}
