import { readdirSync } from "node:fs";
import path from "node:path";

export default async function readEntries(context: string): Promise<string[]> {
    const files = readdirSync(path.join(process.cwd(), "src/content", context))

    return files
        .filter((f) => f.endsWith(".mdx"))
        .map((f) => f.slice(0, -".mdx".length))
}
