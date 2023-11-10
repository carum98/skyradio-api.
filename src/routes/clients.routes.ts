import { ClientsController } from '@/controllers/clients.controller'
import { DataSource } from '@/core/data-source.core'
import { RouterCore } from '@/core/router.core'
import { ClientsService } from '@services/clients.service'
import { authMiddleware } from '@middlewares/auth.middleware'
import { requestMiddleware } from '@middlewares/request.middleware'
import { ClientsRadiosSchema, ClientsSchemaCreate, ClientsSchemaUniqueIdentifier, ClientsSchemaUpdate } from '@models/clients.model'
import { PaginationSchema } from '@/utils/pagination'

export class ClientsRouter extends RouterCore {
    constructor (datasource: DataSource) {
        super({
            path: '/clients',
            middlewares: [authMiddleware]
        })

        const service = new ClientsService(datasource)
        const controller = new ClientsController(service)

        this.get({
            name: '/',
            handler: controller.getAll,
            middlewares: [
                requestMiddleware({
                    query: PaginationSchema
                })
            ]
        })

        this.post({
            name: '/',
            handler: controller.create,
            middlewares: [
                requestMiddleware({
                    body: ClientsSchemaCreate
                })
            ]
        })

        this.get({
            name: '/:code',
            handler: controller.get,
            middlewares: [
                requestMiddleware({
                    params: ClientsSchemaUniqueIdentifier
                })
            ]
        })

        this.put({
            name: '/:code',
            handler: controller.update,
            middlewares: [
                requestMiddleware({
                    params: ClientsSchemaUniqueIdentifier,
                    body: ClientsSchemaUpdate
                })
            ]
        })

        this.delete({
            name: '/:code',
            handler: controller.delete,
            middlewares: [
                requestMiddleware({
                    params: ClientsSchemaUniqueIdentifier
                })
            ]
        })

        this.get({
            name: '/:code/radios',
            handler: controller.getRadios,
            middlewares: [
                requestMiddleware({
                    query: PaginationSchema,
                    params: ClientsSchemaUniqueIdentifier
                })
            ]
        })

        this.post({
            name: '/:code/radios',
            handler: controller.addRadios,
            middlewares: [
                requestMiddleware({
                    params: ClientsSchemaUniqueIdentifier,
                    body: ClientsRadiosSchema
                })
            ]
        })

        this.delete({
            name: '/:code/radios',
            handler: controller.removeRadios,
            middlewares: [
                requestMiddleware({
                    params: ClientsSchemaUniqueIdentifier,
                    body: ClientsRadiosSchema
                })
            ]
        })
    }
}