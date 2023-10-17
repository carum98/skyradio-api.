import { Request, Response } from 'express'
import { CompaniesService } from '@services/companies.service'
import { CompanySchemaCreateType, CompanySchemaUpdateType } from '@models/companies.model'

export class CompaniesController {
    constructor (private readonly service: CompaniesService) {}

    public getAll = async (req: Request, res: Response): Promise<void> => {
        const { group_id } = req.body

        const data = await this.service.getAll(parseInt(group_id))

        res.json(data)
    }

    public get = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params

        const data = await this.service.get(code)

        res.json(data)
    }

    public create = async (req: Request, res: Response): Promise<void> => {
        const params = req.body as CompanySchemaCreateType

        const data = await this.service.create(params)

        res.json(data)
    }

    public update = async (req: Request, res: Response): Promise<void> => {
        const { code } = req.params
        const params = req.body as CompanySchemaUpdateType

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
}
