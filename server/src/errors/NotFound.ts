export class NotFound extends Error {
  public status = 404

  constructor(message: string) {
    super(message)
  }
}
