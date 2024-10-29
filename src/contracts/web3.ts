import Web3 from 'web3'

export type ChainId = '0x1' | '0x38' | '0x42161'

const defaultRPCs = {
  '0x1': 'https://rpc.ankr.com/eth',
  '0x38': 'https://binance.llamarpc.com',
  '0x42161': 'https://1rpc.io/arb'
}
const web3Map = new Map<ChainId, Web3>()

export const getWeb3 = (chainId: ChainId): Web3 => {
  if (web3Map.has(chainId)) {
    const web3 = web3Map.get(chainId)
    return web3 as Web3
  }
  const rpc = defaultRPCs[chainId]
  const web3 = new Web3(rpc)
  web3Map.set(chainId, web3)

  return web3
}
