import { killPort } from "https://x.nest.land/kill-port@1.0.1/mod.ts";

const tests = Array.from(Deno.readDirSync("./tests/"))
    .filter(f => f.isFile && !f.name.match(/tests\.ts/) && (f.name.endsWith(".ts") || f.name.endsWith(".js")))
    .map(e => e.name)

for (const test of tests) {
    const promise = await import("./" + test)
    while (!promise.default) {
        if (promise.default == true) {
            killPort(8000)
        }
    }
}