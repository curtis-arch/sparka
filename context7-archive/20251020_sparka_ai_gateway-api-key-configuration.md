---
query_date: 2025-10-20 12:24:17 UTC
library: /vercel/ai
topic: gateway API key configuration
tokens: 3000
project: sparka
tool: mcp__context7__get-library-docs
---

# Context7 Query: gateway API key configuration

### Set AI Gateway API key using an environment variable

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Demonstrates how to set the AI Gateway API key via an environment variable named `AI_GATEWAY_API_KEY`. This method allows for easy configuration of authentication credentials that are automatically picked up by the provider.

```bash
AI_GATEWAY_API_KEY=your_api_key_here
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

### Import the default AI Gateway provider instance

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/00-ai-gateway.mdx

Illustrates how to import the default `gateway` provider instance from the `ai` package. This is suitable for scenarios where custom configurations like API keys or base URLs are not required.

```ts
import { gateway } from 'ai';
```

--------------------------------

### Configure OpenAI API Key

Source: https://github.com/vercel/ai/blob/main/content/cookbook/00-guides/02-multi-modal-chatbot.mdx

Adds the `OPENAI_API_KEY` to the `.env.local` file. This key is crucial for authenticating your application with the OpenAI service. Remember to replace `xxxxxxxxx` with your actual OpenAI API key.

```Environment Variables
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Set Requesty API Key as Environment Variable

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/5-requesty.mdx

Securely configure your Requesty API key by setting it as an environment variable named `REQUESTY_API_KEY` across different operating systems.

```Shell
export REQUESTY_API_KEY=your_api_key_here
```

```Shell
set REQUESTY_API_KEY=your_api_key_here
```

```Shell
$env:REQUESTY_API_KEY="your_api_key_here"
```

--------------------------------

### Set Helicone API Key Environment Variable

Source: https://github.com/vercel/ai/blob/main/content/providers/05-observability/helicone.mdx

Configure your Helicone API key as an environment variable to authenticate requests. This key is essential for Helicone to track and monitor your AI SDK application's usage. Place it in your `.env` file for secure access.

```bash
HELICONE_API_KEY=your-helicone-api-key
```

--------------------------------

### Configure OpenAI API Key for AI SDK

Source: https://github.com/vercel/ai/blob/main/examples/node-http-server/README.md

Set your OpenAI API key in the .env file to authenticate with the OpenAI service. This key is essential for the AI SDK to function correctly.

```shell
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Authenticate Gemini CLI Provider with API Key

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/100-gemini-cli.mdx

Details how to authenticate the Gemini CLI provider using an API key. This method requires generating an API key from Google AI Studio, setting it as an environment variable, and then configuring the provider with `authType: 'api-key'` and the `apiKey`.

```Bash
export GEMINI_API_KEY="YOUR_API_KEY"
```

```TypeScript
const gemini = createGeminiProvider({
  authType: 'api-key',
  apiKey: process.env.GEMINI_API_KEY,
});
```

--------------------------------

### Configure OpenAI API Key in .env.local

Source: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/03-nextjs-pages-router.mdx

Adds your OpenAI API key to the `.env.local` file. Replace `xxxxxxxxx` with your actual key obtained from OpenAI. The AI SDK's OpenAI Provider will automatically use this `OPENAI_API_KEY` environment variable for authentication.

```env
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Authenticate Amazon Bedrock with API Key via Direct Configuration

Source: https://github.com/vercel/ai/blob/main/packages/amazon-bedrock/README.md

Pass the API key directly to the `bedrock.withSettings()` method for explicit configuration. You can also specify an optional AWS region for your requests.

```typescript
import { bedrock } from '@ai-sdk/amazon-bedrock';
import { generateText } from 'ai';

const bedrockWithApiKey = bedrock.withSettings({
  apiKey: process.env.AWS_BEARER_TOKEN_BEDROCK, // or your API key directly
  region: 'us-east-1', // Optional: specify region
});

const { text } = await generateText({
  model: bedrockWithApiKey('anthropic.claude-3-haiku-20240307-v1:0'),
  prompt: 'Write a vegetarian lasagna recipe for 4 people.',
});
```

--------------------------------

### Configure OpenAI API Key for AI SDK

Source: https://github.com/vercel/ai/blob/main/examples/express/README.md

This step outlines how to set up the necessary environment variable for the OpenAI API key. This key is crucial for authenticating requests to the OpenAI API when using the AI SDK.

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Configure OpenAI API Key for AI SDK

Source: https://github.com/vercel/ai/blob/main/examples/mcp/README.md

This snippet shows how to set up the `OPENAI_API_KEY` environment variable in a `.env` file. This key is essential for the AI SDK to authenticate with the OpenAI API and is a prerequisite for running the examples.

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Configure Letta API Key in .env.local

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/71-letta.mdx

Explains how to set up your Letta API Key by creating a `.env.local` file and adding the `LETTA_API_KEY` environment variable for secure access to Letta Cloud.

```Text
LETTA_API_KEY=<your_api_key>
```

--------------------------------

### Configure Zhipu AI API Key Environment Variable

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/95-zhipu.mdx

Demonstrates how to set your Zhipu AI API key as an environment variable. The Zhipu AI provider automatically reads this variable (`ZHIPU_API_KEY`) if no API key is explicitly provided during instance creation.

```bash
ZHIPU_API_KEY=<your-api-key>
```

--------------------------------

### Configure OpenAI API Key in .env.local

Source: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/04-svelte.mdx

Adds the `OPENAI_API_KEY` to the `.env.local` file, essential for authenticating your application with the OpenAI service. Remember to replace `xxxxxxxxx` with your actual API key.

