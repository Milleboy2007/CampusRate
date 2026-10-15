import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { ProblemDetailsFilter } from './common/filters/problem-details.filter';
import { configureSwagger } from './configure-swagger';
import helmet from 'helmet';
import * as fs from 'fs';
import * as path from 'path';
import * as http from 'http';

import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync(path.join(process.cwd(), `${process.env.EMP_HTTPS_INFO}/key.pem`)),
    cert: fs.readFileSync(path.join(process.cwd(), `${process.env.EMP_HTTPS_INFO}/cert.pem`))
  }

  const app = await NestFactory.create(AppModule, {
    httpsOptions
  });


  app.use(helmet());

  app.enableCors({
    origin: ['http://localhost:8080'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.setGlobalPrefix('api');

  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1'
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  );

  app.useGlobalFilters(new ProblemDetailsFilter())

  configureSwagger(app);

  await app.listen(process.env.PORT ?? 3001);

  http.createServer((req, res) => {
    const redirectUrl = `https://${req.headers.host?.split(":")[0]}:${process.env.PORT}${req.url}`;
    res.writeHead(302, { Location: redirectUrl });
    res.end();
  }).listen(3000, () => {
    console.log(`➡️  Serveur de redirection (HTTP) en écoute sur : http://localhost:3000`);
  });
}
bootstrap();
