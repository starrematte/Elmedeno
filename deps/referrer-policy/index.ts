import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export interface ReferrerPolicyOptions {
  policy?: string | string[];
}

function getHeaderValueFromOptions (options?: ReferrerPolicyOptions): string {
  const DEFAULT_POLICY = 'no-referrer';
  const ALLOWED_POLICIES: string[] = [
    'no-referrer',
    'no-referrer-when-downgrade',
    'same-origin',
    'origin',
    'strict-origin',
    'origin-when-cross-origin',
    'strict-origin-when-cross-origin',
    'unsafe-url',
    '',
  ];

  options = options || {};

  let policyOption: unknown;
  if ('policy' in options) {
    policyOption = options.policy;
  } else {
    policyOption = DEFAULT_POLICY;
  }

  const policies: unknown[] = Array.isArray(policyOption) ? policyOption : [policyOption];

  if (policies.length === 0) {
    throw new Error('At least one policy must be supplied.');
  }

  const policiesSeen: Set<string> = new Set();
  policies.forEach((policy) => {
    if (typeof policy !== 'string' || ALLOWED_POLICIES.indexOf(policy) === -1) {
      const allowedPoliciesErrorList = ALLOWED_POLICIES.map((policy) => {
        if (policy.length) {
          return `"${policy}"`;
        } else {
          return 'and the empty string';
        }
      }).join(', ');
      throw new Error(`"${policy}" is not a valid policy. Allowed policies: ${allowedPoliciesErrorList}.`);
    }

    if (policiesSeen.has(policy)) {
      throw new Error(`"${policy}" specified more than once. No duplicates are allowed.`);
    }
    policiesSeen.add(policy);
  });

  return policies.join(',');
}

export default function referrerPolicy (requestResponse: RequestResponseInterface, options?: ReferrerPolicyOptions) {
  const headerValue = getHeaderValueFromOptions(options);

  requestResponse.setResponseHeader('Referrer-Policy', headerValue);
}
