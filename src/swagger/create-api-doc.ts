import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SwaggerTheme } from 'swagger-themes';

export default function createApiDoc(app: INestApplication<any>, url: string) {
  const mainApiOption = new DocumentBuilder()
    .setTitle('Acedix API')
    .setDescription('Cool description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainDocument = SwaggerModule.createDocument(app, mainApiOption);
  const theme = new SwaggerTheme('v3');

  SwaggerModule.setup(url, app, mainDocument, {
    customCss: theme.getBuffer('classic'),
  });
}
