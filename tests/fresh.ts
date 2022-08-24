import * as fresh from "https://deno.land/x/fresh@1.0.2/server.ts"
import * as $0 from "./routes/_middleware.ts"
import * as $1 from "./routes/index.ts"
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";

Deno.test("Fresh header x-xss-protection test", async () => {

  const abortController = new AbortController();

  await fresh.start({
    routes: {
      "./routes/_middleware.ts": $0,
      "./routes/index.ts": $1,
    },
    islands: {},
    baseUrl: import.meta.url,
  }, {
    port: 8000,
    signal: abortController.signal,
    onListen: async (p) => {
      console.log("listening")
      await superdeno("http://localhost:8000")
        .get("/")
        .expect("x-xss-protection", "1; mode=block")
      abortController.abort();
    }
  })
})



