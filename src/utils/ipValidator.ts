import isIp from 'is-my-ip-valid';

const LOCALHOST_IPS = [
  '127.0.0.1',
  '::1',
  '::ffff:127.0.0.1',
] as const;

export type IpValidationResult = {
  isValid: boolean;
  reason?: string;
};

export const validateIp = (ip: string | undefined): IpValidationResult => {
  if (!ip) return { isValid: false, reason: 'IP is empty' };

  if (LOCALHOST_IPS.includes(ip as any))
    return { isValid: false, reason: 'Localhost IP not allowed' };

  const isValid = isIp(ip);          // true / false
  return { isValid, reason: isValid ? undefined : 'Invalid IP format' };
};
