import { api, config } from "./api"

// Start Express server
api.listen(api.get("port") as number, "0.0.0.0",() => {
  console.info(`App is running at http://0.0.0.0:${config.server.port}`)
})
