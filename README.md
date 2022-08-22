# Elmedeno
A middleware for secure Deno web applications
Elmedeno is a fully customizable security middleware for the major Deno web frameworks. Elmedeno is based totally on code from the [Snelm](https://www.npmjs.com/package/helmet) middleware for Deno and conseguentially from [helmet](https://www.npmjs.com/package/helmet) middleware for NodeJS. Elmedeno currently has built in support and examples for the following Deno web frameworks:

 * **[Oak](https://deno.land/x/oak)** 
 * **[ABC](https://deno.land/x/abc)** 
 * **[Alosaur](https://deno.land/x/alosaur)** 
 * **[Pogo](https://deno.land/x/pogo)** 
 * **[Aqua](https://deno.land/x/aqua)** 
 * **[Attain](https://deno.land/x/attain)** 
 * **[Fresh](https://deno.land/x/fresh)** 
 # More coming soon...

## Basic Usage

Elmedeno has a very easy and unified interface for all the major web frameworks. You simply import Elmedeno, choose a framework, initialize it, and then pass the **request** and **response** objects from your chosen framework into the Elmedeno function. Elmedeno will return the original response object with various headers set to improve security without having to set any configurations. For example, to use Elmedeno with the **Oak framework**:

```javascript
import { Application } from "https://deno.land/x/oak/mod.ts";

// Importing Elmedeno
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Application();

// Creating and initializing a Elmedeno object and setting Oak as the framework
const elmedeno = new Elmedeno("oak");
await elmedeno.init();

// Passing the request and response object into the elmedeno function. That's all
// you need to do to use Elmedeno! Now all responses objects will have the
// additional security measures provided by Elmedeno.
app.use((ctx, next) => {
    ctx.response = elmedeno.elmedeno(ctx.request, ctx.response);

    next();
});

app.use((ctx) => {
    ctx.response.body = "Oak";
});

await app.listen({ port: 8000 });
```

## Configuring Elmedeno

Elmedeno is fully customizable, and uses very similar configurations as the underlying components used in the NodeJS [helmet](https://www.npmjs.com/package/helmet) middleware. Elmedeno includes the following components with the following keys to configure them. You can follow any of these links to the respective NPM repositories to learn more about what each component does and what configuration options are available:

 * **[X-Permitted-Cross-Domain-Policies Middleware](https://www.npmjs.com/package/helmet-crossdomain)** -> `crossDomain`
 * **[Content Security Policy Middleware](https://www.npmjs.com/package/helmet-csp)** -> `csp`
 * **[DNS Prefetch Control Middleware](https://www.npmjs.com/package/dns-prefetch-control)** -> `dnsPrefetchControl`
 * **[Dont Sniff Mimetype Middleware](https://www.npmjs.com/package/dont-sniff-mimetype)** -> `dontSniffMimetype`
 * **[Expect-CT Middleware](https://www.npmjs.com/package/expect-ct)** -> `expectCt`
 * **[Feature Policy Middleware](https://www.npmjs.com/package/feature-policy)** -> `featurePolicy`
 * **[Frameguard Middleware](https://www.npmjs.com/package/frameguard)** -> `frameguard`
 * **[Hide X-Powered-By Middleware](https://www.npmjs.com/package/hide-powered-by)** -> `hidePoweredBy`
 * **[HTTP Strict Transport Security Middleware](https://www.npmjs.com/package/hsts)** -> `hsts`
 * **[Internet Explorer Restrict Untrusted HTML Middleware](https://www.npmjs.com/package/ienoopen)** -> `ieNoOpen`
 * **[Referrer Policy Middleware](https://www.npmjs.com/package/referrer-policy)** -> `referrerPolicy`
 * **[X-XSS-Protection Middleware](https://www.npmjs.com/package/x-xss-protection)** -> `xssProtection`

Any individual component can be disabled by setting its key to `null`. For example, if we wanted to remove the Hide X-Powered-By Middleware, we can configure Elmedeno like so:

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

We can configure components using the same inputs as the middleware they are based on. For example, the Referrer Policy Middleware accepts parameters to change the referrer policy:

```javascript
const elmedeno = new Elmedeno("oak", {
    referrerPolicy: {
        policy: 'same-origin',
    },
});
```

Finally, below is an example of setting many configurations to various components within Elmedeno to demonstrate some of the configurations for the components:

```javascript
// crossDomain config
const crossDomainConfig = {
    permittedPolicies: 'none',
};

// csp config
const cspConfig = { 
    // Specify directives as normal.
    directives: {
    defaultSrc: ["'self'", 'default.com'],
        scriptSrc: ["'self'", "'unsafe-inline'"],
        styleSrc: ['style.com'],
        fontSrc: ["'self'", 'fonts.com'],
        imgSrc: ['img.com', 'data:'],
        sandbox: ['allow-forms', 'allow-scripts'],
        reportUri: '/report-violation',
        objectSrc: ["'none'"],
        upgradeInsecureRequests: true,
        workerSrc: false  // This is not set.
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
    browserSniff: true
};

// dnsPrefetchControl config
const dnsPrefetchControlConfig = {
    allow: true,
};

// expectCt config
const expectCtConfig = {
    enforce: true,
    maxAge: 30,
    reportUri: 'https://example.com/report'
};

// featurePolicy config
const featurePolicyConfig = {
    features: {
        fullscreen: ["'self'"],
        vibrate: ["'none'"],
        payment: ['example.com'],
        syncXhr: ["'none'"]
    }
};

// frameguard config
const frameguardConfig = {
    action: 'allow-from',
    domain: 'https://example.com'
};

// hidePoweredBy config
const hidePoweredByConfig = {
    setTo: 'PHP 4.2.0',
};

// hsts config
const hstsConfig = {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true,
};

// referrerPolicy config
const referrerPolicyConfig = {
    policy: 'same-origin',
};

// xssProtection config
const xssProtectionConfig = {
    setOnOldIE: true,
    reportUri: '/report-xss-violation',
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

## Middleware Examples for Major Deno Web Frameworks

Currently Elmedeno supports the Oak, ABC, Alosaur, and Pogo frameworks. Below I have written middleware examples you can add to your web applications to quickly make use Elmedeno. Make sure to add the middleware before other routes so that the middleware will be applied to the routes below it. Feel free to copy and paste this code into your own web application!

### Oak

Elmedeno Middleware example for Oak:

```javascript
import { Application } from "https://deno.land/x/oak/mod.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Application();

// Configuring Elmedeno for the Oak framework
const elmedeno = new Elmedeno("oak");
await elmedeno.init();

// Elmedeno Middleware for Oak
app.use((ctx, next) => {
    ctx.response = elmedeno.elmedeno(ctx.request, ctx.response);

    next();
});

app.use((ctx) => {
    ctx.response.body = "Oak";
});

await app.listen({ port: 8000 });
```

### ABC

Elmedeno Middleware example for ABC:

```javascript
import { Application, MiddlewareFunc } from "https://deno.land/x/abc/mod.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const app = new Application();

// Configuring Elmedeno for ABC
const elmedeno = new Elmedeno("abc");
await elmedeno.init();

// Elmedeno Middleware for ABC
const elmedenoMiddleware: MiddlewareFunc = next => c => {
    elmedeno.elmedeno(c.request, c.response);

    return next(c);
};

// Adding the Elmedeno Middleware to your web application
app.use(elmedenoMiddleware);

app
    .get("/", c => {
        return "Abc";
    })
    .start({ port: 8080 });
```


### Alsosaur

Elmedeno Middleware example for Alosaur:

```typescript
import { Controller, Get, Area, App, ServerRequest, ServerResponse } from 'https://deno.land/x/alosaur/src/mod.ts';
import { Middleware } from 'https://deno.land/x/alosaur/src/decorator/Middleware.ts';
import { MiddlewareTarget } from 'https://deno.land/x/alosaur/src/models/middleware-target.ts';
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for Alosaur
const elmedeno = new Elmedeno("alosaur");
await elmedeno.init();

// Elmedeno Middleware for Alosaur
@Middleware(new RegExp('/'))
export class ElmedenoMiddleware implements MiddlewareTarget {
    onPreRequest(request: ServerRequest, response: ServerResponse) {
        return new Promise((resolve, reject) => {
            elmedeno.elmedeno(request, response);
            resolve();
        });
    }

    onPostRequest(request: ServerRequest, response: ServerResponse) {
        return new Promise((resolve, reject) => {
            resolve();
        });
    }
}

@Controller('/')
export class MainController {
    @Get('')
    text() {
        return 'Alosaur';
    }
}

// Declare module	
@Area({
    controllers: [MainController],
})
export class MainArea {}

// Create alosaur application
const app = new App({
    areas: [MainArea],
    // Adding the Elmedeno Middleware to the application
    middlewares: [ElmedenoMiddleware],
});

app.listen();
```

### Pogo

As Pogo does not support middleware currently, you'll have to call elmedeno within the individual routes:

```javascript
import pogo from 'https://deno.land/x/pogo/main.ts';
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

const server = pogo.server({ port : 55555 });

// Configuring Elmedeno for Pogo
const elmedeno = new Elmedeno("pogo");
await elmedeno.init();

server.router.get('/', (request, handler) => {
	// Using Elmedeno in a route
	request.response = elmedeno.elmedeno(request, request.response);
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
await elmedeno.init();

// Elmedeno Middleware for Aqua
app.register((request, response) => {
    response.headers = new Headers();
    response = elmedeno.elmedeno(request, response);

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
await elmedeno.init();

// Elmedeno Middleware for Attain
const elmedenoMiddleware = (req: Request, res: Response) => {
  res = elmedeno.elmedeno(req, res);
};

// Adding in the middleware
app.use(elmedenoMiddleware, (req, res) => {
  res.status(200).send({status: "Good"});
});

app.listen({ port: 3500 });

console.log("http://localhost:3500");
```

### Fresh

```typescript
import { MiddlewareHandlerContext } from "https://deno.land/x/fresh/server.ts";
import { Elmedeno } from "https://deno.land/x/elmedeno/mod.ts";

// Configuring Elmedeno for the Fresh framework in the _middleware.ts file
const elmedeno = new Elmedeno("fresh");
await elmedeno.init();

// Elmedeno Middleware for Fresh
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = elmedeno.elmedeno(req, await ctx.next());
  return res;
}
```

# License

MIT License

Copyright (c) 2020 Anthony Mancini

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
