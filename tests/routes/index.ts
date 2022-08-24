import { HandlerContext } from "https://deno.land/x/fresh/server.ts";

// Api request handler
export const handler = (_req: Request, _ctx: HandlerContext): Response => {
  return new Response("Hello Fresh from Elmedeno");
};
