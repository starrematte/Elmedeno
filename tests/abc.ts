import { Application, MiddlewareFunc } from "https://deno.land/x/abc/mod.ts";
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { Elmedeno } from "../mod.ts";

export default (() => {
    return new Promise((resolve, reject) => {
        Deno.test("Abc header x-xss-protection test", async () => {
            const app = new Application();

            // Configuring Elmedeno for ABC
            const elmedeno = new Elmedeno("abc");

            // Elmedeno middleware for ABC
            const ElmedenoMiddleware: MiddlewareFunc = next => async c => {
                await elmedeno.protect(c.request, c.response);
                return next(c);
            };

            // Adding the Elmedeno middleware to your web application
            app.use(ElmedenoMiddleware);

            app.get("/", _c => {
                return "Abc";
            })

            app.start({ port: 8000 });

            await superdeno("http://localhost:8000")
                .get("/")
                .expect("x-xss-protection", "1; mode=block")

            await app.close();

            resolve(true)
        })
    })
})()