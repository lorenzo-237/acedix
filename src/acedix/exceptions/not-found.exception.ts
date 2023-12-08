import { HttpException, HttpStatus } from '@nestjs/common';

class NotFoundException extends HttpException {
  constructor(message: string | null = null) {
    super(`Not Found${message ? ': ' + message : ''}`, HttpStatus.NOT_FOUND);
  }
}

export default NotFoundException;
