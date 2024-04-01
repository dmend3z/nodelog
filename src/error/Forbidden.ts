import { ApiError } from "./ApiError"

export class Forbidden extends ApiError {
  constructor(message?: string) {
    super(message)
    this.status = 403
    if (!message) {
      this.message = "Forbidden"
    }
  }
}
