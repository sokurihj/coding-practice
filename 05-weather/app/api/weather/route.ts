import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const lat = searchParams.get("lat");
  const lon = searchParams.get("lon");
  const city = searchParams.get("city");

  // 유효성 검사
  if (!lat && !lon && !city) {
    return NextResponse.json(
      { error: "lat/lon 또는 city 파라미터 필요" },
      { status: 400 }
    );
  }

  const apiKey = process.env.NEXT_PUBLIC_WEATHER_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API 키 설정 오류" },
      { status: 500 }
    );
  }

  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=metric&lang=ko`;

    if (lat && lon) {
      url += `&lat=${lat}&lon=${lon}`;
    } else if (city) {
      url += `&q=${encodeURIComponent(city)}`;
    }

    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: "날씨 정보를 찾을 수 없습니다" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // 클라이언트에 필요한 데이터만 반환
    return NextResponse.json({
      city: data.name,
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      humidity: data.main.humidity,
      windSpeed: data.wind.speed,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "서버 오류 발생" },
      { status: 500 }
    );
  }
}
