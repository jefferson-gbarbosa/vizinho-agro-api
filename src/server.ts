import 'dotenv/config'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'
import { createProducerRoute } from './routes/register-producer-route'
import { createConsumerRoute } from './routes/register-consumer-route'
import { loginConsumerRoute } from './routes/login-consumer-route'
import { getAllProducersRoute } from './routes/get-all-producer-route'
import { getLocationProducersRoute } from './routes/get-location-producer-route'
import { loginProducerRoute } from './routes/login-producer-router'
import { getMetricsProducersRoute } from './routes/get-metrics-producer-id-router'
import { createNewProductRoute} from './routes/register-new-product-route'
import { getConsumersRoute } from './routes/get-consumer-router'
import { getProductsRoute } from './routes/get-product-route'
import { searchProductsRoute } from './routes/search-product-route'
import { searchFilteredProductsRoute } from './routes/search-filtered-products'
import { profileRoute } from './routes/profile-route'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*'})

app.register(fastifySwagger, {
    openapi: {
        info: {
        title: 'Vizinho Agro',
        version: '1.0.0',
        },
    },
    transform: jsonSchemaTransform,  
})
  
app.register(fastifySwaggerUi, {
 routePrefix: '/docs',
})

app.register(profileRoute);
app.register(createProducerRoute)
app.register(createConsumerRoute)
app.register(createNewProductRoute)
app.register(loginConsumerRoute)
app.register(loginProducerRoute)
app.register(getAllProducersRoute)
app.register(getProductsRoute)
app.register(searchProductsRoute)
app.register(getLocationProducersRoute)
app.register(getMetricsProducersRoute)
app.register(getConsumersRoute)
app.register(searchFilteredProductsRoute)

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
   if(err){
        console.error(err)
        process.exit()
   }
   console.log(`HTTP server running on ${address}`)
})