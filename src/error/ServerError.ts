import { ApiError } from "./ApiError"

export class ServerError extends ApiError {
  constructor(message?: string) {
    super(message)
    this.status = 500
    if (!message) {
      this.message = "Server error"
    }
  }
}
