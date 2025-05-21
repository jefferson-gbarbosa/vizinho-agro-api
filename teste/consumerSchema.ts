import { pgTable, varchar, serial, timestamp } from "drizzle-orm/pg-core";

export const consumers = pgTable("consumer", {
  id: serial('id').primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(), 
   createdAt: timestamp("created_at", { mode: "date", withTimezone: false })
    .notNull()
    .defaultNow(),
});