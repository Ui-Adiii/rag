import { QdrantClient } from "@qdrant/js-client-rest";
import { searchPDF, uploadPDF } from "./utils";

const PDF_PATH = "./aditya.pdf";

async function main(): Promise<void> {
  const [command, ...args] = process.argv.slice(2);

  try {
    if (command === "upload") {
      await uploadPDF(PDF_PATH);
    } else if (command === "search") {
      await searchPDF(args.join(" "));
    } else {
      console.log(
        "Usage:\n  bun run index.ts index\n" +
          '  bun run index.ts search "Tell me about Aditya Mallick"',
      );
    }
  } catch (error) {
    console.error("Error:", error instanceof Error ? error.message : error);
    process.exitCode = 1;
  }
}

await main();
