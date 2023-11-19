import { DataSource } from '@/core/data-source.core'
import { LogsSchemaSelectPaginated, LogsSchemaSelectPaginatedType, ActionsType } from '@models/logs.model'
import { LogsRepository } from '@/repositories/logs.repository'
import { PaginationSchemaType } from '@/utils/pagination'
import { RadiosRepository } from '@repositories/radios.repository'
import { ClientsRepository } from '@repositories/clients.repository'
import { SimsRepository } from '@repositories/sims.repository'
import { SessionUserInfoSchemaType } from '@/core/auth.shemas'

interface Relations {
    radio_code: string
    client_code: string
    sim_code: string
}

interface LogsPropsBase {
    session: SessionUserInfoSchemaType
    action: ActionsType
}

interface LogsProps<T extends keyof Relations = keyof Relations> extends Omit<LogsPropsBase, 'action'> {
    params: Pick<Relations, T>
}

interface LogsPropsCreate extends LogsPropsBase {
    params: Partial<Relations>
}

export class LogsService {
    private readonly logs: LogsRepository
    private readonly radios: RadiosRepository
    private readonly client: ClientsRepository
    private readonly sim: SimsRepository

    constructor (datasource: DataSource) {
        this.logs = datasource.create(LogsRepository)
        this.radios = datasource.create(RadiosRepository)
        this.client = datasource.create(ClientsRepository)
        this.sim = datasource.create(SimsRepository)
    }

    public async getAll (group_id: number, query: PaginationSchemaType): Promise<LogsSchemaSelectPaginatedType> {
        const data = await this.logs.getAll(group_id, query)

        return LogsSchemaSelectPaginated.parse(data)
    }

    private async create (props: LogsPropsCreate): Promise<void> {
        const { session, action, params } = props

        const { user_id, group_id } = session
        const { radio_id, client_id, sim_id } = await this.findIdsByCodes(params)

        await this.logs.create({
            action,
            client_id,
            radio_id,
            sim_id,
            user_id,
            group_id
        })
    }

    public async createRadio (props: LogsProps<'radio_code'>): Promise<void> {
        await this.create({
            action: 'create-radio',
            ...props
        })
    }

    public async addRadioToClient (props: LogsProps<'radio_code' | 'client_code'>): Promise<void> {
        await this.create({
            action: 'add-radio-to-client',
            ...props
        })
    }

    public async removeRadioFromClient (props: LogsProps<'radio_code' | 'client_code'>): Promise<void> {
        await this.create({
            action: 'remove-radio-from-client',
            ...props
        })
    }

    private async findIdsByCodes (params: Partial<Relations>): Promise<{ client_id?: number, sim_id?: number, radio_id?: number }> {
        const { client_code, sim_code, radio_code } = params

        const client_id = client_code !== undefined
            ? await this.client.getId(client_code)
            : undefined

        const sim_id = sim_code !== undefined
            ? await this.sim.getId(sim_code)
            : undefined

        const radio_id = radio_code !== undefined
            ? await this.radios.getId(radio_code)
            : undefined

        return {
            client_id,
            sim_id,
            radio_id
        }
    }
}
