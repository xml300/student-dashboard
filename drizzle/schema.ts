import { pgTable, unique, serial, text, integer, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"



export const lecturers = pgTable("lecturers", {
});

export const users = pgTable("users", {
	id: serial().primaryKey().notNull(),
	username: text().notNull(),
	password: text().notNull(),
	userType: integer("user_type").default(0).notNull(),
	createdAt: timestamp("created_at", { mode: 'string' }).defaultNow(),
	updatedAt: timestamp("updated_at", { mode: 'string' }).defaultNow(),
}, (table) => [
	unique("users_username_unique").on(table.username),
]);
