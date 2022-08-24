import config from '../../config.ts';

import boolean from './boolean.ts';
import pluginTypes from './plugin-types.ts';
import reportUri from './report-uri.ts';
import requireSriFor from './require-sri-for.ts';
import sandbox from './sandbox.ts';
import sourceList from './source-list.ts';

import { CspOptions } from '../../types.ts';

interface Checkers {
  [directiveType: string]: (key: string, value: unknown) => void;
}

const checkers: Checkers = {
  boolean,
  pluginTypes,
  reportUri,
  requireSriFor,
  sandbox,
  sourceList,
};

export default function checkDirective (key: string, value: unknown, options: CspOptions) {
  if (options.loose) { return; }

  if (!Object.prototype.hasOwnProperty.call(config.directives, key)) {
    throw new Error(`"${key}" is an invalid directive. See the documentation for the supported list. Force this by enabling loose mode.`);
  }

  // This cast is safe thanks to the above check.
  const directiveType = config.directives[key as keyof typeof config.directives].type;
  checkers[directiveType](key, value);
};
