export class ApiError extends Error {
  protected status: number

  public getStatus = () => {
    return this.status
  }
}
