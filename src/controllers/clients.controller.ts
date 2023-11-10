import { Request, Response } from 'express'
import { ClientsService } from '@services/clients.service'
import { ClientsSchemaCreateType, ClientsSchemaUpdateType, ClientsRadiosSchemaType } from '@models/clients.model'
import { PaginationSchemaType } from '@/utils/pagination'

export class ClientsController {
    constructor (private readonly service: ClientsService) {}

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const { group_id } = req.body
        const query = req.query as unknown as PaginationSchemaType

        const data = await this.service.getAll(parseInt(group_id), query)

        res.json(data)
    }

    public get = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params

        const data = await this.service.get(code)

        res.json(data)
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        const params = req.body as ClientsSchemaCreateType

        const data = await this.service.create(params)

        res.json(data)
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params
        const params = req.body as ClientsSchemaUpdateType

        const data = await this.service.update(code, params)

        res.json(data)
    }

    public delete = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params

        const data = await this.service.delete(code)

        if (data) {
            res.status(204).json()
        } else {
            res.status(400).json()
        }
    }

    public getRadios = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params
        const query = req.query as unknown as PaginationSchemaType

        const data = await this.service.getRadios(code, query)

        res.json(data)
    }

    public addRadios = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params
        const params = req.body as ClientsRadiosSchemaType

        const data = await this.service.addRadios(code, params)

        if (data) {
            res.status(204).json()
        } else {
            res.status(400).json()
        }
    }

    public removeRadios = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params
        const params = req.body as ClientsRadiosSchemaType

        const data = await this.service.removeRadios(code, params)

        if (data) {
            res.status(204).json()
        } else {
            res.status(400).json()
        }
    }
}
