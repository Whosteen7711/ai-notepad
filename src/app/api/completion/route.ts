// endpoint: /api/completion

import { OpenAI } from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

// configuration to access OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const POST = async (req: Request) => {
  // extract prompt from the request body
  const { prompt } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are a helpful AI embedded in a notion text editor app that is used to autocomplete sentences.
        The traits of AI include expert knowledge, creativity, and helpfulness. AI is well-behaved, friendly, 
        and eager to provide vivid and thoughtful responses to the user`,
      },
      {
        role: 'user',
        content: `I am writing some notes in a notion text editor app. Please autocomplete the following sentence: ##${prompt}##.
        Keep the tone of the response consistent with the rest of the note and make sure it is concise and to the point.`,
      },
    ],
    stream: true,
  })
  const stream = OpenAIStream(response)
  return new StreamingTextResponse(stream)
}
