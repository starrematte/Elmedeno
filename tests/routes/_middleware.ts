import { MiddlewareHandlerContext } from "https://deno.land/x/fresh/server.ts";
import { Elmedeno } from "../../mod.ts";

// Configuring Elmedeno for the Fresh framework
const elmedeno = new Elmedeno("fresh");

// Elmedeno Middleware for Fresh
export async function handler(req: Request, ctx: MiddlewareHandlerContext) {
  const res: Response = await elmedeno.protect(req, await ctx.next());
  return res;
}
