import { PostCreation } from '../types'

export function validatePostTitle({ title }: Pick<PostCreation, 'title'>) {
  const titleRegex = /^([,\. a-zA-Z0-9äöåÄÖÅ@$!%*?\-_&]+){10,40}$/
  return titleRegex.test(title)
}

export function validatePostContent({
  content
}: Pick<PostCreation, 'content'>) {
  const titleRegex = /^([,\. a-zA-Z0-9äöåÄÖÅ@$!%*?\-_&]+){10,1000}$/
  return titleRegex.test(content)
}

export function validateCommunityPost(post: PostCreation) {
  const isTitleValid = validatePostTitle(post)
  const isContentValid = validatePostContent(post)

  const invalidValues: Partial<PostCreation> = {}

  if (!isTitleValid) {
    invalidValues.title =
      'Title must be 10 - 40 characters long can contain the following special characters: @ $ ! % * ? , . - _ & Å Ä Ö'
  }

  if (!isContentValid) {
    invalidValues.content =
      'Content must be 10 - 1000 characters long and can contain the following special characters: @ $ ! % * ? , . - _ & Å Ä Ö'
  }

  return invalidValues
}
