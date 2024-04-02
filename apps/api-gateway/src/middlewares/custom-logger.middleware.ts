import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction, response } from 'express';

@Injectable()
export class CustomLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('API Logger');

  use(req: Request, res: Response, next: NextFunction) {
    res.on('finish', () => {
      const { statusCode } = res;
      const contentLength = req.get('content-length');
      const userAgent = req.get('user-agent') || '';

      const logMessage = `${userAgent} ${req.ip} ${req.method} ${req.originalUrl} ${contentLength} - ${statusCode}`;

      this.logger.log(logMessage);
    });

    next();
  }
}
