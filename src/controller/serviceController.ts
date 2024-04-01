import { Request, Response } from "express"

import {
  Entity,
  EventType,
  Executor,
  ExecutorIp
} from ".prisma/client"

import * as repository from "../repository"

export const healthCheck = (req: Request, res: Response): void => {
  res.status(204).send()
}

export const log = async (req: Request, res: Response) => {
  res.status(204).send()
  const executor = await repository.executor.upsert("00000000-0000-0000-0000-000000000002")
  const executorIp = await repository.executorIp.upsert(executor as Executor, "165.148.36.238")
  const entity = await repository.entity.upsert("00000000-0000-0000-0000-000000000001")
  await repository.auditLog.insert(
    "00000000-0000-0000-1111-000000000000",
    executor as Executor,
    executorIp as ExecutorIp,
    entity as Entity,
    EventType.UPDATE,
    "Some note",
    { "enabled": [false, true] }
  )
}

export const filterLog = async (req: Request, res: Response) => {
  const limit = Number(req.query.limit ? req.query.limit : 10)
  const cursor = req.query.pageToken ? { id: req.query.pageToken as string } : undefined
  const items = await repository.auditLog.getFiltered(
    10,
    cursor,
    undefined, //"00000000-0000-0000-1111-000000000000",
    "00000000-0000-0000-0000-000000000002",
    undefined, //"00000000-0000-0000-0000-000000000001",
    undefined, //EventType.UPDATE,
    undefined, //"165.148.36.237"
  )

  const nextPageToken = items.length < limit ? null : items.slice(-1)[0].id
  const nextPageUrl = nextPageToken ?
    `${req.protocol}://${req.get("host")}${req.originalUrl}?limit=${limit}&pageToken=${nextPageToken}` :
    null

  res.status(200).send({
    nextPageToken: nextPageToken,
    nextPageUrl: nextPageUrl,
    limit: limit,
    items: items
  })
}
