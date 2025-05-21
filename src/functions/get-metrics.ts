import { eq } from 'drizzle-orm';
import { db } from "../drizzle/client"
import { metrics } from '../drizzle/schema/metricsSchema';



export async function getMetricsByProducer(producerId: number) {
  return await db
    .select()
    .from(metrics)
    .where(eq(metrics.producerId, producerId));
}

