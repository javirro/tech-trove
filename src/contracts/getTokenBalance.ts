import { ChainId, getWeb3 } from './web3'
import tokenERC20Abi from './abis/tokenAbi.json'
export interface TokenBalance {
  balanceEth: string
  balanceWei: string
}
export const getTokenBalance = async (chainId: ChainId, tokenAddress: string, userAddress: string): Promise<TokenBalance> => {
  const web3 = getWeb3(chainId)
  const contract = new web3.eth.Contract(tokenERC20Abi as any, tokenAddress)
  const balanceWei: bigint = await contract.methods.balanceOf(userAddress).call()
  const balanceEth = web3.utils.fromWei(balanceWei, 'ether')
  return { balanceEth, balanceWei: balanceWei.toString() }
}
