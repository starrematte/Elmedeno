import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export interface CrossdomainOptions {
  permittedPolicies?: string;
}

function getHeaderValueFromOptions (options: CrossdomainOptions): string {
  const DEFAULT_PERMITTED_POLICIES = 'none';
  const ALLOWED_POLICIES = [
    'none',
    'master-only',
    'by-content-type',
    'all',
  ];

  let permittedPolicies: string;
  if ('permittedPolicies' in options) {
    permittedPolicies = options.permittedPolicies as string;
  } else {
    permittedPolicies = DEFAULT_PERMITTED_POLICIES;
  }

  if (ALLOWED_POLICIES.indexOf(permittedPolicies) === -1) {
    throw new Error(`"${permittedPolicies}" is not a valid permitted policy. Allowed values: ${ALLOWED_POLICIES.join(', ')}.`);
  }

  return permittedPolicies;
}

export default function crossdomain (requestResponse: RequestResponseInterface, options: CrossdomainOptions = {}) {
  const headerValue = getHeaderValueFromOptions(options);

  requestResponse.setResponseHeader('X-Permitted-Cross-Domain-Policies', headerValue);
}
