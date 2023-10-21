import { MySql2Database } from 'drizzle-orm/mysql2'
import { eq } from 'drizzle-orm'
import { CompanyModalitySchemaCreateType, CompanyModalitySchemaSelect, CompanyModalitySchemaSelectPaginated, CompanyModalitySchemaSelectPaginatedType, CompanyModalitySchemaSelectType, CompanyModalitySchemaUpdateType, companies_modality } from '@models/companies_modality.model'
import { PaginationSchemaType } from '@/utils/pagination'
import { RepositoryCore } from '@/core/repository.core'

export class CompaniesModalityRepository extends RepositoryCore<CompanyModalitySchemaSelectType, CompanyModalitySchemaCreateType, CompanyModalitySchemaUpdateType> {
    constructor (public readonly db: MySql2Database) {
        const table = companies_modality

        const select = db.select({
            code: companies_modality.code,
            name: companies_modality.name
        })
        .from(table)

        super({ db, table, select })
    }

    public async getAll (group_id: number, query: PaginationSchemaType): Promise<CompanyModalitySchemaSelectPaginatedType> {
        const data = await this.paginate({
            query,
            where: eq(companies_modality.group_id, group_id)
        })

        return CompanyModalitySchemaSelectPaginated.parse(data)
    }

    public async get (code: string): Promise<CompanyModalitySchemaSelectType> {
        const data = await this.getOne({
            where: eq(companies_modality.code, code)
        })

        return CompanyModalitySchemaSelect.parse(data)
    }

    public async create (params: CompanyModalitySchemaCreateType): Promise<string> {
        const code = await this.insert({
            params
        })

        return code
    }

    public async update (code: string, params: CompanyModalitySchemaUpdateType): Promise<string> {
        const data = await this.set({
            params,
            where: eq(companies_modality.code, code)
        })

        return data ? code : ''
    }

    public async delete (code: string): Promise<boolean> {
        return await this.softDelete(eq(companies_modality.code, code))
    }
}
