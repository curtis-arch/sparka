---
query_date: 2025-10-20 12:24:24 UTC
library: /vercel/ai
topic: gateway provider usage examples createGateway
tokens: 3000
project: sparka
tool: mcp__context7__get-library-docs
---

# Context7 Query: gateway provider usage examples createGateway

### Generate Text with AI SDK Gateway Provider Example

Source: https://github.com/vercel/ai/blob/main/packages/gateway/README.md

An example showcasing how to use the `gateway` provider with the AI SDK's `generateText` function. It demonstrates specifying an AI model (e.g., 'xai/grok-3-beta') via the gateway and providing a prompt to receive a text response.

```ts
import { gateway } from '@ai-sdk/gateway';
import { generateText } from 'ai';

const { text } = await generateText({
  model: gateway('xai/grok-3-beta'),
  prompt:
    'Tell me about the history of the San Francisco Mission-style burrito.',
});
```

--------------------------------

### Create a custom AI Gateway provider instance with an API key

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Explains how to create a custom AI Gateway provider instance using `createGateway` and configure it with an API key, typically sourced from environment variables. This allows for customized settings such as `apiKey`, `baseURL`, or `headers` for specific application needs.

```ts
import { createGateway } from 'ai';

const gateway = createGateway({
  apiKey: process.env.AI_GATEWAY_API_KEY ?? '',
});
```

--------------------------------

### Generate text using AI Gateway with an explicit provider instance in AI SDK

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Shows how to generate text by explicitly passing the `gateway` provider instance along with a model string to the `generateText` function. This provides an alternative way to utilize the AI Gateway for text generation.

```ts
import { generateText, gateway } from 'ai';

const { text } = await generateText({
  model: gateway('openai/gpt-5'),
  prompt: 'Hello world',
});
```

--------------------------------

### Stream Text Responses using Cloudflare AI Gateway and OpenAI

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

This example demonstrates how to set up the Cloudflare AI Gateway provider, initialize an OpenAI model, and use `streamText` to get a streaming response. It shows how to accumulate the streamed text chunks and log the final output. Requires `ai-gateway-provider` and `@ai-sdk/openai`.

```typescript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';

const aigateway = createAiGateway({
  accountId: 'your-cloudflare-account-id',
  gateway: 'your-gateway-name',
  apiKey: 'your-cloudflare-api-key',
});

const openai = createOpenAI({ apiKey: 'openai-api-key' });

const result = await streamText({
  model: aigateway([openai('gpt-4o-mini')]),
  prompt: 'Write a multi-part greeting.',
});

let accumulatedText = '';
for await (const chunk of result.textStream) {
  accumulatedText += chunk;
}

console.log(accumulatedText); // Output: "Hello world!"
```

--------------------------------

### Import AI SDK Gateway Provider Instance

Source: https://github.com/vercel/ai/blob/main/packages/gateway/README.md

Demonstrates how to import the default `gateway` provider instance from the `@ai-sdk/gateway` module in a TypeScript application, making it available for use with AI SDK functions.

```ts
import { gateway } from '@ai-sdk/gateway';
```

--------------------------------

### Import the default AI Gateway provider instance

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Illustrates how to import the default `gateway` provider instance from the `ai` package. This is suitable for scenarios where custom configurations like API keys or base URLs are not required.

```ts
import { gateway } from 'ai';
```

--------------------------------

### Pass AI Gateway API key directly to a provider instance

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Shows how to explicitly provide the API key when creating a custom AI Gateway provider instance. This method ensures the specified key is used, overriding any environment variable settings for that particular instance.

```ts
import { createGateway } from 'ai';

const gateway = createGateway({
  apiKey: 'your_api_key_here',
});
```

--------------------------------

### Generate Non-Streaming Text with Cloudflare AI Gateway

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

Illustrates how to use the `generateText` function from the AI SDK with the Cloudflare AI Gateway Provider. This example shows how to send a prompt to a model configured via the gateway and retrieve the generated text.

```typescript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText } from 'ai';

const aigateway = createAiGateway({
  accountId: 'your-cloudflare-account-id',
  gateway: 'your-gateway-name',
  apiKey: 'your-cloudflare-api-key',
});

const openai = createOpenAI({ apiKey: 'openai-api-key' });

const { text } = await generateText({
  model: aigateway([openai('gpt-4o-mini')]),
  prompt: 'Write a greeting.',
});

console.log(text); // Output: "Hello"
```

--------------------------------

### Configure Language Models with Fallback using AI Gateway

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

Demonstrates how to create a model instance by providing an array of models to the `aigateway` provider. This setup enables automatic fallback to subsequent models if the primary model fails, ensuring resilience and high availability.

```typescript
import { createAiGateway } from 'ai-gateway-provider';
import { createOpenAI } from '@ai-sdk/openai';
import { createAnthropic } from '@ai-sdk/anthropic';

const aigateway = createAiGateway({
  accountId: 'your-cloudflare-account-id',
  gateway: 'your-gateway-name',
  apiKey: 'your-cloudflare-api-key',
});

const openai = createOpenAI({ apiKey: 'openai-api-key' });
const anthropic = createAnthropic({ apiKey: 'anthropic-api-key' });

const model = aigateway([
  anthropic('claude-3-5-haiku-20241022'), // Primary model
  openai('gpt-4o-mini'), // Fallback model
]);
```

