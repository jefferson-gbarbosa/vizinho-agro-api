import {
  pgTable,
  serial,
  integer,
  decimal,
} from 'drizzle-orm/pg-core';
import { producers } from './producerSchema';

export const metrics = pgTable('metricas', {
  id: serial('id').primaryKey(),
  producer_id: integer('producer_id').notNull().references(() => producers.id), // Relacionamento com a tabela producers
  produtosCadastrados: integer('produtos_cadastrados').notNull(),
  vendasSemanais: integer('vendas_semanais').notNull(),
  clientesAtivos: integer('clientes_ativos').notNull(),
  avaliacaoMedia: decimal('avaliacao_media', { precision: 3, scale: 1 }).notNull(),
});

