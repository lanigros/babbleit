export class Conflict extends Error {
  public status = 409

  constructor(message: string) {
    super(message)
  }
}
