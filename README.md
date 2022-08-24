<p align="center">
  <img height="100%" width="100%" src="https://github.com/starrematte/elmedeno/raw/main/.github/logo_1.png" alt="A Deno with little helmet, so Elmedeno"></a>
  <h1 align="center">Elmedeno</h1>
</p>
<p align="center">
   <a href="https://github.com/starrematte/elmedeno/tags/"><img src="https://img.shields.io/github/v/tag/starrematte/elmedeno" alt="Current version" /></a>
   <!-- <img src="https://github.com/starrematte/elmedeno/workflows/Test/badge.svg" alt="Current test status" /> -->
   <!-- <a href="https://doc.deno.land/https/deno.land/x/elmedeno/mod.ts"><img src="https://doc.deno.land/badge.svg" alt="Elmedeno docs" /></a> -->
   <a href="http://makeapullrequest.com">
    <img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg" alt="PRs are welcome to anyone" />
   </a>
   <!-- <a href="https://github.com/starrematte/elmedeno/issues/"><img src="https://img.shields.io/github/issues/starrematte/elmedeno" alt="Elmedeno issues" /></a> -->
   <img src="https://img.shields.io/github/stars/starrematte/elmedeno" alt="Elmedeno stars" />
   <img src="https://img.shields.io/github/forks/starrematte/elmedeno" alt="Elmedeno forks" />
   <img src="https://img.shields.io/github/license/starrematte/elmedeno" alt="Elmedeno license" />
   <a href="https://GitHub.com/mattestarre/elmedeno/graphs/commit-activity">
    <img src="https://img.shields.io/badge/Maintained%3F-yes-green.svg" alt="Elmedeno is maintained" />
   </a>
</p>
<p align="center">
   <a href="https://deno.land/x/elmedeno"><img src="https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Felmedeno%2Fmod.ts" alt="Elmedeno latest /x/ version" /></a>
</p>

# Elmedeno

