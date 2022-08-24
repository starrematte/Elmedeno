import { CrossdomainOptions } from "../deps/crossdomain/index.ts";
import { CspOptions } from "../deps/csp/index.ts";
import { DnsPrefetchControlOptions } from "../deps/dns-prefetch-control/index.ts";
import { ExpectCtOptions } from "../deps/expect-ct/index.ts";
import { FeaturePolicyOptions } from "../deps/feature-policy/index.ts";
import { FrameguardOptions } from "../deps/frameguard/index.ts";
import { HidePoweredByOptions } from "../deps/hide-powered-by/index.ts";
import { HstsOptions } from "../deps/hsts/index.ts";
import { ReferrerPolicyOptions } from "../deps/referrer-policy/index.ts";
import { XXssProtectionOptions } from "../deps/x-xss-protection/index.ts";
export type { CrossdomainOptions } from "../deps/crossdomain/index.ts";
export type { CspOptions } from "../deps/csp/index.ts";
export type { DnsPrefetchControlOptions } from "../deps/dns-prefetch-control/index.ts";
export type { ExpectCtOptions } from "../deps/expect-ct/index.ts";
export type { FeaturePolicyOptions } from "../deps/feature-policy/index.ts";
export type { FrameguardOptions } from "../deps/frameguard/index.ts";
export type { HidePoweredByOptions } from "../deps/hide-powered-by/index.ts";
export type { HstsOptions } from "../deps/hsts/index.ts";
export type { ReferrerPolicyOptions } from "../deps/referrer-policy/index.ts";
export type { XXssProtectionOptions } from "../deps/x-xss-protection/index.ts";



export interface Options {
    crossDomain?: CrossdomainOptions | any
    csp?: CspOptions | any
    dnsPrefetchControl?: DnsPrefetchControlOptions | any
    dontSniffMimetype?: boolean | any
    expectCt?: ExpectCtOptions | any
    featurePolicy?: FeaturePolicyOptions | any
    frameguard?: FrameguardOptions | any
    hidePoweredBy?: HidePoweredByOptions | any
    hsts?: HstsOptions | any
    ieNoOpen?: boolean | any
    referrerPolicy?: ReferrerPolicyOptions | any
    xssProtection?: XXssProtectionOptions | any
}
