import { products } from './../drizzle/schema/productSchema';
import { db } from "../drizzle/client"
import { ilike } from 'drizzle-orm'

export async function searchProducts(search: string) {
//   if (!search) return []
 console.log('searchProducts search:', search);
 if (!search) {
    // Retornar algum resultado padrão, ex: todos os produtos limitados
    return await db.select().from(products).limit(20);
  }
  const result = await db
    .select()
    .from(products)
    .where(ilike(products.nome, `%${search}%`))
    .limit(20)

  return result
}