```dotenv
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Configure OpenAI API Key in .env.local

Source: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/02-nextjs-app-router.mdx

Steps to create a local environment file and add your OpenAI API key, which is used by the AI SDK's OpenAI Provider for authentication.

```Shell
touch .env.local
```

```Env
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Configure Environment Variable for AI API Key

Source: https://github.com/vercel/ai/blob/main/content/cookbook/01-next/23-chat-with-pdf.mdx

This `.env.local` file demonstrates how to set up the necessary environment variable (`ANTHROPIC_API_KEY`) for authenticating with the AI provider. This key is crucial for the backend API route to access the large language model services.

```env
ANTHROPIC_API_KEY=xxxxxxxxx
```

--------------------------------

### Set Laminar project API key in environment variables

Source: https://github.com/vercel/ai/blob/main/content/providers/05-observability/laminar.mdx

Guide to configure your Laminar project API key as an environment variable. This key is essential for authenticating your application with the Laminar service.

```Bash
LMNR_PROJECT_API_KEY=...
```

--------------------------------

### Configure LangWatch API Key

Source: https://github.com/vercel/ai/blob/main/content/providers/05-observability/langwatch.mdx

Set up your LangWatch API key either as an environment variable for secure deployment or directly within the client initialization for development purposes.

```bash
LANGWATCH_API_KEY='your_api_key_here'
```

```typescript
import { LangWatch } from 'langwatch';

const langwatch = new LangWatch({
  apiKey: 'your_api_key_here',
});
```

--------------------------------

### Configure Azure AI API Credentials in .env

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/14-azure-ai.mdx

Set up your Azure AI resource endpoint and API key as environment variables in your `.env` file. These variables are essential for authenticating and connecting your application to your Azure-hosted language models.

```bash
AZURE_API_ENDPOINT=https://<your-resource>.services.ai.azure.com/models
AZURE_API_KEY=<your-api-key>
```

--------------------------------

### Configure OpenAI API Key for AI SDK with Hono

Source: https://github.com/vercel/ai/blob/main/examples/hono/README.md

This snippet shows how to set the `OPENAI_API_KEY` environment variable in a `.env` file, which is required for the AI SDK to authenticate with OpenAI services.

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Configure OpenAI API Key in .env file

Source: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/06-nodejs.mdx

This snippet demonstrates how to add your OpenAI API key to a `.env` file in your project's root directory. The AI SDK's OpenAI Provider automatically uses the `OPENAI_API_KEY` environment variable for authentication.

```dotenv
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Configure OpenAI API key in .env.local

Source: https://github.com/vercel/ai/blob/main/content/docs/02-getting-started/07-expo.mdx

Adds the `OPENAI_API_KEY` to the `.env.local` file, which is used by the AI SDK's OpenAI Provider for authentication.

```env
OPENAI_API_KEY=xxxxxxxxx
```

--------------------------------

### Configure Requesty AI SDK with Custom Settings

Source: https://github.com/vercel/ai/blob/main/content/providers/03-community-providers/5-requesty.mdx

This snippet demonstrates how to initialize the Requesty AI SDK with custom configuration options. It includes setting an API key, a custom base URL, adding custom HTTP headers, and defining default extra body parameters that will be sent with every request.

```javascript
import { createRequesty } from '@requesty/ai-sdk';

const requesty = createRequesty({
  apiKey: process.env.REQUESTY_API_KEY,
  baseURL: 'https://router.requesty.ai/v1',
  headers: {
    'Custom-Header': 'custom-value',
  },
  extraBody: {
    custom_field: 'value',
  },
});
```

--------------------------------

### Configure OpenAI API Key for AI SDK in Nest.js

Source: https://github.com/vercel/ai/blob/main/examples/nest/README.md

This snippet shows how to set the `OPENAI_API_KEY` environment variable. This key is crucial for the AI SDK to authenticate and interact with the OpenAI API. It should be placed in a `.env` file at the root of your project.

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Configure OpenAI API Key for AI SDK

Source: https://github.com/vercel/ai/blob/main/examples/fastify/README.md

Sets up the `OPENAI_API_KEY` environment variable required for the AI SDK to authenticate with the OpenAI API. This key should be obtained from your OpenAI account and placed in a `.env` file.

```sh
OPENAI_API_KEY="YOUR_OPENAI_API_KEY"
```

--------------------------------

### Create Custom DeepSeek Provider Instance with API Key

Source: https://github.com/vercel/ai/blob/main/content/providers/01-ai-sdk-providers/30-deepseek.mdx

Shows how to create a custom DeepSeek provider instance using `createDeepSeek`. This allows for explicit configuration, such as setting the API key from an environment variable, and other optional settings like `baseURL`, `headers`, or a custom `fetch` implementation.

```TypeScript
import { createDeepSeek } from '@ai-sdk/deepseek';

const deepseek = createDeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? '',
});
```

--------------------------------

### Configure Langfuse Credentials for Tracing

Source: https://github.com/vercel/ai/blob/main/content/providers/05-observability/langfuse.mdx

Shows two methods to configure Langfuse API keys and base URL: using environment variables for deployment or directly instantiating the `LangfuseExporter` in code.

```bash
LANGFUSE_SECRET_KEY="sk-lf-..."
LANGFUSE_PUBLIC_KEY="pk-lf-..."
LANGFUSE_BASEURL="https://cloud.langfuse.com" # 🇪🇺 EU region, use "https://us.cloud.langfuse.com" for US region
```

```ts
import { LangfuseExporter } from 'langfuse-vercel';

new LangfuseExporter({
  secretKey: 'sk-lf-...',
  publicKey: 'pk-lf-...',
  baseUrl: 'https://cloud.langfuse.com', // 🇪🇺 EU region
  // baseUrl: "https://us.cloud.langfuse.com", // 🇺🇸 US region
});
```
