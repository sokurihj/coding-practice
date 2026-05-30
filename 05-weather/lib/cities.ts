// 한글 도시명 → 영문 도시명 변환
const cityMap: Record<string, string> = {
  // 한국
  서울: "Seoul",
  부산: "Busan",
  대구: "Daegu",
  인천: "Incheon",
  광주: "Gwangju",
  대전: "Daejeon",
  울산: "Ulsan",
  경주: "Gyeongju",
  제주: "Jeju",

  // 주요 해외 도시
  뉴욕: "New York",
  로스앤젤레스: "Los Angeles",
  런던: "London",
  파리: "Paris",
  도쿄: "Tokyo",
  서울: "Seoul",
  홍콩: "Hong Kong",
  싱가포르: "Singapore",
  방콕: "Bangkok",
  두바이: "Dubai",
  시드니: "Sydney",
  베를린: "Berlin",
  로마: "Rome",
  스페인: "Madrid",
  암스테르담: "Amsterdam",
  도시: "Istanbul",
  모스크바: "Moscow",
  상하이: "Shanghai",
  베이징: "Beijing",
  델리: "Delhi",
  뭄바이: "Mumbai",
};

export function translateCity(koreanCity: string): string {
  const trimmed = koreanCity.trim();
  return cityMap[trimmed] || trimmed; // 매핑이 없으면 원래 입력값 반환
}
