export class BadRequest extends Error {
  public status = 400

  constructor(message: string) {
    super(message)
  }
}
