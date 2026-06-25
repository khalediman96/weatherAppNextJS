import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const city = request.nextUrl.searchParams.get('q')?.trim();

  if (!city) {
    return NextResponse.json({ message: 'City is required' }, { status: 400 });
  }

  const apiKey = process.env.OPENWEATHER_API_KEY;
  const apiUrl = process.env.OPENWEATHER_API_URL;

  if (!apiKey || !apiUrl) {
    return NextResponse.json({ message: 'Weather API is not configured' }, { status: 500 });
  }

  const response = await fetch(`${apiUrl}?q=${encodeURIComponent(city)}&appid=${apiKey}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: 'Failed to fetch weather' }));
    return NextResponse.json(
      { message: error.message ?? 'Failed to fetch weather' },
      { status: response.status }
    );
  }

  const data = await response.json();
  return NextResponse.json(data);
}
