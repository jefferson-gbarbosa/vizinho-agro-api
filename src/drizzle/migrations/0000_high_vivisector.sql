CREATE TABLE "consumer" (
	"id" serial PRIMARY KEY NOT NULL,
	"nome" varchar(100) NOT NULL,
	"telefone" varchar(20) NOT NULL,
	"senha" varchar(255) NOT NULL,
	CONSTRAINT "consumer_telefone_unique" UNIQUE("telefone")
);
