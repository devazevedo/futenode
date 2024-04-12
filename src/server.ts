import fastify from 'fastify';
import { insertTeams } from './routes/insert-teams';
import { getTeams } from './routes/get-teams';
import { serializerCompiler, validatorCompiler, jsonSchemaTransform } from 'fastify-type-provider-zod';

const app = fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(insertTeams);
app.register(getTeams);

app.listen({ port:3333, host: '0.0.0.0' }).then(() => {
  console.log('Server is running on port 3333');
});