import { App, Request, Response } from "https://deno.land/x/attain/mod.ts";
import { superdeno } from "https://deno.land/x/superdeno/mod.ts";
import { Elmedeno } from "../mod.ts";


export default (() => {
  return new Promise((resolve, reject) => {

    Deno.test("Attain header x-xss-protection test", () => {
      const app = new App();

      // Configuring Elmedeno for Attain
      const elmedeno = new Elmedeno("attain");

      // Elmedeno middleware for Attain
      const elmedenoMiddleware = async (req: Request, res: Response) => {
        res = await elmedeno.protect(req, res);
      };

      // Adding the middleware
      app.use(elmedenoMiddleware, (_req, res) => {
        res.status(200).send({ status: "Good" });
      });

      app.listen(8000);

      superdeno("http://localhost:8000")
        .get("/")
        .expect("x-xss-protection", "1; mode=block")

      app.close()

      resolve(true)

    });
  })
})()