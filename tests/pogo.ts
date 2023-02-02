import pogo from 'https://deno.land/x/pogo/main.ts';
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { Elmedeno } from "../mod.ts";
export default (() => {
    return new Promise((resolve, reject) => {
        Deno.test({ name: "Pogo header x-xss-protection test", sanitizeOps: false }, async () => {

            const server = pogo.server({ port: 8000 });

            // Configuring Elmedeno for Pogo
            const elmedeno = new Elmedeno("pogo");

            server.router.get('/', async (request, _handler) => {
                request.response = await elmedeno.protect(request, request.response);
                request.response.body = "Pogo";
                return request.response;
            });

            server.start()

            await superdeno("http://localhost:8000")
                .get("/")
                .expect("x-xss-protection", "1; mode=block")

            server.raw.close()

            resolve(true)
        })
    })
})()
