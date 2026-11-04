# rag-chat-bot

A Retrieval-Augmented Generation (RAG) chatbot that indexes PDF documents into a Qdrant vector database and answers questions based on the document content using NVIDIA NIM embeddings and LLMs.

## Features

- **PDF ingestion**: Extract text from PDFs, split into overlapping chunks, and generate embeddings.
- **Vector storage**: Store document chunks in Qdrant with cosine similarity search.
- **RAG querying**: Retrieve relevant chunks and generate answers using an LLM, grounded strictly in document context.
- **CLI interface**: Upload and search PDFs via command-line commands.

## Project Structure

```
rag-chat-bot/
├── index.ts          # CLI entry point (upload / search commands)
├── utils.ts          # PDF parsing, chunking, embedding, Qdrant upsert/query, and answer generation
├── chunking.ts       # Text chunking with overlap
├── embedding.ts      # Passage and query embedding generation (batched)
├── ai.config.ts      # NVIDIA NIM model configuration (embeddings + LLM)
├── tsconfig.json     # TypeScript configuration
├── package.json      # Dependencies and scripts
├── bun.lock          # Bun lockfile
├── .gitignore        # Git ignore rules
├── aditya.pdf        # Example PDF document
├── javascript.pdf    # Example PDF document
└── rag.jpeg          # Project banner image
```

## Prerequisites

- [Bun](https://bun.com) v1.4.2 or later
- A Qdrant instance (cloud or self-hosted)
- An NVIDIA API key with access to NIM embedding and chat models

## Installation

```bash
bun install
```

## Environment Variables

Create a `.env` file in the project root:

```env
QDRANT_URL=https://your-qdrant-instance.cloud
QDRANT_API_KEY=your-qdrant-api-key
NVIDIA_API_KEY=your-nvidia-api-key
```

## Usage

### Upload and index a PDF

```bash
bun run index.ts upload
```

This reads `./aditya.pdf` by default. To index a different PDF, modify the `PDF_PATH` constant in `index.ts`.

### Search the indexed documents

```bash
bun run index.ts search "Tell me about Aditya Mallick"
```

## Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| `dev` | `bun run index.ts` | Run the CLI (requires `upload` or `search` argument) |
| `build` | `bun build index.ts --outdir dist --target bun` | Build for Bun runtime |
| `start` | `bun run dist/index.js` | Run the built output |

## Dependencies

- [`ai`](https://sdk.vercel.ai/docs) — AI SDK for text generation and embeddings
- [`@ai-sdk/openai-compatible`](https://sdk.vercel.ai/docs/providers/ai-sdk-openai-compatible) — OpenAI-compatible provider for NVIDIA NIM
- [`@qdrant/js-client-rest`](https://qdrant.tech/documentation/) — Qdrant vector database client
- [`pdf-parse`](https://github.com/pdf-parse/pdf-parse) — PDF text extraction

## License

This project is private and intended for personal use.