import { sql } from 'drizzle-orm'
import { datetime, index, int, mysqlTable, primaryKey, varchar } from 'drizzle-orm/mysql-core'
import { groups } from './groups.model'
import { createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const sims_provider = mysqlTable('sims_provider', {
    id: int('id').autoincrement().notNull(),
    code: varchar('code', { length: 6 }).notNull(),
    name: varchar('name', { length: 255 }).notNull(),
    group_id: int('group_id').notNull().references(() => groups.id),
    created_at: datetime('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: datetime('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
    deleted_at: datetime('deleted_at', { mode: 'string' })
}, (table) => {
    return {
        sims_provider_id: primaryKey(table.id),
        sims_provider_code: index('sims_provider_code').on(table.code),
		group_id: index('group_id').on(table.group_id)
    }
})

export const SimsProviderShemaSelect = createSelectSchema(sims_provider)
    .pick({ code: true, name: true })

export const SimsProviderShemaCreate = createSelectSchema(sims_provider, {
    name: (schema) => schema.name.min(3).max(100)
}).pick({ name: true, group_id: true }).required()

export const SimsProviderShemaUpdate = SimsProviderShemaCreate
    .pick({ name: true })
    .partial()

export const SimsProviderShemaUniqueIdentifier = createSelectSchema(sims_provider, {
    code: (schema) => schema.code.length(6)
}).pick({ code: true }).required()

export type SimsProviderShemaCreateType = z.infer<typeof SimsProviderShemaCreate>
export type SimsProviderShemaSelectType = z.infer<typeof SimsProviderShemaSelect>
export type SimsProviderShemaUpdateType = z.infer<typeof SimsProviderShemaUpdate>
