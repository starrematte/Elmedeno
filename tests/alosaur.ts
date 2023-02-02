import { App, Area, Controller, Get } from "https://deno.land/x/alosaur/mod.ts";
import { Middleware } from 'https://deno.land/x/alosaur/src/decorator/Middleware.ts';
import { MiddlewareTarget } from 'https://deno.land/x/alosaur/src/models/middleware-target.ts';
import { HttpContext } from "https://deno.land/x/alosaur/src/models/http-context.ts";
import { Elmedeno } from "../mod.ts";
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";

// Configuring Elmedeno for Alosaur
const elmedeno = new Elmedeno("alosaur");

// Elmedeno Middleware for Alosaur
@Middleware(new RegExp('/'))
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
export class MainArea { }

export default (() => {
    return new Promise((resolve, reject) => {

        Deno.test({ name: "Alosaur header x-xss-protection test" }, () => {
            // Create Alosaur application
            const app = new App({
                areas: [MainArea],
                // Adding the Elmedeno Middleware to the application
                middlewares: [ElmedenoMiddleware],
            });

            app.listen({ port: 8000 })

            superdeno("http://localhost:8000")
                .get("/")
                .expect("x-xss-protection", "1; mode=block")

            app.close()

            resolve(true)
        })
    })
})()