import { GroupSchemaCreateType, GroupSchemaSelect, GroupSchemaSelectType, GroupSchemaUpdateType, groups } from '@models/groups.model'
import { IGroupRepository } from './repositories'
import { MySql2Database } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'

export class GroupRepository implements IGroupRepository {
    constructor (public readonly db: MySql2Database) {}

    public async getAll (): Promise<GroupSchemaSelectType[]> {
        const data = await this.db.select().from(groups)

        return GroupSchemaSelect.array().parse(data)
    }

    public async get (id: number): Promise<GroupSchemaSelectType | null> {
        const data = await this.db.select().from(groups).where(eq(groups.id, id))

        return data.length > 0
            ? GroupSchemaSelect.parse(data.at(0))
            : null
    }

    public async create (params: GroupSchemaCreateType): Promise<number> {
        const data = await this.db.insert(groups).values(params)

        return data[0].insertId
    }

    public async update (id: number, params: GroupSchemaUpdateType): Promise<number> {
        const data = await this.db.update(groups).set({ name: params.name }).where(eq(groups.id, id))

        return data[0].affectedRows > 0 ? id : 0
    }

    public async delete (id: number): Promise<boolean> {
        const data = await this.db.delete(groups).where(eq(groups.id, id))

        return data[0].affectedRows > 0
    }
}
