import { embed, embedMany } from "ai";
import { passageEmbeddingModel, queryEmbeddingModel } from "./ai.config";

export async function generateEmbeddings(chunks: string[]): Promise<number[][]> {
  if (chunks.length === 0) return [];

  const BATCH_SIZE = 8;
  const embeddings: number[][] = [];

  for (let i = 0; i < chunks.length; i += BATCH_SIZE) {
    const batch = chunks.slice(i, i + BATCH_SIZE);
    console.log(
      `Embedding chunks ${i + 1}–${Math.min(i + BATCH_SIZE, chunks.length)} of ${chunks.length}...`,
    );

    try {
      const { embeddings: batchEmbeddings } = await embedMany({
        model: passageEmbeddingModel,
        values: batch,
        providerOptions: {
          openaiCompatible: {
            body: {
              input_type: "passage",
            },
          },
        },
      });
      embeddings.push(...batchEmbeddings);
    } catch (err: any) {
      console.error(
        `Failed on batch starting at index ${i}:`,
        err.responseBody ?? err.message,
      );
      throw err;
    }
  }

  return embeddings;
}
export async function generateQueryEmbedding(query: string) {
  try {
    const { embedding } = await embed({
      model: queryEmbeddingModel,
      value: query.trim(),
      providerOptions: {
        nvidiaQuery: {
          input_type: "query",
        },
      },
    });
    return embedding;
  } catch (error) {
    console.error(error);
  }
}
