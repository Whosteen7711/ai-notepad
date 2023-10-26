import { OpenAI } from 'openai'

// configuration to access OpenAI API
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export const generatePrompt = async (notebook: string) => {
  // build the image prompt for DALL-E model based on the notebook name
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions from a note title. Your output will be used by the DALLE API to generate a thumbnail image. The description should be minimalistic and flat styled.',
        },
        {
          role: 'user',
          content: `Please generate a thumbnail description for the notebook title ${notebook}`,
        },
      ],
    })
    const prompt = response.choices[0].message.content
    return prompt as string
  } catch (error) {
    console.error(error)
    throw new Error('Failed to generate prompt')
  }
}

export const generateImage = async (prompt: string) => {
  // generate the image from DALL-E model based on the prompt
  try {
    const response = await openai.images.generate({
      prompt: prompt,
      n: 1,
      size: '256x256',
    })
    const imageUrl = response.data[0].url
    return imageUrl as string
  } catch (error) {
    console.error(error)
  }
}
