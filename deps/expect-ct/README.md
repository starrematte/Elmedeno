Expect-CT
=========
[![Build Status](https://travis-ci.org/helmetjs/expect-ct.svg?branch=master)](https://travis-ci.org/helmetjs/expect-ct)

The `Expect-CT` HTTP header tells browsers to expect Certificate Transparency. For more, see [this blog post](https://scotthelme.co.uk/a-new-security-header-expect-ct/) and the [article on MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Expect-CT).

Usage:

```javascript
const expectCt = require('expect-ct')

// Sets Expect-CT: max-age=123
app.use(expectCt({ maxAge: 123 }))

// Sets Expect-CT: enforce, max-age=123
app.use(expectCt({
  enforce: true,
  maxAge: 123
}))

// Sets Expect-CT: enforce, max-age=30, report-uri="https://example.com/report"
app.use(expectCt({
  enforce: true,
  maxAge: 30,
  reportUri: 'https://example.com/report'
}))
```