--------------------------------

### Export AI SDK Provider Components in TypeScript

Source: https://github.com/vercel/ai/blob/main/content/providers/02-openai-compatible-providers/01-custom-providers.mdx

This `index.ts` file acts as the public API entry point for the custom AI provider. It re-exports the `createExample` function, the default `example` instance, and the `ExampleProvider` and `ExampleProviderSettings` types from `./example-provider`. This consolidated export strategy simplifies module imports and usage for consumers of the library.

```ts
export { createExample, example } from './example-provider';
export type {
  ExampleProvider,
  ExampleProviderSettings,
} from './example-provider';
```

--------------------------------

### Configure Global AI SDK Provider for Model Access in TypeScript

Source: https://github.com/vercel/ai/blob/main/content/docs/03-ai-sdk-core/45-provider-management.mdx

Explains how to use the AI SDK's global provider feature to access models using a plain model ID string, defaulting to the Vercel AI Gateway. The example demonstrates streaming text with a globally configured model.

```TypeScript
import { streamText } from 'ai';

const result = await streamText({
  model: 'openai/gpt-4o', // Uses the global provider (defaults to AI Gateway)
  prompt: 'Invent a new holiday and describe its traditions.',
});
```

--------------------------------

### Export Default TypeScript AI SDK Example Provider Instance

Source: https://github.com/vercel/ai/blob/main/content/providers/02-openai-compatible-providers/01-custom-providers.mdx

This line exports a default, pre-configured instance of the AI provider named `example`. By calling `createExample()`, it makes the provider readily available for use in other parts of the application without requiring explicit instantiation, streamlining the integration process.

```ts
export const example = createExample();
```

--------------------------------

### Create Cloudflare AI Gateway Instance with API Key

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

Demonstrates how to initialize an `aigateway` provider instance using an API key for authentication. This method is suitable when your gateway requires an API key and allows for optional request-level settings like skipping cache.

```typescript
import { createAiGateway } from 'ai-gateway-provider';

const aigateway = createAiGateway({
  accountId: 'your-cloudflare-account-id',
  gateway: 'your-gateway-name',
  apiKey: 'your-cloudflare-api-key', // Only required if your gateway has authentication enabled
  options: {
    skipCache: true, // Optional request-level settings
  },
});
```

--------------------------------

### Generate text using AI Gateway with a plain model string in AI SDK

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Demonstrates how to generate text using the AI Gateway by providing a model string in the `creator/model-name` format directly to the `generateText` function. This approach automatically leverages the AI Gateway when deployed within the AI SDK context.

```ts
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'openai/gpt-5',
  prompt: 'Hello world',
});
```

--------------------------------

### Install Cloudflare AI Gateway Provider

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

Instructions for installing the `ai-gateway-provider` module using various popular package managers, enabling its use in your project.

```pnpm
pnpm add ai-gateway-provider
```

```npm
npm install ai-gateway-provider
```

```yarn
yarn add ai-gateway-provider
```

```bun
bun add ai-gateway-provider
```

--------------------------------

### Configure Provider-Specific Options for AI Gateway Models

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Shows how to pass provider-specific options to a language model when calling `generateText`. This allows customization of model behavior, such as 'thinking' parameters for Anthropic models, using either a model string or a `gateway` provider instance.

```ts
// with model string
import { generateText } from 'ai';

const { text } = await generateText({
  model: 'anthropic/claude-sonnet-4',
  prompt: 'Explain quantum computing',
  providerOptions: {
    anthropic: {
      thinking: { type: 'enabled', budgetTokens: 12000 },
    },
  },
});
```

```ts
// with provider instance
import { gateway, generateText } from 'ai';

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

--------------------------------

### Set Up AI SDK Provider Registry

Source: https://github.com/vercel/ai/blob/main/content/docs/03-ai-sdk-core/45-provider-management.mdx

This example demonstrates how to create a centralized provider registry using `createProviderRegistry` to manage multiple AI providers like Anthropic and OpenAI. It shows how to register providers with default and custom setups, enabling access through simple string IDs.

```ts
import { anthropic } from '@ai-sdk/anthropic';
import { createOpenAI } from '@ai-sdk/openai';
import { createProviderRegistry } from 'ai';

export const registry = createProviderRegistry({
  // register provider with prefix and default setup:
  anthropic,

  // register provider with prefix and custom setup:
  openai: createOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  }),
});
```

--------------------------------

### Customize Cloudflare AI Gateway Request Options

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/12-cloudflare-ai-gateway.mdx

Example demonstrating how to configure various request-level options for the Cloudflare AI Gateway. This includes settings for caching (TTL, skip), custom metadata, and advanced retry strategies (max attempts, delay, backoff).

```typescript
const aigateway = createAiGateway({
  accountId: 'your-cloudflare-account-id',
  gateway: 'your-gateway-name',
  apiKey: 'your-cloudflare-api-key',
  options: {
    cacheTtl: 3600, // Cache for 1 hour
    metadata: { userId: 'user123' },
    retries: {
      maxAttempts: 3,
      retryDelayMs: 1000,
      backoff: 'exponential',
    },
  },
});
```
