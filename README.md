# Nodelog Service

This is a simple service that allows you to log messages to a file. It is intended to be used as a simple logging service for your applications.


## Installation

- Add module `npm install dan28/nodelog --save`


Log an event

```ts
import { service as auditService } from "nodelog"

const auditLog: auditService.AuditLog = {

}
auditService.log(auditLog)
```

Get filtered logs

```ts
import { service as auditService } from "nodelog"

const auditLogFilter: auditService.AuditLogFilter = {

}
auditService.getLog(auditLogFilter)
```

## As a client module

- Add module `npm install dan28/nodelog --save`

Log an event

```ts
import { client as auditClient } from "nodelog"

const auditLog: AuditLog = {

}
auditClient.log(auditLog)
```

Get filtered logs

```ts
import { client as auditClient } from "nodelog"

const auditLogFilter: auditClient.AuditLogFilter = {

}
auditClient.getLog(auditLogFilter)
```




