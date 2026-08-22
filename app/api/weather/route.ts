export async function GET() {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const city = 'Tokyo';
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=ja`;
  
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Failed to fetch weather data');
    const data = await response.json();
    
    return Response.json({
      temperature: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
      city: data.name,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: 'Server error', details: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}