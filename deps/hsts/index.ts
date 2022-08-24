import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";
import * as colors from './colors.ts';

const DEFAULT_MAX_AGE = 180 * 24 * 60 * 60;

export interface HstsOptions {
  includeSubDomains?: boolean;
  maxAge?: number | null;
  preload?: boolean;
  setIf?: (requestResponse: RequestResponseInterface) => boolean;
}

function alwaysTrue () {
  return true;
}

export default function hsts (requestResponse: RequestResponseInterface, options: HstsOptions = {}) {
  if ('includeSubdomains' in options) {
    console.log(colors.red('The "includeSubdomains" parameter is deprecated. Use "includeSubDomains" (with a capital D) instead.'));
  }

  if ('setIf' in options) {
    console.log(colors.red('The "setIf" parameter is deprecated. Refer to the documentation to see how to set the header conditionally.'));
  }

  if (Object.prototype.hasOwnProperty.call(options, 'maxage')) {
    throw new Error('maxage is not a supported property. Did you mean to pass "maxAge" instead of "maxage"?');
  }

  const maxAge = options.maxAge !== null && options.maxAge !== undefined ? options.maxAge : DEFAULT_MAX_AGE;
  if (typeof maxAge !== 'number') {
    throw new TypeError('HSTS must be passed a numeric maxAge parameter.');
  }
  if (maxAge < 0) {
    throw new RangeError('HSTS maxAge must be nonnegative.');
  }

  const { setIf = alwaysTrue } = options;
  if (typeof setIf !== 'function') {
    throw new TypeError('setIf must be a function.');
  }

  if (
    Object.prototype.hasOwnProperty.call(options, 'includeSubDomains') &&
    Object.prototype.hasOwnProperty.call(options, 'includeSubdomains')
  ) {
    throw new Error('includeSubDomains and includeSubdomains cannot both be specified.');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const includeSubDomains = options.includeSubDomains !== false && (options as any).includeSubdomains !== false;

  let header = `max-age=${Math.round(maxAge)}`;
  if (includeSubDomains) {
    header += '; includeSubDomains';
  }
  if (options.preload) {
    header += '; preload';
  }

  if (setIf(requestResponse)) {
    requestResponse.setResponseHeader('Strict-Transport-Security', header);
  }
}
