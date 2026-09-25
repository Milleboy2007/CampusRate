import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;


    const title = exception instanceof HttpException? exception.name: 'Internal Server Error';

    let detail = 'Une erreur inattendue est survenue.';
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      detail = typeof res.message === 'string' ? res.message : (res.message?.join(', ') || res.error);
    }


    if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
      detail = "Une erreur interne du serveur empêche de traiter la requête.";
      console.error('Erreur technique masquée :', exception);
    }

    const problemDetails = {
      type: 'about:blank',
      title: title,
      status: status,
      detail: detail,
      instance: request.url,
    };

    response
      .status(status)
      .header('Content-Type', 'application/problem+json')
      .json(problemDetails);
  }
}