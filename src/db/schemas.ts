import mongoose from 'mongoose'

export const nftMetadataSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
})

export const transactionInfoSchema = new mongoose.Schema(
  {
    blockHash: { type: String, required: true },
    blockNumber: { type: String, required: true },
    from: { type: String, required: true },
    gasUsed: { type: String, required: true },
    status: { type: String, required: true },
    to: { type: String, required: true },
    transactionIndex: { type: String, required: true },
    transactionHash: { type: String, required: true },
    type: { type: String, required: false }
  },
  { timestamps: true }
)
