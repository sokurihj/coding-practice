"use client";

import { useState, useEffect } from "react";
import { translateCity } from "@/lib/cities";

interface WeatherData {
  city: string;
  temperature: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 앱이 처음 로드될 때 현재 위치의 날씨 자동 표시
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          await fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          // 위치 허용 거부 시 서울로 기본 설정
          setCity("Seoul");
        }
      );
    }
  }, []);

  // 위도/경도로 날씨 가져오기
  const fetchWeatherByCoords = async (lat: number, lon: number) => {
    setLoading(true);
    setError("");

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=ko`
      );

      if (!response.ok) {
        throw new Error("날씨 정보를 가져올 수 없습니다");
      }

      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "날씨 정보를 가져올 수 없습니다");
    } finally {
      setLoading(false);
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) {
      setError("도시명을 입력해주세요");
      return;
    }

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
      const englishCity = translateCity(city); // 한글→영문 변환
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${englishCity}&appid=${apiKey}&units=metric&lang=ko`
      );

      if (!response.ok) {
        throw new Error("도시를 찾을 수 없습니다");
      }

      const data = await response.json();
      setWeather({
        city: data.name,
        temperature: Math.round(data.main.temp),
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "날씨 정보를 가져올 수 없습니다");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-400 via-yellow-300 to-orange-500">
      <div className="bg-white/95 rounded-2xl shadow-2xl p-8 w-full max-w-md backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          날씨 앱
        </h1>

        <div className="flex gap-2 mb-6">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
            placeholder="도시명을 입력하세요 (예: 서울, 뉴욕)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={fetchWeather}
            disabled={loading}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 transition font-semibold"
          >
            {loading ? "검색 중..." : "검색"}
          </button>
        </div>

        {error && (
          <div className="text-red-500 text-center mb-4 p-3 bg-red-50 rounded-lg">
            {error}
          </div>
        )}

        {weather && (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {weather.city}
            </h2>
            <div className="text-5xl font-bold text-orange-500 mb-2">
              {weather.temperature}°C
            </div>
            <p className="text-xl text-gray-600 mb-4 capitalize">
              {weather.description}
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">습도</p>
                <p className="text-xl font-bold text-gray-800">
                  {weather.humidity}%
                </p>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-gray-600 text-sm">풍속</p>
                <p className="text-xl font-bold text-gray-800">
                  {weather.windSpeed.toFixed(1)} m/s
                </p>
              </div>
            </div>
          </div>
        )}

        {!weather && !error && !loading && (
          <div className="text-center text-gray-500">
            도시명을 입력해서 날씨를 확인하세요
          </div>
        )}
      </div>
    </div>
  );
}
