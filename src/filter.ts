import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ContentTypeFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception.status && exception.message) {
      const exceptionMessage = {
        error: exception.message,
      };
      response.status(exception.status).send(exceptionMessage);
    } else {
      response.status(500).send('Internal Server Error');
    }
  }
}
