import { CommunityRegistration } from '../types'

export function validateCommunityTitle({
  title
}: Pick<CommunityRegistration, 'title'>) {
  const titleRegex = /^([a-zA-Z0-9]){3,20}$/
  return titleRegex.test(title)
}

export function validateCommunityDescription({
  description
}: Pick<CommunityRegistration, 'description'>) {
  const descriptionRegex = /^([a-zA-Z0-9_(.)(-) ]){5,50}$/
  return descriptionRegex.test(description)
}

export function validateCommunity({
  title,
  description
}: CommunityRegistration) {
  const isTitleValid = validateCommunityTitle({ title })
  const isDescriptionValid = validateCommunityDescription({ description })

  const invalidValues: Partial<CommunityRegistration> = {}

  !isTitleValid &&
    (invalidValues.title =
      'Title can only contain alphanumeric characters and must be 3 - 20 characters')

  !isDescriptionValid &&
    (invalidValues.description =
      'Description must be 5-30 characters long and may only contain letters, numbers and the following special characters: _ . -')

  return invalidValues
}
