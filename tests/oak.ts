import { Application } from "https://deno.land/x/oak/mod.ts";
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { Elmedeno } from "../mod.ts";

Deno.test("Oak header x-xss-protection test", async () => {
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

    await superdeno(app.handle.bind(app))
        .get("/")
        .expect("x-xss-protection", "1; mode=block")

    /* await app.listen({ port: 8000 }); */

})

