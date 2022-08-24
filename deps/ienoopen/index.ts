import { RequestResponseInterface } from "../../lib/frameworks/interface.ts";

export default function ienoopen (requestResponse: RequestResponseInterface) {
  requestResponse.setResponseHeader('X-Download-Options', 'noopen');
}
