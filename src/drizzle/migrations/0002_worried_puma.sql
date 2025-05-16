CREATE TABLE "product" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(255) NOT NULL,
	"tipo" varchar(100),
	"preco" double precision NOT NULL,
	"quantidade" integer DEFAULT 0,
	"imagem" text,
	"disponibilidade_tipo" varchar(20) DEFAULT 'always',
	"disponivel_ate" date,
	"producer_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "product" ADD CONSTRAINT "product_producer_id_producer_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."producer"("id") ON DELETE cascade ON UPDATE no action;