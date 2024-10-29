import mongoose from 'mongoose'

// Replace with your MongoDB connection string



export const connectMongo = async () => {
  const uri = process.env.MONG_URI as string
  try {
    await mongoose.connect(uri)
    console.log('Connected to MongoDB')
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1) // Exit process with failure
  }
}
