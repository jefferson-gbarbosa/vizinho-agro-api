import 'dotenv/config'
import { fastify } from 'fastify'
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from 'fastify-type-provider-zod'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { env } from './env'
import { createProducerRoute } from './routes/register-producer-route'
import { getAllProducersRoute } from './routes/get-all-producer-route'
import { getLocationProducersRoute } from './routes/get-location-producer-route'
import { loginProducerRoute } from './routes/login-producer-router'
import { getMetricsProducersRoute } from './routes/get-metrics-producer-id-router'
import { createNewProductRoute} from './routes/register-new-product-route'
import { searchProductsRoute } from './routes/search-product-route'
import { searchFilteredProductsRoute } from './routes/search-filtered-products'
import { profileRoute } from './routes/profile-route'
import { getProductsByIdRoute } from './routes/get-product-by-id-route'
import { getProducerByIdRoute } from './routes/get-producer-by-id-route'
import { getProductsRoute } from './routes/get-products-route'
import { filterByNameRoute } from './routes/filter-by-name-route'

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
app.register(createNewProductRoute)
app.register(loginProducerRoute)
app.register(getAllProducersRoute)
app.register(getProductsByIdRoute)
app.register(getProducerByIdRoute)
app.register(getProductsRoute)
app.register(searchProductsRoute)
app.register(getLocationProducersRoute)
app.register(getMetricsProducersRoute)
app.register(filterByNameRoute)


app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
   if(err){
        console.error(err)
        process.exit()
   }
   console.log(`HTTP server running on ${address}`)
})