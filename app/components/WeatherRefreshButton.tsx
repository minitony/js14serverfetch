'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function WeatherRefreshButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleRefresh = async () => {
    setIsLoading(true);
    router.refresh(); // Trigger server component re-fetch
    setIsLoading(false);
  };
  
  return (
    <button 
      onClick={handleRefresh} 
      disabled={isLoading} 
      style={{ 
        padding: '0.5rem 1rem', 
        border: 'none', 
        borderRadius: '4px', 
        backgroundColor: isLoading ? '#6c757d' : '#007bff', 
        color: 'white', 
        cursor: isLoading ? 'not-allowed' : 'pointer' 
      }}
    >
      {isLoading ? '更新中...' : '天気を更新'}
    </button>
  );
}