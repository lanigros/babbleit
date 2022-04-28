import { Community, CommunityCreation } from '../types'

export function validateCommunityTitle({
  title
}: Pick<CommunityCreation, 'title'>) {
  const titleRegex = /^([a-zA-Z0-9]){3,20}$/
  return titleRegex.test(title)
}

export function validateCommunityDescription({
  description
}: Pick<CommunityCreation, 'description'>) {
  const descriptionRegex = /^([a-zA-Z0-9_(.)(-) ]){5,50}$/
  return descriptionRegex.test(description)
}

export function validateCommunity({ title, description }: CommunityCreation) {
  const isTitleValid = validateCommunityTitle({ title })
  const isDescriptionValid = validateCommunityDescription({ description })

  const invalidValues: Partial<CommunityCreation> = {}

  !isTitleValid &&
    (invalidValues.title =
      'Title can only contain alphanumeric characters and must be 3 - 20 characters')

  !isDescriptionValid &&
    (invalidValues.description =
      'Description must be 5-30 characters long and may only contain letters, numbers and the following special characters: _ . -')

  return invalidValues
}
