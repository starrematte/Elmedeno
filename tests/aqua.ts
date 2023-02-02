import { assertEquals } from 'https://deno.land/std/testing/asserts.ts';
import Aqua from "https://deno.land/x/aqua/deploy.ts";
import { Elmedeno } from "../mod.ts";

export default (() => {
  return new Promise((resolve, reject) => {

    async function sendMockRequest(req: Request): Promise<Response> {
      return await new Promise((resolve) => {
        app._internal.mockRequest({
          request: req,
          respondWith: async (res) => {
            resolve(await res);
          },
        });
      });
    }

    const app = new Aqua();

    // Configuring Elmedeno for Aqua
    const elmedeno = new Elmedeno("aqua");

    // Elmedeno Middleware for Aqua
    app.register(async (request, response) => {
      response = await elmedeno.protect(request, response);
      return response;
    });

    app.get("/", (_req) => {
      return "Aqua";
    });


    Deno.test("Aqua header x-xss-protection test", async () => {

      const res = await sendMockRequest(
        new Request("http://localhost/", {
          method: "GET"
        }),
      );

      assertEquals(res.headers.get("x-xss-protection"), "1; mode=block")

      resolve(true)

    });
  })
})()


