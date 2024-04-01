import supertest from "supertest"
import { api } from "../../src/api"

const apiMock = supertest(api)

describe("API | public", () => {
  it("should respond with 204 on GET /", async () => {
    const res = await apiMock.get("/")
    expect(res.status).toEqual(204)
  })
})

describe("API | write", () => {
  it("should write audit log", async () => {
    const res = await apiMock.post("/api/v1/audit/log").send({
      "chainId": "DM"
    })
    expect(res.status).toEqual(204)
  })
})

describe("API | read", () => {
  it("should read audit log", async () => {
    const res = await apiMock.post("/api/v1/audit/filter")
    expect(res.status).toEqual(200)
  })
})
