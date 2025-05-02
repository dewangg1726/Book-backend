import { Request, Response, NextFunction } from 'express';
import { Logger } from '../utils';
import { validateIp } from '../utils/ipValidator';
import { buildClientInfo } from './client-info.middleware';

export const routeMiddleware = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  if (req.path !== '/health') {
    const ipValidation = validateIp(req.clientIp);
    const clientInfo = ipValidation.isValid
      ? buildClientInfo(req)
      : { error: ipValidation.reason };

    Logger.group({
      title: 'New Request',
      descriptions: [
        { description: 'URL',    info: `${req.protocol}://${req.get('host')}${req.url}` },
        { description: 'PARAMS', info: req.params },
        { description: 'QUERY',  info: req.query },
        { description: 'BODY',   info: JSON.stringify(req.body) },
        { description: 'CLIENT INFO', info: JSON.stringify(clientInfo) },
      ],
    });
  }
  next();
};
