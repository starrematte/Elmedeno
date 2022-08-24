import camelize from './lib/camelize/index.js';
import cspBuilder from './lib/content-security-policy-builder/index.ts';
import Bowser from './lib/bowser/src/bowser.js';
import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

import isFunction from './lib/is-function.ts';
import checkOptions from './lib/check-options/index.ts';
import containsFunction from './lib/contains-function.ts';
import getHeaderKeysForBrowser from './lib/get-header-keys-for-browser.ts';
import transformDirectivesForBrowser from './lib/transform-directives-for-browser.ts';
import parseDynamicDirectives from './lib/parse-dynamic-directives.ts';
import config from './lib/config.ts';
import { CspOptions, ParsedDirectives } from './lib/types.ts';
export type { CspOptions } from './lib/types.ts';

export default function csp (requestResponse: RequestResponseInterface, options: CspOptions) {
  if (options === undefined) {
    return;
  }
  checkOptions(options);

  const originalDirectives = camelize(options.directives || {});
  const directivesAreDynamic = containsFunction(originalDirectives);
  const shouldBrowserSniff = options.browserSniff !== false;

  if (shouldBrowserSniff) {
    const userAgent = requestResponse.getRequestHeader('user-agent');

    let browser;
    if (userAgent) {
      browser = Bowser.getParser(userAgent);
    } else {
      browser = undefined;
    }

    let headerKeys: string[];
    if (options.setAllHeaders || !userAgent) {
      headerKeys = config.allHeaders;
    } else {
      headerKeys = getHeaderKeysForBrowser(browser, options);
    }

    if (headerKeys.length === 0) {
      return;
    }

    let directives = transformDirectivesForBrowser(browser, originalDirectives);

    if (directivesAreDynamic) {
      directives = parseDynamicDirectives(directives, [requestResponse]);
    }

    const policyString = cspBuilder({ directives: directives as ParsedDirectives });

    headerKeys.forEach((headerKey) => {
      if (isFunction(options.reportOnly) && options.reportOnly(requestResponse) ||
          !isFunction(options.reportOnly) && options.reportOnly) {
        headerKey += '-Report-Only';
      }
      requestResponse.setResponseHeader(headerKey, policyString);
    });

  } else {
    const headerKeys: readonly string[] = options.setAllHeaders ? config.allHeaders : ['Content-Security-Policy'];

    const directives = parseDynamicDirectives(originalDirectives, [requestResponse]);
    const policyString = cspBuilder({ directives });

    if (isFunction(options.reportOnly) && options.reportOnly(requestResponse) ||
        !isFunction(options.reportOnly) && options.reportOnly) {
      headerKeys.forEach((headerKey) => {
        requestResponse.setResponseHeader(`${headerKey}-Report-Only`, policyString);
      });
    } else {
      headerKeys.forEach((headerKey) => {
        requestResponse.setResponseHeader(headerKey, policyString);
      });
    }
  }
};
