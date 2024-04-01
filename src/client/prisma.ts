import { PrismaClient } from "@prisma/client"
import { fieldEncryptionMiddleware } from "prisma-field-encryption"
import { config } from "../config"
import * as Error from "../error"

export const prisma = config.server.environment === "development" ?
  new PrismaClient({
    log: ["query", "info"]
  }) :
  new PrismaClient({
    log: ["info"]
  })

// Field encryption
prisma.$use(fieldEncryptionMiddleware({
  encryptionKey: config.server.encryptionKey
}))

export function handlePrismaError(error: Error) {
  console.error(error)
  throw new Error.ServerError()
}

export * from "@prisma/client"
