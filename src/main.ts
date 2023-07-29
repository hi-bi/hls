import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dirname, join } from 'node:path';
import { readFileSync } from 'node:fs';
import { SwaggerModule } from '@nestjs/swagger';
import YAML from 'yaml'

async function bootstrap() {

  const appPort: number = parseInt(process.env.APP_PORT || '4000'); 

  const swaggerDocPath = join(dirname(__dirname), 'doc', 'api.yaml');
  const swaggerDoc = readFileSync(swaggerDocPath, 'utf-8');
  const doc = YAML.parse(swaggerDoc)
  
  const app = await NestFactory.create(AppModule);

  SwaggerModule.setup('doc', app, doc);

  await app.listen(appPort);
}
bootstrap();
