import { streamText } from 'ai';
import { openai } from '@ai-sdk/openai';

export const maxDuration = 30;

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!Array.isArray(messages)) {
      return new Response('Invalid messages format', { status: 400 });
    }

    const result = streamText({
      model: openai('gpt-4o-mini'),
      messages,
      system: 'Tu es un assistant IA serviable pour un blog et forum tech francophone. Tu aides les utilisateurs avec leurs questions sur le développement web, les technologies et les sujets du blog. Réponds en français de manière claire et concise.',
      temperature: 0.7,
      maxOutputTokens: 1024,
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error('Chat API error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('rate limit')) {
        return new Response('Limite de requêtes atteinte. Réessayez plus tard.', { status: 429 });
      }
      if (error.message.includes('API key')) {
        return new Response('Erreur de configuration API', { status: 500 });
      }
      return new Response(`Erreur: ${error.message}`, { status: 500 });
    }
    
    return new Response('Erreur inconnue', { status: 500 });
  }
}
