import {
  Prisma,
  prisma,
  handlePrismaError,
  Executor,
  Entity,
  ExecutorIp,
  EventType
} from "../client/prisma"

class AuditLogRepository {
  public async getById(id: string) {
    return await prisma.auditLog.findUnique({
      where: {
        id
      },
      include: {
        entity: true,
        executor: {
          include: {
            executorIp: true
          }
        }
      }
    }).catch(handlePrismaError)
  }

  public getFiltered = async (
    limit: number = 100,
    cursor: Prisma.AuditLogWhereUniqueInput = undefined,
    chainId: string = undefined,
    executorId: string = undefined,
    entityId: string = undefined,
    eventType: EventType = undefined,
    ip: string = undefined
  ) => {
    const items = await prisma.auditLog.findMany({
      take: limit,
      skip: typeof cursor === "undefined" ? undefined : 1,
      cursor: cursor,
      where: {
        OR: [
          { entityId },
          { executorId },
          { eventType },
          { executor: { executorIp: { some: { ip } } } }
        ].filter(condition => Object.values(condition)[0] !== undefined)
      },
      include: {
        entity: true,
        executor: {
          include: {
            executorIp: true
          }
        }
      }
    }).catch(handlePrismaError)

    return !items ? [] : items
  }

  public async insert(
    chainId: string = undefined,
    executor: Executor,
    executorIp: ExecutorIp,
    entity: Entity,
    eventType: EventType = undefined,
    note: string = undefined,
    diffs: object = undefined,
  ) {
    return await prisma.auditLog.create({
      data: {
        chainId,
        entityId: entity.entityId,
        executorId: executor.executorId,
        executorIpId: executorIp.executorIpId,
        eventType,
        note,
        diffs: typeof diffs === "undefined" ? undefined :  JSON.stringify(diffs, null, 0)
      },
      include: {
        entity: true,
        executor: {
          include: {
            executorIp: true
          }
        }
      }
    }).catch(handlePrismaError)
  }
}

const auditLog = new AuditLogRepository()

class ExecutorRepository {
  public async upsert(
    executorId: string,
    name?: string
  ) {
    return await prisma.executor.upsert({
      create: {
        executorId,
        name
      },
      update: {
        name
      },
      where: {
        executorId
      },
      include: {
        executorIp: true
      }
    }).catch(handlePrismaError)
  }
}

const executor = new ExecutorRepository()

class ExecutorIpRepository {
  public async upsert(
    executor: Executor,
    ip?: string
  ) {
    const item = await prisma.executorIp.findFirst({
      where: {
        executorId: executor.executorId,
        ip: ip
      },
    })

    if (!item) {
      return await prisma.executorIp.create({
        data: {
          executorId: executor.executorId,
          ip
        }
      }).catch(handlePrismaError)
    } else {
      return await prisma.executorIp.upsert({
        create: {
          executorId: executor.executorId,
          ip
        },
        update: {
          updatedAt: new Date()
        },
        where: {
          executorIpId: item.executorIpId
        }
      }).catch(handlePrismaError)
    }
  }
}

const executorIp = new ExecutorIpRepository()

class EntityRepository {
  public async upsert(
    entityId: string,
    entityFqcn?: string,
    entityName?: string
  ) {
    return await prisma.entity.upsert({
      create: {
        entityId,
        entityFqcn,
        entityName
      },
      update: {
        entityFqcn,
        entityName
      },
      where: {
        entityId
      }
    }).catch(handlePrismaError)
  }
}

const entity = new EntityRepository()

export { auditLog, executor, executorIp, entity }
