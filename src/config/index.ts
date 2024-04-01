import { validateSync, ValidateNested } from "class-validator"
import { ServiceConfig } from "./Service"

class Config {
  @ValidateNested()
    server: ServiceConfig = new ServiceConfig()

  public constructor() {
    const errors = validateSync(this, { validationError: { target: false } })
    if (errors.length > 0) {
      throw new Error("Config validation failed.")
    }

    process.env = {}
  }
}

export const config = new Config()
