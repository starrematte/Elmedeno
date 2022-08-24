import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export interface XXssProtectionOptions {
  mode?: 'block' | null;
  reportUri?: string;
  setOnOldIE?: boolean;
}

function doesUserAgentMatchOldInternetExplorer(userAgent: string | undefined): boolean {
  if (!userAgent) {
    return false;
  }

  const matches = /msie\s*(\d{1,2})/i.exec(userAgent);
  return matches ? parseFloat(matches[1]) < 9 : false;
}

function getHeaderValueFromOptions (options: XXssProtectionOptions): string {
  const directives: string[] = ['1'];

  let isBlockMode: boolean;
  if ('mode' in options) {
    if (options.mode === 'block') {
      isBlockMode = true;
    } else if (options.mode === null) {
      isBlockMode = false;
    } else {
      throw new Error('The `mode` option must be set to "block" or null.');
    }
  } else {
    isBlockMode = true;
  }

  if (isBlockMode) {
    directives.push('mode=block');
  }

  if (options.reportUri) {
    directives.push(`report=${options.reportUri}`);
  }

  return directives.join('; ');
}

export default function xXssProtection (requestResponse: RequestResponseInterface, options: XXssProtectionOptions = {}) {
  const headerValue = getHeaderValueFromOptions(options);

  if (options.setOnOldIE) {
    requestResponse.setResponseHeader('X-XSS-Protection', headerValue);

  } else {
    const value = doesUserAgentMatchOldInternetExplorer(requestResponse.getRequestHeader('user-agent')) ? '0' : headerValue;

    requestResponse.setResponseHeader('X-XSS-Protection', value);
  }
}
