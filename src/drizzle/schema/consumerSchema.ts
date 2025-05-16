import { pgTable, varchar, serial } from "drizzle-orm/pg-core";

export const consumers = pgTable("consumer", {
  id: serial('id').primaryKey(),
  nome: varchar("nome", { length: 100 }).notNull(),
  telefone: varchar("telefone", { length: 20 }).notNull().unique(),
  senha: varchar("senha", { length: 255 }).notNull(), // hash da senha
});