# Vercel AI SDK Gateway Configuration Pattern

## Key Learning

The default `gateway` export from `@ai-sdk/gateway` does NOT automatically read environment variables. You must use `createGateway()` to configure API keys.

## Common Mistake

```typescript
// WRONG - No API key configuration
import { gateway } from "@ai-sdk/gateway";
const provider = gateway(modelId);
```

## Correct Pattern

```typescript
// CORRECT - Explicit API key configuration
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const provider = gateway(modelId);
```

## Environment Variable

- Variable name: `AI_GATEWAY_API_KEY`
- Must be passed explicitly to `createGateway()`
- Not auto-detected like OpenAI or Anthropic providers

## Model ID Format

Format: `{provider}/{model-name}`
- Examples: `openai/gpt-4o`, `anthropic/claude-sonnet-4`, `xai/grok-3-beta`

## Build-Time Errors

Next.js build executes server code during "Collecting page data" phase. If providers are imported at build time, they need valid configuration even during build.

## Research Date

2025-10-20
