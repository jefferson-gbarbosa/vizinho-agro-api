CREATE TABLE "products" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tipo" varchar(100),
	"preco" double precision NOT NULL,
	"quantidade" integer DEFAULT 0,
	"imagem" text,
	"disponibilidade_tipo" varchar(20) DEFAULT 'always',
	"disponivel_ate" date,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"producer_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_producer_id_producers_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."producers"("id") ON DELETE cascade ON UPDATE no action;