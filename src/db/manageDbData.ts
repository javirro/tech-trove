import mongoose from "mongoose"
import { nftMetadataSchema } from "./schemas"

export const addNftMetadata = async (name: string, description: string, image: string) => {
  const NftMetadata = mongoose.model('NftMetadata', nftMetadataSchema)
  const nftMetadata = new NftMetadata({ name, description, image })
  await nftMetadata.save()
}