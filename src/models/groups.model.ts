import { mysqlTable, primaryKey, int, varchar, datetime } from 'drizzle-orm/mysql-core'
import { sql } from 'drizzle-orm'

import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { z } from 'zod'

export const groups = mysqlTable('groups', {
	id: int('id').autoincrement().notNull(),
	name: varchar('name', { length: 255 }).notNull(),
	created_at: datetime('created_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP`).notNull(),
	updated_at: datetime('updated_at', { mode: 'string' }).default(sql`CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`).notNull(),
	deleted_at: datetime('deleted_at', { mode: 'string' })
},
(table) => {
	return {
		groups_id: primaryKey(table.id)
	}
})

export const GroupSchemaSelect = createSelectSchema(groups)
	.omit({ deleted_at: true, updated_at: true, created_at: true })

export const GroupSchemaCreate = createInsertSchema(groups, {
	name: (schema) => schema.name.min(3).max(100)
}).pick({ name: true }).required()

export const GroupSchemaUpdate = GroupSchemaCreate
	.pick({ name: true })
	.required()

export const GroupSchemaUniqueIdentifier = createSelectSchema(groups, {
	id: (schema) => schema.id.or(z.coerce.number())
}).pick({ id: true }).required()

export type GroupSchemaCreateType = z.infer<typeof GroupSchemaCreate>
export type GroupSchemaSelectType = z.infer<typeof GroupSchemaSelect>
export type GroupSchemaUpdateType = z.infer<typeof GroupSchemaUpdate>