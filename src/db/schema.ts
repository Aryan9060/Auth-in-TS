import { pgTable, uuid, boolean, varchar, text, timestamp } from 'drizzle-orm/pg-core';



export const userTable = pgTable('users', {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar('first_name', { length: 256 }).notNull(),
    lastName: varchar('last_name', { length: 256 }),
    email: varchar({ length: 355 }).notNull().unique(),
    emailVarified: boolean('email_verified').default(false),
    password: varchar('password', { length: 66 }),
    salt: text('salt'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').$onUpdate(() => new Date()),

})