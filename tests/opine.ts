import { opine, RequestHandler, OpineRequest, OpineResponse } from "https://deno.land/x/opine/mod.ts";
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { Elmedeno } from "../mod.ts";

export default (() => {
    return new Promise((resolve, reject) => {
        Deno.test({name: "Opine header x-xss-protection test" , sanitizeOps: false }, async () => {
            // Configuring Elmedeno for the Opine framework
            const elmedeno = new Elmedeno("opine");

            const app = opine();

            const elmedenoMiddleware: RequestHandler = async function (req: OpineRequest, res: OpineResponse, next: () => void) {
                await elmedeno.protect(req, res);
                next();
            }

            app.use(elmedenoMiddleware)

            app.get("/", (req, res) => {
                res.end("Hello from Elmedeno and Opine on port 8000");
            })

            await superdeno(app)
                .get("/")
                .expect("x-xss-protection", "1; mode=block")

            resolve(true)
        })
    })
})()