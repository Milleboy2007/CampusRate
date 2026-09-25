    import { INestApplication } from '@nestjs/common';
    import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

    export function configureSwagger(app: INestApplication): void {
      const config = new DocumentBuilder()
        .setTitle('CampusRate API')
        .setDescription(
          "API REST de gestion d'appreciation pour des endroits.",
        )
        .setVersion('1.0.0')
        .addTag('Places', 'Gestion des endroits')
        .addTag('Reviews', 'Gestion des appreciation')
        .build();

      const documentFactory = () =>
        SwaggerModule.createDocument(app, config);

      SwaggerModule.setup('docs', app, documentFactory, {
        jsonDocumentUrl: 'docs/openapi.json',
        customSiteTitle: 'CampusRate API - Documentation',
      });
    }