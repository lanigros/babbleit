export type Post = {
  _id: string
  userId: string
  communityId: string
  title: string
  content: string
  isBlocked: number
  __v: number
}

export type PostDocument = {
  _doc: Post
} & Document
