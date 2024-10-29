import { ChainId, getWeb3 } from './web3'
import erc721Abi from './abis/erc721Abi.json'

export interface NftMetadata {
  name: string
  description: string
  image: string
}

export const getNftMetadata = async (chainId: ChainId = '0x1', tokenAddress: string, tokenId: string): Promise<NftMetadata> => {
  const web3 = getWeb3(chainId)
  const contract = new web3.eth.Contract(erc721Abi as any, tokenAddress)
  const tokenURI: string = await contract.methods.tokenURI(tokenId).call()
  let url: string = ''
  if (tokenURI.startsWith('ipfs://')) {
    url = tokenURI.replace('ipfs://', 'https://ipfs.io/ipfs/')
  } else if (tokenURI.startsWith('https://')) {
    url = tokenURI
  }
  let name: string = ''
  let description: string = ''
  let image: string = ''
  const metadataRes = await fetch(url)
  const metadataJson = await metadataRes.json()

  try {
    name = metadataJson.name
  } catch (error) {
    console.error('Error parsing name from metadata:', error)
  }
  try {
    description = metadataJson.description
  } catch (error) {
    console.error('Error parsing description from metadata:', error)
  }
  try {
    image = metadataJson.image
  } catch (error) {
    console.error('Error parsing image from metadata:', error)
  }

  const result: NftMetadata = { name, description, image }
  return result
}
