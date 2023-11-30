import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default function createApiDoc(app: INestApplication<any>, url: string) {
  const mainApiOption = new DocumentBuilder()
    .setTitle('Acedix API')
    .setDescription('Cool description')
    .setVersion('1.0')
    .addTag('API')
    .build();
  const mainDocument = SwaggerModule.createDocument(app, mainApiOption);
  SwaggerModule.setup(url, app, mainDocument);
}
