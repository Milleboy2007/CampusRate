import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import type { Request, Response } from 'express';

@Catch()
export class ProblemDetailsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = exception instanceof HttpException? exception.getStatus(): HttpStatus.INTERNAL_SERVER_ERROR;


    let title = exception instanceof HttpException? exception.name: 'Internal Server Error';

    let detail = 'Une erreur inattendue est survenue.';
    if (exception instanceof HttpException) {
      const res = exception.getResponse() as any;
      detail = typeof res.message === 'string' ? res.message : (res.message?.join(', ') || res.error);
    }else if((exception as any)?.type === 'entity.too.large'){
      status = HttpStatus.PAYLOAD_TOO_LARGE;
      title = 'Payload Too Large';
      detail = `Le corps de la requête est trop volumineux. La limite est fixée à ${(exception as any).limit} octets.`
    }else if (status === HttpStatus.INTERNAL_SERVER_ERROR) {
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