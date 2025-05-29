# 🌽 Vizinho Agro API

The "Vizinho Agro" API serves as the backend of a platform that connects local producers to consumers, offering features such as producer and product registration, authentication, and search by location or name. The API is developed with Fastify, TypeScript, Zod for validation, and Drizzle ORM for database interaction.

## 🚀 Requisites

- Docker;
- Node.js;
- Fastify;
- Typescript;
- Zod;
- Drizzle ORM;
- PpostgreSQL.


## ⚙️ Setup

- Clone the repository;
- Install dependencies (`npm install`);
- Setup PostgreSQL (`docker compose up -d`);
- Copy `.env.example` file (`cp .env.example .env`);
- Run application (`npm run dev`);
- Test it! (I personally recommend testing with [Hoppscotch](https://hoppscotch.io/)).

## API routes

## 🔐 Authentication

- **Producer login:** `POST /login-producer`
- **Authenticated user profile:** `GET /me` (requires JWT token)

## Main Endpoints

### 🧑‍🌾 Producers
- `POST /producer` – Register new producer
- `GET /producers` – List all producers
- `GET /producers/:id` – Details of a producer
- `GET /location-producers` – Producers with valid location
- `GET /metrics/:producerId` – Producer Metrics

### 🛒 Products
- `POST /product` – Register new product
- `GET /product` – List products
- `GET /products/:id` – Details of a product
- `GET /products?search=nome` – Search products
- `GET /filter-by-name?name=tomate` – Filter producers by product

## API Documentation (Swagger)

- For API documentation, please visit the link