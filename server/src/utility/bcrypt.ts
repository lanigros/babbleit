import bcrypt from 'bcrypt'

const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

const comparePasswords = (password: string, hashedPassword: string) => {
  return bcrypt.compareSync(password, hashedPassword)
}

export { hashPassword, comparePasswords }
