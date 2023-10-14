import { GroupSchemaCreateType, GroupSchemaSelectType, GroupSchemaUpdateType } from '@models/groups.model'
import { GroupRepository } from '@/repositories/groups.repository'
import { NotFoundError } from '@/utils/errors'

export class GroupsService {
    constructor (private readonly repository: GroupRepository) {}

    public async getAll (): Promise<GroupSchemaSelectType[]> {
        return await this.repository.getAll()
    }

    public async get (id: number): Promise<GroupSchemaSelectType> {
        const group = await this.repository.get(id)

        if (group === null) {
            throw new NotFoundError('Group not found')
        }

        return group
    }

    public async create (params: GroupSchemaCreateType): Promise<GroupSchemaSelectType> {
        const id = await this.repository.create(params)

        return await this.get(id)
    }

    public async update (id: number, params: GroupSchemaUpdateType): Promise<GroupSchemaSelectType> {
        const updateId = await this.repository.update(id, params)

        return await this.get(updateId)
    }

    public async delete (id: number): Promise<boolean> {
        return await this.repository.delete(id)
    }
}
