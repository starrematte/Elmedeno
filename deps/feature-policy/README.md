Feature Policy
==============
[![Build Status](https://travis-ci.org/helmetjs/feature-policy.svg?branch=master)](https://travis-ci.org/helmetjs/feature-policy)

This is Express middleware to set the `Feature-Policy` header. You can read more about it [here](https://scotthelme.co.uk/a-new-security-header-feature-policy/) and [here](https://developers.google.com/web/updates/2018/06/feature-policy).

To use:

```javascript
const featurePolicy = require('feature-policy')

// ...

app.use(featurePolicy({
  features: {
    fullscreen: ["'self'"],
    vibrate: ["'none'"],
    payment: ['example.com'],
    syncXhr: ["'none'"]
  }
}))
```

The following features are currently supported:

* `accelerometer`
* `ambientLightSensor`
* `autoplay`
* `battery`
* `camera`
* `displayCapture`
* `documentDomain`
* `documentWrite`
* `encryptedMedia`
* `executionWhileNotRendered`
* `executionWhileOutOfViewport`
* `fontDisplayLateSwap`
* `fullscreen`
* `geolocation`
* `gyroscope`
* `layoutAnimations`
* `legacyImageFormats`
* `loadingFrameDefaultEager`
* `magnetometer`
* `microphone`
* `midi`
* `navigationOverride`
* `notifications`
* `oversizedImages`
* `payment`
* `pictureInPicture`
* `publickeyCredentials`
* `push`
* `serial`
* `speaker`
* `syncScript`
* `syncXhr`
* `unoptimizedImages`
* `unoptimizedLosslessImages`
* `unoptimizedLossyImages`
* `unsizedMedia`
* `usb`
* `verticalScroll`
* `vibrate`
* `vr`
* `wakeLock`
* `xr`
* `xrSpatialTracking`
