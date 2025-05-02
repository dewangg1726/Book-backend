import { Request, Response, NextFunction } from 'express';
import requestIp from 'request-ip';

/**
 * Attach req.clientIp using best-guess headers (X-Forwarded-For, etc.)
 */
export const clientIpMiddleware =
  () => (req: Request, _res: Response, next: NextFunction) => {
    req.clientIp = requestIp.getClientIp(req) || '';
    next();
  };

/** Return a small object for the log */
export const buildClientInfo = (req: Request) => ({
  ip: req.clientIp,
  userAgent: req.headers['user-agent'],
  route: req.originalUrl,
});
