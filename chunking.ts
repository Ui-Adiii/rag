export function splitText(text: string, chunkSize = 500, overlap = 150): string[] {
  const chunks: string[] = [];
  const step = chunkSize - overlap;

  if (step <= 0) {
    throw new Error("chunkSize must be greater than overlap");
  }

  for (let i = 0; i < text.length; i += step) {
    const chunk = text.slice(i, i + chunkSize).trim();

    if (chunk) chunks.push(chunk);
    if (i + chunkSize >= text.length) break;
  }

  return chunks;
}
