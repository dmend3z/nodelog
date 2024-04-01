import express, { NextFunction, Request, Response } from "express"
import compression from "compression"
import "express-async-errors"
import { config } from "./config"
import { errorHandler } from "./controller/errorHandler"
import * as controller from "./controller"

// Express server
const api = express()
api.set("port", config.server.port)
api.use(compression())
api.use(express.json({ limit: "1mb" }))
api.use(express.urlencoded({ limit: "1mb", extended: true }))

type MiddlewareType = (req: Request, res: Response, next: NextFunction) => void

class Middleware {
  private static apiReadMiddleware = (req: Request, res: Response, next: NextFunction) => {
    next()
  }
  public static readMiddleware = (req: Request, res: Response, next: NextFunction) => {
    Middleware.apiReadMiddleware(req, res, next)
  }

  public static writeMiddleware = (req: Request, res: Response, next: NextFunction) => {
    Middleware.apiReadMiddleware(req, res, next)
  }

  public static setReadMiddleware = (middleware: MiddlewareType) => {
    Middleware.apiReadMiddleware = middleware
  }

  public static setWriteMiddleware = (middleware: MiddlewareType) => {
    Middleware.apiReadMiddleware = middleware
  }
}

// Health controller
api.get("/", controller.pub.index)

// Service controller
api.get("/api/v1/health", Middleware.readMiddleware, controller.service.healthCheck)
api.post("/api/v1/audit/log", Middleware.writeMiddleware, controller.service.log)
api.post("/api/v1/audit/filter", Middleware.readMiddleware, controller.service.filterLog)

// Problem handler
api.use(errorHandler)

export {
  api,
  config,
  Request,
  Response,
  NextFunction,
  Middleware
}

export * as Error from "./error"
