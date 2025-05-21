import {
  pgTable,
  serial,
  integer,
  decimal,
  timestamp,
} from 'drizzle-orm/pg-core';
import { producers } from './producerSchema';

export const metrics = pgTable('metrics', {
  id: serial('id').primaryKey(),
  producerId: integer('producer_id')
    .notNull()
    .references(() => producers.id, { onDelete: 'cascade' }),

  produtosCadastrados: integer('produtos_cadastrados').notNull(),
  vendasSemanais: integer('vendas_semanais').notNull(),
  clientesAtivos: integer('clientes_ativos').notNull(),
  avaliacaoMedia: decimal('avaliacao_media', { precision: 3, scale: 1 }).notNull(),

  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
});


