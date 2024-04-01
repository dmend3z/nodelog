import supertest from "supertest"
import {
  api,
  Middleware,
  Request,
  Response,
  NextFunction,
  Error
} from "../../src/api"

const READ_ACCESS_TOKEN = "valid-read-access-token"
const WRITE_ACCESS_TOKEN = "valid-write-access-token"
const apiMock = supertest(api)

describe("API middleware | no middleware", () => {
  it("should be able to write log without access token", async () => {
    const res = await apiMock.post("/api/v1/audit/log")
    expect(res.status).toEqual(204)
  })

  it("should be able to read log without access token", async () => {
    const res = await apiMock.post("/api/v1/audit/filter")
    expect(res.status).toEqual(200)
  })
})

describe("API middleware | read middleware", () => {
  it("should be able to define API read middleware", () => {
    const readMiddleware = (req: Request, res: Response, next: NextFunction) => {
      if (req.header("authorization") !== `Bearer ${READ_ACCESS_TOKEN}`) {
        throw new Error.Forbidden("Invalid access token")
      }

      next()
    }
    Middleware.setReadMiddleware(readMiddleware)
  })

  it("should not be able to read log without valid access token", async () => {
    const res = await apiMock.post("/api/v1/audit/filter")
    expect(res.status).toEqual(403)
  })

  it("should be able to read log with valid access token", async () => {
    const res = await apiMock.post("/api/v1/audit/filter").set({ "Authorization": `Bearer ${READ_ACCESS_TOKEN}` })
    expect(res.status).toEqual(200)
  })
})

describe("API middleware | write middleware", () => {
  it("should be able to define API write middleware", () => {
    const writeMiddleware = (req: Request, res: Response, next: NextFunction) => {
      if (req.header("authorization") !== `Bearer ${WRITE_ACCESS_TOKEN}`) {
        throw new Error.Forbidden("Invalid access token")
      }

      next()
    }
    Middleware.setWriteMiddleware(writeMiddleware)
  })

  it("should not be able to write log without valid access token", async () => {
    const res = await apiMock.post("/api/v1/audit/log")
    expect(res.status).toEqual(403)
  })

  it("Client should be able to write log with valid valid access token", async () => {
    const res = await apiMock.post("/api/v1/audit/log").set({ "Authorization": `Bearer ${WRITE_ACCESS_TOKEN}` })
    expect(res.status).toEqual(204)
  })
})
