import { IsPort, IsUrl, IsString, IsEnum } from "class-validator"

export class ServiceConfig {
  @IsEnum(["test", "debug", "development", "server"])
    environment: string = process.env.ENVIRONMENT

  @IsPort()
    port: string = process.env.PORT

  @IsUrl({
    protocols: ["postgres"],
    require_tld: false
  })
    databaseUrl: string = process.env.DATABASE_URL

  @IsString()
    encryptionKey: string = process.env.ENCRYPTION_KEY
}
