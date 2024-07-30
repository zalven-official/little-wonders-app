import { OpenAI } from 'openai'
import { decodeString, encodeString } from '@/lib/index'


interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export class OpenAIClient {
  private static instance: OpenAIClient

  private client: OpenAI
  private token: string

  // Available models: "gpt-4-1106-preview", "gpt-3.5-turbo-1106", or "davinci-codex"
  private readonly CHAT_MODEL_NAME: string = 'gpt-3.5-turbo-0125'
  private readonly VISUAL_MODEL_NAME: string = 'gpt-4o'
  private readonly IMAGE_GENERATION_MODEL_NAME: string = 'dall-e-2'

  private constructor(token: string) {
    this.token = encodeString(token)
    this.client = new OpenAI({ apiKey: decodeString(this.token), dangerouslyAllowBrowser: true })
  }

  public static getInstance(token: string): OpenAIClient {
    if (!OpenAIClient.instance) {
      OpenAIClient.instance = new OpenAIClient(token)
    }
    return OpenAIClient.instance
  }

  public async apiCall(
    messages: Message[],
    chatModelName: string = this.CHAT_MODEL_NAME,
    temperature: number = 0.2,
    maxTokens: number = 2000
  ): Promise<string | undefined> {
    try {
      const response = await this.client.chat.completions.create({
        model: chatModelName,
        messages: messages,

        temperature: temperature,
        max_tokens: maxTokens
      })
      if (response.choices && 'message' in response.choices[0]) {
        const decision_message = response.choices[0].message
        return decision_message?.content ? decision_message.content.trim() : undefined
      }
      return undefined
    } catch (err) {
      throw new Error(`n error occurred: ${err}`)
    }
  }

  public async analyzeImage(
    base64Image: string,
    additionalCcontext: string = "What's in this image?",
    visualModelName: string = this.VISUAL_MODEL_NAME,
  ) {
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${decodeString(this.token)}`
    }
    const payload = {
      "model": `${visualModelName}`,
      "messages": [
        {
          "role": "assistant",
          "content": [
            {
              "type": "text",
              "text": `${additionalCcontext}`
            },
            {
              "type": "image_url",
              "image_url": {
                "url": `${base64Image}`
              }
            }
          ]
        }
      ],
      "max_tokens": 300
    }
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
      return undefined;
    }
  }

  public async generateImage(
    prompt: string = "a cartoonish about bed time story for kids in night theme",
    imageGenerationModelName = this.IMAGE_GENERATION_MODEL_NAME,
  ) {
    const response = await this.client.images.generate({ model: `${imageGenerationModelName}`, prompt: prompt, n: 1, size: "1024x1024" });
    return response.data;
  }

}