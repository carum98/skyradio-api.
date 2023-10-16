import { NotFoundError } from '@/utils/errors'
import { RadiosModelShemaCreateType, RadiosModelShemaSelectType, RadiosModelShemaUpdateType } from '@models/radios_model.model'
import { RadiosModelRepository } from '@repositories/radios_model.repository'

export class RadiosModelService {
    constructor (private readonly repository: RadiosModelRepository) { }

    public async getAll (group_id: number): Promise<RadiosModelShemaSelectType[]> {
        return await this.repository.getAll(group_id)
    }

    public async get (code: string): Promise<RadiosModelShemaSelectType> {
        const model = await this.repository.get(code)

        if (model === null) {
            throw new NotFoundError('Model not found')
        }

        return model
    }

    public async create (params: RadiosModelShemaCreateType): Promise<RadiosModelShemaSelectType> {
        const code = await this.repository.create(params)

        return await this.get(code)
    }

    public async update (code: string, params: RadiosModelShemaUpdateType): Promise<RadiosModelShemaSelectType> {
        const updateId = await this.repository.update(code, params)

        return await this.get(updateId)
    }

    public async delete (code: string): Promise<boolean> {
        return await this.repository.delete(code)
    }
}