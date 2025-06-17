import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { prompt, aspectRatio } = await req.json();

    if (!prompt || !aspectRatio) {
      return NextResponse.json({ error: 'Missing prompt or aspectRatio' }, { status: 400 });
    }

    // Supported sizes for DALL·E 3
    const aspectMap: Record<string, string> = {
      "1:1": "1024x1024",
      "16:9": "1792x1024",
      "9:16": "1024x1792",
      "3:2": "1792x1024", // fallback to widescreen
      "2:3": "1024x1792", // fallback to vertical
    };

    const size = aspectMap[aspectRatio] || "1024x1024";
    const body = {
      prompt,
      n: 1,
      size,
      response_format: "url",
      model: "dall-e-3",
      quality: "standard",
    };

    const openaiRes = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    if (!openaiRes.ok) {
      const error = await openaiRes.text();
      console.error('OpenAI API error:', error);
      return NextResponse.json({ error: error || 'OpenAI API error' }, { status: 500 });
    }

    const data = await openaiRes.json();
    const url = data.data?.[0]?.url;
    if (!url) {
      console.error('No image URL returned from OpenAI:', data);
      return NextResponse.json({ error: 'No image URL returned from OpenAI' }, { status: 500 });
    }
    return NextResponse.json({ url });
  } catch (err: any) {
    console.error('Internal server error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
}