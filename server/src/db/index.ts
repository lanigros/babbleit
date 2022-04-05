import mongoose from 'mongoose'

async function createMongoConnection(url: string) {
  await mongoose.connect(url)
  console.log('Connected to mongodb')
}

export default createMongoConnection
