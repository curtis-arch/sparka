# AI Gateway API Key Configuration Research

**Research Request**: Investigate how to properly configure the @ai-sdk/gateway package to use the AI_GATEWAY_API_KEY environment variable to fix "No API key provided" error during Next.js build.

**Date**: 2025-10-20
**Project**: Sparka (Next.js 15 + Vercel AI SDK)

---

## Key Findings Summary

1. **The default `gateway` instance does NOT automatically read environment variables**
2. **You must use `createGateway()` to configure the API key**
3. **Environment variable `AI_GATEWAY_API_KEY` must be passed explicitly**
4. **The gateway can be configured globally or per-instance**
5. **Build-time errors occur because the default gateway instance lacks authentication**

---

## The Problem

Current code in `lib/ai/providers.ts`:
```typescript
import { gateway } from "@ai-sdk/gateway";
const languageProvider = gateway(model.id);
```

**Issue**: The default `gateway` export does NOT read `AI_GATEWAY_API_KEY` automatically. It's a pre-instantiated instance without API key configuration.

---

## Solution 1: Use `createGateway()` with API Key (RECOMMENDED)

### Implementation

Replace the default gateway import with a custom instance:

```typescript
import { createGateway } from '@ai-sdk/gateway';

// Create a custom gateway instance with API key
const customGateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

// Use the custom instance
const languageProvider = customGateway(model.id);
```

### Why This Works

- `createGateway()` accepts a configuration object
- The `apiKey` option explicitly sets authentication
- Environment variables are properly passed to the provider
- Works in both development and production builds

---

## Solution 2: Global Provider Registry Pattern

For larger applications with multiple providers, use a centralized registry:

```typescript
import { createGateway } from '@ai-sdk/gateway';
import { createProviderRegistry } from 'ai';

// Create configured gateway
const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

// Register in global registry
export const registry = createProviderRegistry({
  gateway,
  // other providers...
});
```

---

## Solution 3: Build-Safe Conditional Logic

For Next.js builds where environment variables might not be available:

```typescript
import { createGateway } from '@ai-sdk/gateway';

// Check if API key exists before creating gateway
const gateway = process.env.AI_GATEWAY_API_KEY
  ? createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY,
    })
  : null;

// Use with fallback
const languageProvider = gateway
  ? gateway(model.id)
  : fallbackProvider(model.id);
```

---

## Complete Configuration Options

The `createGateway()` function supports:

```typescript
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  // Required: API key for authentication
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',

  // Optional: Custom base URL
  baseURL: 'https://custom-gateway.example.com',

  // Optional: Custom headers
  headers: {
    'Custom-Header': 'custom-value',
  },

  // Optional: Custom fetch implementation
  fetch: customFetchFunction,
});
```

---

## Environment Variable Setup

### .env.local (Development)
```bash
AI_GATEWAY_API_KEY=vck_66K1tTfiLSsCKV0dcHIqLB3aK41b6k16KLMkmeGEITqnDsmRTF1HFCUK
```

### Vercel Environment Variables (Production)
Add `AI_GATEWAY_API_KEY` to your Vercel project settings:
1. Go to Project Settings → Environment Variables
2. Add `AI_GATEWAY_API_KEY` with your key value
3. Set for Production, Preview, and Development environments

---

## Usage Examples

### Basic Text Generation

```typescript
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const { text } = await generateText({
  model: gateway('openai/gpt-4o'),
  prompt: 'Hello world',
});
```

### Streaming Responses

```typescript
import { createGateway } from '@ai-sdk/gateway';
import { streamText } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const result = await streamText({
  model: gateway('anthropic/claude-sonnet-4'),
  prompt: 'Write a story',
});

for await (const chunk of result.textStream) {
  console.log(chunk);
}
```

### With Provider-Specific Options

```typescript
import { createGateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const { text } = await generateText({
  model: gateway('anthropic/claude-sonnet-4'),
  prompt: 'Explain quantum computing',
  providerOptions: {
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 12000 },
    },
  },
});
```

---

## Model ID Format

When using the gateway, model IDs follow the format:

```
{provider}/{model-name}
```

Examples:
- `openai/gpt-4o`
- `openai/gpt-4o-mini`
- `anthropic/claude-sonnet-4`
- `anthropic/claude-3-5-haiku-20241022`
- `xai/grok-3-beta`

---

## Notable Surprises

1. **No Auto-Detection**: Unlike some other AI SDK providers (like OpenAI which auto-reads `OPENAI_API_KEY`), the gateway does NOT automatically detect `AI_GATEWAY_API_KEY`

2. **Default Instance is Bare**: The default `gateway` export from `@ai-sdk/gateway` is a pre-configured instance without any API key - it's meant for scenarios where authentication isn't required

3. **Build-Time Execution**: Next.js "Collecting page data" phase executes server-side code, so if your providers file is imported during build, it needs valid configuration even at build time

4. **Two Import Paths**: The gateway can be imported from either:
   - `@ai-sdk/gateway` (dedicated package)
   - `ai` (main AI SDK package - includes gateway)

---

## Recommended Fix for Your Project

Based on your codebase structure, modify `lib/ai/providers.ts`:

```typescript
// Before (causes error)
import { gateway } from "@ai-sdk/gateway";
const languageProvider = gateway(model.id);

// After (works correctly)
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});

const languageProvider = gateway(model.id);
```

---

## Additional Context

### Why This Error Occurs During Build

1. Next.js build process runs server-side code to generate static pages
2. The "Collecting page data" phase imports and executes your route handlers
3. If `lib/ai/providers.ts` is imported during this phase, it tries to initialize the gateway
4. The default gateway instance throws "No API key provided" when called without configuration

### Alternative: Lazy Initialization

If you want to avoid initialization during build:

```typescript
import { createGateway } from '@ai-sdk/gateway';

let gatewayInstance: ReturnType<typeof createGateway> | null = null;

function getGateway() {
  if (!gatewayInstance) {
    gatewayInstance = createGateway({
      apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
    });
  }
  return gatewayInstance;
}

// Use it
const languageProvider = getGateway()(model.id);
```

---

## Sources and References

- **Primary Documentation**: [Vercel AI SDK - AI Gateway Provider](https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx)
- **Package README**: [Vercel AI SDK Gateway Package](https://github.com/vercel/ai/blob/main/packages/gateway/README.md)
- **Provider Management**: [AI SDK Core - Provider Management](https://github.com/vercel/ai/blob/main/content/docs/03-ai-sdk-core/45-provider-management.mdx)
- **Context7 Library**: `/vercel/ai` (Trust Score: 10, 2249 Code Snippets)

---

## Related Patterns from Your Codebase

Given your project uses:
- **Package Manager**: Bun (`bun install`)
- **Framework**: Next.js 15 with App Router
- **AI SDK**: Vercel AI SDK with tRPC integration
- **Environment**: TypeScript strict mode

The recommended pattern aligns with your existing conventions for provider configuration and type safety.
