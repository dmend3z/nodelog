import { NextFunction, Request, Response } from "express"
import * as error from "../error"

export const errorHandler = (
  error: Error | error.ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const status = ("getStatus" in error) ? error.getStatus() : 500


  res
    .status(status)
    .set("Content-Type", "application/problem+json")
    .json({
      code: status,
      message: error.message,
    })

  next()
}
