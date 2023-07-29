import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'node:path';
import { writeFileSync } from 'node:fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {

  const appPort: number = parseInt(process.env.PORT || '4000');
  
  console.log('port: ', appPort, process.env.PORT)

  const app = await NestFactory.create(AppModule);

  
  const options = new DocumentBuilder()
    .setTitle("Home Library Service")
    .setDescription("Home music library service")
    .setVersion("1.0")
    .build();
const document = SwaggerModule.createDocument(app, options);

const swaggerDoc = writeFileSync("./doc/swagger-spec.json", JSON.stringify(document));

SwaggerModule.setup("/doc", app, document);

  await app.listen(appPort);
}
bootstrap();
