// ./app/api/chat/route.ts
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `userMessages` from the body of the request
  const { userMessages } = await req.json();

  const messages = [
    { role: 'system', content: '日本語で返信する' },
    ...userMessages.map((message: string) => ({ role: 'user', content: message })),
  ];

  console.log(userMessages);

  // Ask OpenAI for a streaming chat completion given the messages
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
