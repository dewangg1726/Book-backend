// primary declaration for an otherwise untyped package
declare module 'is-my-ip-valid' {
    function isIpValid(ip: string): boolean;
    export = isIpValid;           // CommonJS default export
  }
  