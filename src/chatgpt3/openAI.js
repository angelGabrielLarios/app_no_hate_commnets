import OpenAI from "openai"

export const openAI = new OpenAI({
    apiKey: import.meta.env.VITE_API_KEY_OPENIA,
    dangerouslyAllowBrowser: true
});