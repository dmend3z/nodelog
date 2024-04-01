import { ApiError } from "./ApiError"

export class BadRequest extends ApiError {
  constructor(message?: string) {
    super(message)
    this.status = 400
    if (!message) {
      this.message = "Bad request"
    }
  }
}
