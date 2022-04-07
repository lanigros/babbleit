import bcrypt from 'bcrypt'

type CallbackParameters = {
  error?: Error
  isMatching?: boolean
}

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  return { hashedPassword, salt }
}

const comparePasswords = (
  password: string,
  hashedPassword: string,
  callback: ({ error, isMatching }: CallbackParameters) => void
) => {
  bcrypt.compare(
    password,
    hashedPassword,
    function (error?: Error, isMatching?: boolean) {
      if (error) {
        return callback({ error })
      }
      return callback({ isMatching })
    }
  )
}

export { hashPassword, comparePasswords }