A middleware for secure Deno web applications Elmedeno is a fully customizable
security middleware for the major Deno web frameworks. Elmedeno is based totally
on code from the [Snelm](https://www.npmjs.com/package/helmet) middleware for
Deno and conseguentially from the [Helmet](https://www.npmjs.com/package/helmet)
middleware for NodeJS. Elmedeno currently has built in support and examples for
the following Deno web frameworks:

- **[Oak](https://deno.land/x/oak)**
- **[ABC](https://deno.land/x/abc)**
- **[Alosaur](https://deno.land/x/alosaur)**
- **[Pogo](https://deno.land/x/pogo)**
- **[Aqua](https://deno.land/x/aqua)**
- **[Attain](https://deno.land/x/attain)**
- **[Fresh](https://deno.land/x/fresh)**
- **[Opine](https://deno.land/x/opine)**

#### More coming soon...

## Basic Usage

Elmedeno is very easy to use. You simply import Elmedeno, instanciate it with
the framework you want to use and then pass the **request** and **response**
objects from your chosen framework into the Elmedeno function. Elmedeno will
return the original response object with various headers set to improve security
without having to set any configurations. For example, to use Elmedeno with the
**Fresh framework**:

```javascript
// Importing fresh
import { Application } from "https://deno.land/x/fresh/mod.ts";
// Importing Elmedeno
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for the Fresh framework
const elmedeno = new Elmedeno("fresh");

// Using Elmedeno Middleware for Fresh :tada:
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = await elmedeno.protect(req, await ctx.next());
  return res;
}
```

## Configuring Elmedeno

Elmedeno is fully customizable, and uses very similar configurations as the
underlying components used in the NodeJS
[helmet](https://www.npmjs.com/package/helmet) middleware. Elmedeno includes the
following components with the following keys to configure them. You can follow
any of these links to the respective NPM repositories to learn more about what
each component does and what configuration options are available:

- **[X-Permitted-Cross-Domain-Policies Middleware](https://www.npmjs.com/package/helmet-crossdomain)**
  -> `crossDomain`
- **[Content Security Policy Middleware](https://www.npmjs.com/package/helmet-csp)**
  -> `csp`
- **[DNS Prefetch Control Middleware](https://www.npmjs.com/package/dns-prefetch-control)**
  -> `dnsPrefetchControl`
- **[Dont Sniff Mimetype Middleware](https://www.npmjs.com/package/dont-sniff-mimetype)**
  -> `dontSniffMimetype`
- **[Expect-CT Middleware](https://www.npmjs.com/package/expect-ct)** ->
  `expectCt`
- **[Feature Policy Middleware](https://www.npmjs.com/package/feature-policy)**
  -> `featurePolicy`
- **[Frameguard Middleware](https://www.npmjs.com/package/frameguard)** ->
  `frameguard`
- **[Hide X-Powered-By Middleware](https://www.npmjs.com/package/hide-powered-by)**
  -> `hidePoweredBy`
- **[HTTP Strict Transport Security Middleware](https://www.npmjs.com/package/hsts)**
  -> `hsts`
- **[Internet Explorer Restrict Untrusted HTML Middleware](https://www.npmjs.com/package/ienoopen)**
  -> `ieNoOpen`
- **[Referrer Policy Middleware](https://www.npmjs.com/package/referrer-policy)**
  -> `referrerPolicy`
- **[X-XSS-Protection Middleware](https://www.npmjs.com/package/x-xss-protection)**
  -> `xssProtection`

Any individual component can be disabled by setting its key to `null`. For
example, if we wanted to remove the Hide X-Powered-By Middleware, we can
configure Elmedeno like so:

```javascript
const elmedeno = new Elmedeno("oak", {
  hidePoweredBy: null,
});
```

Or if we wanted to disable all of the components:

```javascript
const elmedeno = new Elmedeno("pogo", {
  crossDomain: null,
  csp: null,
  dnsPrefetchControl: null,
  dontSniffMimetype: null,
  expectCt: null,
  featurePolicy: null,
  frameguard: null,
  hidePoweredBy: null,
  hsts: null,
  ieNoOpen: null,
  referrerPolicy: null,
  xssProtection: null,
});
```

We can configure components using the same inputs as the middleware they are
based on. For example, the Referrer Policy Middleware accepts parameters to
change the referrer policy:

```javascript
const elmedeno = new Elmedeno("oak", {
  referrerPolicy: {
    policy: "same-origin",
  },
});
```

Finally, below is an example of setting many configurations to various
components within Elmedeno to demonstrate some of the configurations for the
components:

```javascript
// crossDomain config
const crossDomainConfig = {
  permittedPolicies: "none",
};

// csp config
const cspConfig = {
  // Specify directives as normal.
  directives: {
    defaultSrc: ["'self'", "default.com"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    styleSrc: ["style.com"],
    fontSrc: ["'self'", "fonts.com"],
    imgSrc: ["img.com", "data:"],
    sandbox: ["allow-forms", "allow-scripts"],
    reportUri: "/report-violation",
    objectSrc: ["'none'"],
    upgradeInsecureRequests: true,
    workerSrc: false, // This is not set.
  },

  // This module will detect common mistakes in your directives and throw errors
  // if it finds any. To disable this, enable "loose mode".
  loose: false,

  // Set to true if you only want browsers to report errors, not block them.
  // You may also set this to a function(req, res) in order to decide dynamically
  // whether to use reportOnly mode, e.g., to allow for a dynamic kill switch.
  reportOnly: false,

  // Set to true if you want to blindly set all headers: Content-Security-Policy,
  // X-WebKit-CSP, and X-Content-Security-Policy.
  setAllHeaders: false,

  // Set to true if you want to disable CSP on Android where it can be buggy.
  disableAndroid: false,

  // Set to false if you want to completely disable any user-agent sniffing.
  // This may make the headers less compatible but it will be much faster.
  // This defaults to `true`.
  browserSniff: true,
};

// dnsPrefetchControl config
const dnsPrefetchControlConfig = {
  allow: true,
};

// expectCt config
const expectCtConfig = {
  enforce: true,
  maxAge: 30,
  reportUri: "https://example.com/report",
};

// featurePolicy config
const featurePolicyConfig = {
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ["example.com"],
    syncXhr: ["'none'"],
  },
};

// frameguard config
const frameguardConfig = {
  action: "allow-from",
  domain: "https://example.com",
};

// hidePoweredBy config
const hidePoweredByConfig = {
  setTo: "PHP 4.2.0",
};

// hsts config
const hstsConfig = {
  maxAge: 31536000,
  includeSubDomains: true,
  preload: true,
};

// referrerPolicy config
const referrerPolicyConfig = {
  policy: "same-origin",
};

// xssProtection config
const xssProtectionConfig = {
  setOnOldIE: true,
  reportUri: "/report-xss-violation",
  mode: null,
};

// Adding configuration to elmedeno
const elmedeno = new Elmedeno("pogo", {
  crossDomain: crossDomainConfig,
  csp: cspConfig,
  dnsPrefetchControl: dnsPrefetchControlConfig,
  expectCt: expectCtConfig,
  featurePolicy: featurePolicyConfig,
  frameguard: frameguardConfig,
  hidePoweredBy: hidePoweredByConfig,
  hsts: hstsConfig,
  referrerPolicy: referrerPolicyConfig,
  xssProtection: xssProtectionConfig,
});
```

## Examples

Here there is a list of basic usages with the supported frameworks:

### Oak

Elmedeno Middleware example for Oak:

```typescript
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Application();

// Configuring Elmedeno for the Oak framework
const elmedeno = new Elmedeno("oak");

// Elmedeno Middleware for Oak
app.use(async (ctx, next) => {
  ctx.response = await elmedeno.protect(ctx.request, ctx.response);
  next();
});

app.use((ctx) => {
  ctx.response.body = "Oak";
});

await app.listen({ port: 8000 });
```

### ABC

Elmedeno Middleware example for ABC:

```typescript
import { Application, MiddlewareFunc } from "https://deno.land/x/abc/mod.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Application();

// Configuring Elmedeno for ABC
const elmedeno = new Elmedeno("abc");

// Elmedeno middleware for ABC
const ElmedenoMiddleware: MiddlewareFunc = (next) =>
  async (c) => {
    await elmedeno.protect(c.request, c.response);
    return next(c);
  };

// Adding the Elmedeno middleware to your web application
app.use(ElmedenoMiddleware);

app.get("/", (c) => {
  return "Abc";
}).start({ port: 8080 });
```

### Alsosaur

Elmedeno Middleware example for Alosaur:

```typescript
import { App, Area, Controller, Get } from "https://deno.land/x/alosaur/mod.ts";
import { Middleware } from "https://deno.land/x/alosaur/src/decorator/Middleware.ts";
import { MiddlewareTarget } from "https://deno.land/x/alosaur/src/models/middleware-target.ts";
import { HttpContext } from "https://deno.land/x/alosaur/src/models/http-context.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for Alosaur
const elmedeno = new Elmedeno("alosaur");

// Elmedeno Middleware for Alosaur
@Middleware(new RegExp("/"))
export class ElmedenoMiddleware implements MiddlewareTarget {
  onPreRequest(context: HttpContext) {
    return new Promise<void>(async (resolve, reject) => {
      await elmedeno.protect(context.request, context.response);
      resolve();
    });
  }

  onPostRequest(context: HttpContext) {
    return new Promise<void>((resolve, reject) => {
      resolve();
    });
  }
}

@Controller("/")
export class MainController {
  @Get("")
  text() {
    return "Alosaur";
  }
}

// Declare module
@Area({
  controllers: [MainController],
})
export class MainArea {}

// Create Alosaur application
const app = new App({
  areas: [MainArea],
  // Adding the Elmedeno Middleware to the application
  middlewares: [ElmedenoMiddleware],
});

app.listen();
```

### Pogo

As Pogo does not support middleware currently, you'll have to call elmedeno
within the individual routes:

```javascript
import pogo from "https://deno.land/x/pogo/main.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const server = pogo.server({ port: 55555 });

// Configuring Elmedeno for Pogo
const elmedeno = new Elmedeno("pogo");

server.router.get("/", async (request, _handler) => {
  request.response = await elmedeno.protect(request, request.response);
  request.response.body = "Pogo";
  return request.response;
});

server.start();
```

### Aqua

```javascript
import Aqua from "https://deno.land/x/aqua/aqua.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Aqua(8000);

// Configuring Elmedeno for Aqua
const elmedeno = new Elmedeno("aqua");

// Elmedeno Middleware for Aqua
app.register(async (request, response) => {
  response = await elmedeno.protect(request, response);

  return response;
});

app.get("/", (request, response) => {
  return "Aqua";
});
```

### Attain

```typescript
import { App, Request, Response } from "https://deno.land/x/attain/mod.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new App();

// Configuring Elmedeno for Attain
const elmedeno = new Elmedeno("attain");

// Elmedeno middleware for Attain
const elmedenoMiddleware = async (req: Request, res: Response) => {
  res = await elmedeno.protect(req, res);
};

// Adding the middleware
app.use(elmedenoMiddleware, (req, res) => {
  res.status(200).send({ status: "Good" });
});

app.listen({ port: 3500 });
```

### Fresh

```typescript
import { MiddlewareHandlerContext } from "https://deno.land/x/fresh/server.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for the Fresh framework
const elmedeno = new Elmedeno("fresh");

// Elmedeno Middleware for Fresh
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = await elmedeno.protect(req, await ctx.next());
  return res;
}
```

### Opine

```typescript
import express from "https://esm.sh/express";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for the Opine framework
const elmedeno = new Elmedeno("opine");

const app = opine();

const elmedenoMiddleware: RequestHandler = async function (
  req: OpineRequest,
  res: OpineResponse,
  next: () => void,
) {
  await elmedeno.protect(req, res);
  next();
};

app.use(elmedenoMiddleware);

app.get("/", (req, res) => {
  res.end("Hello from Elmedeno and Opine on port 8000");
});

app.listen(8000);
```

# License

Parts of the software is adapted from other modules. The software ported here
have preserved their individual licenses and copyrights. All of the modules,
including those directly adapted are licensed under the MIT License.

All additional work is under copyright of the Emeldeno author. All rights
reserved.
