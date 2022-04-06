import MongoStore from 'connect-mongo'

export function createSessionStore(mongoUrl: string) {
  return MongoStore.create({
    mongoUrl,
    autoRemove: 'interval',
    autoRemoveInterval: 60
  })
}
