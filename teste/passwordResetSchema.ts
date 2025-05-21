import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';

export const passwordResets = pgTable('password_resets', {
  telefone: text().primaryKey(),
  code: text().notNull(),
  expiresAt: timestamp().notNull(),
});
