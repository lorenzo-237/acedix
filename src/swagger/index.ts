import { INestApplication } from '@nestjs/common';
import createApiDoc from './create-api-doc';

class SwaggerDocumentation {
  initialize(app: INestApplication<any>) {
    createApiDoc(app, 'api/docs');
  }
}

export default new SwaggerDocumentation();
