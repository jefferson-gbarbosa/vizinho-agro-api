// src/functions/filter-products.ts
import { db } from "../drizzle/client";
import { eq } from "drizzle-orm";
import { producers } from "../drizzle/schema/producerSchema";
import { products } from "../drizzle/schema/productSchema";

function haversine(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // raio da Terra em km
  const toRad = (x: number) => x * Math.PI / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

type FilterParams = {
  distance: number;
  type?: string;
  price?: number;
  latitude: number;
  longitude: number;
};

export async function filterProducts({
  distance,
  type,
  price,
  latitude,
  longitude,
}: FilterParams) {
  const rows = await db
    .select({
      id: producers.id,
      nome: producers.nome,
      latitude: producers.latitude,
      longitude: producers.longitude,
      preco: products.preco,
      tipo: products.tipo,
      imagem: products.imagem,
      quantidade: products.quantidade,
      disponibilidadeTipo: products.disponibilidadeTipo,
      disponivelAte: products.disponivelAte,
      producerId: producers.id,
    })
    .from(producers)
    .leftJoin(products, eq(products.producerId, producers.id));

  const filtered = rows.filter((row) => {
    if (row.latitude == null || row.longitude == null) return false;

    const d = haversine(latitude, longitude, row.latitude, row.longitude);
    const dentroDistancia = d <= distance;

    const tipoOk = type ? row.tipo?.toLowerCase().includes(type.toLowerCase()) : true;
    const precoOk = price ? (row.preco ?? Infinity) <= price : true;
 
    return dentroDistancia && tipoOk && precoOk 
  });

  return filtered;
}
