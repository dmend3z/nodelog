import { Request, Response } from "express"

export const index = (req: Request, res: Response) => {
  res.status(204).send()
}
