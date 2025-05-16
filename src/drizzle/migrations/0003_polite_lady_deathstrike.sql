CREATE TABLE "metricas" (
	"id" serial PRIMARY KEY NOT NULL,
	"producer_id" integer NOT NULL,
	"produtos_cadastrados" integer NOT NULL,
	"vendas_semanais" integer NOT NULL,
	"clientes_ativos" integer NOT NULL,
	"avaliacao_media" numeric(3, 1) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "metricas" ADD CONSTRAINT "metricas_producer_id_producer_id_fk" FOREIGN KEY ("producer_id") REFERENCES "public"."producer"("id") ON DELETE no action ON UPDATE no action;