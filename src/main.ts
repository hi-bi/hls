import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { writeFileSync } from 'node:fs';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { LoggerService } from './services/logging-services/logging-services.service';

async function bootstrap() {

  const appPort: number = parseInt(process.env.PORT || '4000');

  const app = await NestFactory.create(AppModule);
    
    app.useGlobalPipes( new ValidationPipe());

    app.useLogger(app.get(LoggerService));
    
    const options = new DocumentBuilder()
      .setTitle("Home Library Service")
      .setDescription("Home music library service")
      .setVersion("1.0")
      .build();
  const document = SwaggerModule.createDocument(app, options);

  const swaggerDoc = writeFileSync("./doc/swagger-spec.json", JSON.stringify(document));

  SwaggerModule.setup("/doc", app, document);

  await app.listen(appPort);
  
  //console.log('App running on port: ', appPort);

  app.get(LoggerService).log(`Started [App running on port: ${appPort}]`, 'AppBootstrap')

}
bootstrap();
