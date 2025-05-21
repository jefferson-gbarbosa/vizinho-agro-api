import {
  pgTable,
  serial,
  varchar,
  text,
  doublePrecision,
  integer,
  date,
  timestamp,
} from 'drizzle-orm/pg-core';
import { producers } from './producerSchema';

export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  nome: varchar('nome', { length: 255 }).notNull(),
  tipo: varchar('tipo', { length: 100 }),
  preco: doublePrecision('preco').notNull(),
  quantidade: integer('quantidade').default(0),
  imagem: text('imagem'),
  disponibilidadeTipo: varchar('disponibilidade_tipo', { length: 20 }).default('always'),
  disponivelAte: date('disponivel_ate'),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),

  producerId: integer('producer_id')
    .notNull()
    .references(() => producers.id, { onDelete: 'cascade' }),
});
