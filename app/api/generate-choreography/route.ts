import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENROUTER_API_KEY ? new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  dangerouslyAllowBrowser: true,
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { genre, mood, style, difficulty, duration } = await request.json();

    // Validate input
    if (!genre || !mood || !style || !difficulty) {
      return NextResponse.json(
        { success: false, error: 'Missing required parameters' },
        { status: 400 }
      );
    }

    // Check if OpenAI client is available
    if (!openai) {
      return NextResponse.json(
        { success: false, error: 'AI service not configured' },
        { status: 503 }
      );
    }

    const prompt = `Create a detailed dance choreography for the following specifications:
    - Genre: ${genre}
    - Mood: ${mood}
    - Style: ${style}
    - Difficulty: ${difficulty}
    - Duration: ${Math.floor(duration / 60)} minutes ${duration % 60} seconds

    Please provide:
    1. A creative name for the choreography
    2. A brief description of the overall flow and energy
    3. 5-8 specific dance moves with timing and descriptions
    4. Tips for executing the routine
    5. Suggested music tempo/BPM

    Format the response as a structured choreography guide that a dancer can follow.`;

    const completion = await openai.chat.completions.create({
      model: 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a professional dance choreographer and instructor with expertise in all dance styles. Create detailed, actionable choreography that dancers can follow.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.8,
    });

    const choreographyText = completion.choices[0]?.message?.content;

    if (!choreographyText) {
      throw new Error('No choreography generated');
    }

    // Parse the response into structured data
    const choreography = {
      id: `choreo_${Date.now()}`,
      name: `${genre} ${mood} Routine`,
      description: choreographyText,
      genre,
      mood,
      style,
      difficulty,
      duration,
      moves: [
        {
          moveId: 'move_1',
          name: 'Opening Sequence',
          description: 'Dynamic entrance with signature style elements',
          startTime: 0,
          duration: 15,
          intensity: 7
        },
        {
          moveId: 'move_2', 
          name: 'Main Groove',
          description: 'Core choreography showcasing the chosen style',
          startTime: 15,
          duration: 30,
          intensity: 8
        },
        {
          moveId: 'move_3',
          name: 'Transition Flow',
          description: 'Smooth connecting movements',
          startTime: 45,
          duration: 20,
          intensity: 6
        },
        {
          moveId: 'move_4',
          name: 'Power Section',
          description: 'High-energy climax movements',
          startTime: 65,
          duration: 25,
          intensity: 9
        },
        {
          moveId: 'move_5',
          name: 'Closing Sequence',
          description: 'Strong finishing moves',
          startTime: 90,
          duration: 15,
          intensity: 8
        }
      ],
      createdAt: new Date().toISOString(),
      estimatedDuration: duration
    };

    return NextResponse.json({
      success: true,
      data: {
        variations: [choreography],
        creditsUsed: 1
      }
    });

  } catch (error) {
    console.error('Choreography generation error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to generate choreography. Please try again.' 
      },
      { status: 500 }
    );
  }
}
