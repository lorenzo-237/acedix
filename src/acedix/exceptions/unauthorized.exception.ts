import { HttpException, HttpStatus } from '@nestjs/common';

class UnAuthorizedException extends HttpException {
  constructor(message: string | null = null) {
    super(
      `UnAuthorized${message ? ': ' + message : ''}`,
      HttpStatus.UNAUTHORIZED,
    );
  }
}

export default UnAuthorizedException;
