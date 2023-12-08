import { HttpException, HttpStatus } from '@nestjs/common';

class ForbiddenException extends HttpException {
  constructor(message: string | null = null) {
    super(`Forbidden${message ? ': ' + message : ''}`, HttpStatus.FORBIDDEN);
  }
}

export default ForbiddenException;
