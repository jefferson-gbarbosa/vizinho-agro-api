export type ProducerWithOptionalProduct = {
  id: number;
  nome: string | null;
  latitude: number | null;
  longitude: number | null;
  products: {
    nome: string | null;
    preco: number | null;
  } | null;
};
