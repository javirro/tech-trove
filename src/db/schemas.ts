import mongoose from "mongoose";

export const nftMetadataSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String
});