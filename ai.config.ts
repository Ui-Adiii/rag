import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

const NVIDIA_API_KEY = process.env.NVIDIA_API_KEY;


if (!NVIDIA_API_KEY) {
  throw new Error("NVIDIA_API_KEY is missing from .env");
}

function nvidiaFetch(inputType: "passage" | "query"): typeof fetch {
  return async (input, init) => {
    const originalRequest = new Request(input, init);

    if (!new URL(originalRequest.url).pathname.endsWith("/embeddings")) {
      return fetch(originalRequest);
    }

    const json = await originalRequest.json();

    const headers = new Headers(originalRequest.headers);
    headers.set("Content-Type", "application/json");
    headers.delete("content-length"); // Crucial: let fetch calculate the correct length

    return fetch(originalRequest.url, {
      method: "POST",
      headers,
      body: JSON.stringify({
        ...json,
        input_type: inputType,
      }),
    });
  };
}
const passageProvider = createOpenAICompatible({
  name: "nvidia-passage",
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: NVIDIA_API_KEY,
  fetch: nvidiaFetch("passage"),
});

const queryProvider = createOpenAICompatible({
  name: "nvidia-query",
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: NVIDIA_API_KEY,
  fetch: nvidiaFetch("query"),
});

export const passageEmbeddingModel = passageProvider.embeddingModel(
  "nvidia/nemotron-3.5-embed-1b",
);

export const queryEmbeddingModel = queryProvider.embeddingModel(
  "nvidia/nemotron-3.5-embed-1b",
);

const llmProvider = createOpenAICompatible({
  name: "nvidia",
  baseURL: "https://integrate.api.nvidia.com/v1",
  apiKey: NVIDIA_API_KEY,
});

export const llm = llmProvider.chatModel("nvidia/nemotron-3.5-super-vl-120b-a12b");
