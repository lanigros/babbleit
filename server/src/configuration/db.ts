const {
  MONGO_USERNAME = 'God',
  MONGO_PASSWORD = 'password',
  MONGO_DATABASE = 'babbleit',
  MONGO_HOST
} = process.env

export const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${encodeURIComponent(
  MONGO_PASSWORD
)}@${MONGO_HOST}/${MONGO_DATABASE}?retryWrites=true&w=majority`
