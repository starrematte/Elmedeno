import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export interface ExpectCtOptions {
  maxAge?: number;
  enforce?: boolean;
  reportUri?: string;
}

function isPositiveInteger(option: unknown): option is number {
  return (
    typeof option === 'number' &&
    option >= 0 &&
    Math.round(option) === option
  );
}

function parseMaxAge (option: unknown): number {
  if (isPositiveInteger(option)) {
    return option;
  } else {
    throw new Error(`${option} is not a valid value for maxAge. Please choose a positive integer.`);
  }
}

function getHeaderValueFromOptions (options?: ExpectCtOptions): string {
  options = options || {};

  const directives: string[] = [];

  if (options.enforce) {
    directives.push('enforce');
  }

  const maxAge = 'maxAge' in options ? options.maxAge : 0;
  directives.push(`max-age=${parseMaxAge(maxAge)}`);

  if (options.reportUri) {
    directives.push(`report-uri="${options.reportUri}"`);
  }

  return directives.join(', ');
}

export default function expectCt (requestResponse: RequestResponseInterface, options?: ExpectCtOptions) {
  const headerValue = getHeaderValueFromOptions(options);

  requestResponse.setResponseHeader('Expect-CT', headerValue);
}
