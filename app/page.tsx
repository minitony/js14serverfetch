import WeatherRefreshButton from './components/WeatherRefreshButton';

async function getWeather() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/weather`, {
    cache: 'no-store' // Always fresh data, no caching
  });
  if (!res.ok) throw new Error('Failed to fetch weather');
  return res.json();
}

export default async function Page() {
  try {
    const weather = await getWeather();
    
    return (
      <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
        <h1>東京の天気</h1>
        <div style={{ margin: '1.5rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            気温: {weather.temperature}°C
          </div>
          <div style={{ margin: '0.5rem 0' }}>
            天候: {weather.description}
          </div>
          <div>
            湿度: {weather.humidity}%
          </div>
          <small style={{ display: 'block', marginTop: '0.5rem' }}>
            更新時刻: {new Date(weather.timestamp).toLocaleTimeString()}
          </small>
        </div>
        <WeatherRefreshButton />
      </div>
    );
  } catch (error) {
    return (
      <div style={{ padding: '1rem', fontFamily: 'sans-serif', maxWidth: '400px', margin: '0 auto' }}>
        <h1>東京の天気</h1>
        <div style={{ color: 'red', margin: '1.5rem 0', padding: '1rem', border: '1px solid #eee', borderRadius: '8px' }}>
          天気データの取得に失敗しました。後で再試行してください。
        </div>
        <WeatherRefreshButton />
      </div>
    );
  }
}
