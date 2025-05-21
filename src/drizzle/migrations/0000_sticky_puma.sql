CREATE TABLE "producers" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255),
	"telefone" varchar(20),
	"senha" varchar(255) NOT NULL,
	"tipo_producao" varchar(100),
	"certificacoes" json DEFAULT '[]'::json,
	"foto_perfil" text,
	"latitude" double precision,
	"longitude" double precision,
	"code" text NOT NULL,
	"expiresAt" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
