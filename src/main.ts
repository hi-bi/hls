import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {

  const appPort: number = parseInt(process.env.APP_PORT || '4000'); 

  const app = await NestFactory.create(AppModule);
  await app.listen(appPort);
}
bootstrap();
