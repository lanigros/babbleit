export class Unauthorized extends Error {
  public status = 403

  constructor(message: string) {
    super(message)
  }
}
