CREATE TABLE "metrics" (
	"id" serial PRIMARY KEY NOT NULL,
	"producer_id" integer NOT NULL,
	"produtos_cadastrados" integer NOT NULL,
	"vendas_semanais" integer NOT NULL,
	"clientes_ativos" integer NOT NULL,
	"avaliacao_media" numeric(3, 1) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "metrics" ADD CONSTRAINT "metrics_producer_id_producers_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."producers"("id") ON DELETE cascade ON UPDATE no action;