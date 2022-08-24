import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export default function dontSniffMimetype (requestResponse: RequestResponseInterface) {
  requestResponse.setResponseHeader('X-Content-Type-Options', 'nosniff');
};
