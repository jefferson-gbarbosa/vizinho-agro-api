import {
    pgTable,
    serial,
    varchar,
    text,
    json,
    doublePrecision, 
    timestamp
  } from 'drizzle-orm/pg-core';
  
  export const producers = pgTable('producers', {
    id: serial('id').primaryKey(),
    nome: varchar('nome', { length: 255 }),
    telefone: varchar('telefone', { length: 20 }),
    senha: varchar("senha", { length: 255 }).notNull(),
    tipoProducao: varchar('tipo_producao', { length: 100 }),
    certificacoes: json('certificacoes').default([]),
    fotoPerfil: text('foto_perfil'),
    latitude: doublePrecision('latitude'),
    longitude: doublePrecision('longitude'),
    code: text().notNull(),
    expiresAt: timestamp().notNull(),
    createdAt: timestamp("created_at", { mode: "date", withTimezone: false }).notNull().defaultNow(),
  });