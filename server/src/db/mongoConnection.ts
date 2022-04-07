import mongoose from 'mongoose'

export async function createMongoConnection(url: string) {
  const connection = await mongoose.connect(url)
  console.log('Connected to mongodb')
  return connection
}
