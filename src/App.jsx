import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
//  쿠팡 URL
//  현재: 보르넬리 브랜드스토어 공식 링크
//  개별 상품 URL이 생기면 CU_CANDLE1 등을 해당 URL로 교체하세요.
// ─────────────────────────────────────────────────────────────────────────────
const BORNELLI_URL = "https://shop.coupang.com/A00283859/224703?platform=p&source=brandstore_sdp_atf&pid=9470340921&viid=95141798358&brandId=0";

const CU_SHOP     = BORNELLI_URL;
const CU_CANDLE1  = BORNELLI_URL;
const CU_CANDLE2  = BORNELLI_URL;
const CU_CANDLE3  = BORNELLI_URL;
const CU_DEHUMID1 = BORNELLI_URL;
const CU_DEHUMID2 = BORNELLI_URL;
const CU_DEODOR1  = BORNELLI_URL;
const CU_DEODOR2  = BORNELLI_URL;
const CU_DEODOR3  = BORNELLI_URL;

// ─────────────────────────────────────────────────────────────────────────────
//  Hero 대표 이미지
// ─────────────────────────────────────────────────────────────────────────────
const HERO_IMG = "/images/bornelli-hero.png"; // 비워두면 placeholder

// ─────────────────────────────────────────────────────────────────────────────
//  NEW ARRIVAL 제품
// ─────────────────────────────────────────────────────────────────────────────
const NEW_ARRIVALS = [
  {
    id: "na1",
    name: "블랙체리 소이 캔들",
    category: "향초",
    hook: "집에 들어서는 순간, 분위기가 달라지는 향",
    space: "거실 · 현관",
    imageUrl: "/images/blackcherry-result.png",
    placeholderBg: "#F5EDD8",
    emoji: "🕯️",
    badge: "NEW",
    badgeColor: "#C8973A",
    url: CU_CANDLE1,
  },
  {
    id: "na2",
    name: "라벤더 향기 제습제",
    category: "습기제거제",
    hook: "옷장 문을 열 때마다 기분 좋아지는 향",
    space: "옷장 · 드레스룸",
    imageUrl: "/images/lavender-result.png",
    placeholderBg: "#EAE4F5",
    emoji: "💜",
    badge: "NEW",
    badgeColor: "#5C4A7A",
    url: CU_DEHUMID1,
  },
  {
    id: "na3",
    name: "블루 코튼 씨 탈취제",
    category: "탈취제",
    hook: "요리 후 잔향을 깔끔하게 리셋하는 코튼 향",
    space: "주방 · 화장실",
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#D8EAF5",
    emoji: "🩵",
    badge: "NEW",
    badgeColor: "#2A5C7A",
    url: CU_DEODOR1,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  BEST PICK 제품 (장면 중심 문구)
// ─────────────────────────────────────────────────────────────────────────────
const BEST_PICKS = [
  {
    id: "bp1",
    name: "보르넬리 향기 제습제 멀티팩",
    category: "습기제거제",
    scene: "장마철 옷장 냄새가 고민이라면",
    desc: "걸어두는 것만으로 습기와 꿉꿉한 냄새를 동시에 해결합니다.",
    space: "옷장 · 신발장 · 드레스룸",
    imageUrl: "/images/bornelli-dehumidifier.png",
    placeholderBg: "#EAF0E4",
    emoji: "💧",
    badge: "BEST",
    badgeColor: "#8B9D77",
    url: CU_DEHUMID2,
  },
  {
    id: "bp2",
    name: "블랙체리 생활 탈취제",
    category: "탈취제",
    scene: "집에 들어왔을 때 첫 향이 아쉬웠다면",
    desc: "현관과 거실에 두면 문을 여는 순간부터 분위기가 달라집니다.",
    space: "현관 · 거실 · 주방",
    imageUrl: "/images/bornelli-deodorizer.png",
    placeholderBg: "#F7E0E4",
    emoji: "🍒",
    badge: "BEST",
    badgeColor: "#8B1A2E",
    url: CU_DEODOR2,
  },
  {
    id: "bp3",
    name: "벨벳 바닐라 소이 캔들",
    category: "향초",
    scene: "침실 분위기를 부드럽게 바꾸고 싶다면",
    desc: "하루 끝, 불을 켜는 순간 방 전체가 포근한 바닐라 향으로 채워집니다.",
    space: "침실 · 서재",
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#F5EAD8",
    emoji: "✨",
    badge: "BEST",
    badgeColor: "#6B4226",
    url: CU_CANDLE2,
  },
];

// ─────────────────────────────────────────────────────────────────────────────
//  ALL PRODUCTS 전체 카탈로그
// ─────────────────────────────────────────────────────────────────────────────
const ALL_PRODUCTS = [
  {
    id: "all1", name: "블랙체리 소이 캔들", category: "향초",
    tagline: "100% 소이왁스 · 우드심지", space: "거실 · 현관",
    imageUrl: "/images/blackcherry-result.png",
    placeholderBg: "#F5EDD8", emoji: "🕯️", accent: "#C8973A", url: CU_CANDLE1,
    spaces: ["거실", "현관"],
  },
  {
    id: "all2", name: "벨벳 바닐라 소이 캔들", category: "향초",
    tagline: "포근하고 달콤한 바닐라", space: "침실 · 서재",
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#F5EAD8", emoji: "🕯️", accent: "#C8973A", url: CU_CANDLE2,
    spaces: ["침실", "서재"],
  },
  {
    id: "all3", name: "가드니아 소이 캔들", category: "향초",
    tagline: "우아한 치자꽃 향", space: "거실 · 다이닝",
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#F5E8E4", emoji: "🕯️", accent: "#C8973A", url: CU_CANDLE3,
    spaces: ["거실", "다이닝"],
  },
  {
    id: "all4", name: "라벤더 향기 제습제", category: "습기제거제",
    tagline: "탈취 + 제습 동시 해결", space: "옷장 · 드레스룸",
    imageUrl: "/images/lavender-result.png",
    placeholderBg: "#EAE4F5", emoji: "💧", accent: "#8B9D77", url: CU_DEHUMID1,
    spaces: ["옷장", "드레스룸"],
  },
  {
    id: "all5", name: "향기 제습제 멀티팩", category: "습기제거제",
    tagline: "장마철 꿉꿉함 완벽 차단", space: "옷장 · 신발장",
    imageUrl: "/images/bornelli-dehumidifier.png",
    placeholderBg: "#EAF0E4", emoji: "💧", accent: "#8B9D77", url: CU_DEHUMID2,
    spaces: ["옷장", "신발장"],
  },
  {
    id: "all6", name: "블루 코튼 씨 탈취제", category: "탈취제",
    tagline: "상쾌한 코튼 향 즉각 탈취", space: "주방 · 화장실",
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#D8EAF5", emoji: "🌿", accent: "#A07D5A", url: CU_DEODOR1,
    spaces: ["주방", "화장실"],
  },
  {
    id: "all7", name: "블랙체리 생활 탈취제", category: "탈취제",
    tagline: "달콤한 향의 생활 탈취", space: "현관 · 거실",
    imageUrl: "/images/bornelli-deodorizer.png",
    placeholderBg: "#F7E0E4", emoji: "🌿", accent: "#A07D5A", url: CU_DEODOR2,
    spaces: ["현관", "거실"],
  },
  {
    id: "all8", name: "가드니아 생활 탈취제", category: "탈취제",
    tagline: "고급스러운 치자꽃 탈취", space: "화장실 · 현관",
    imageUrl: "/images/bornelli-deodorizer.png",
    placeholderBg: "#F5E8E4", emoji: "🌿", accent: "#A07D5A", url: CU_DEODOR3,
    spaces: ["화장실", "현관"],
  },
];

const SPACE_GROUPS = [
  { label: "침실·서재",  spaces: ["침실", "서재"],            desc: "깊은 휴식을 위한 포근한 향" },
  { label: "옷장·드레스룸", spaces: ["옷장", "드레스룸", "신발장"], desc: "습기와 냄새를 동시에 관리" },
  { label: "주방·화장실", spaces: ["주방", "화장실"],          desc: "생활 잔향을 깔끔하게 정리" },
  { label: "거실·현관",  spaces: ["거실", "현관", "다이닝"],   desc: "집의 첫 인상을 향기로 채우기" },
];

// ─────────────────────────────────────────────────────────────────────────────
//  퀴즈 & 향 데이터
// ─────────────────────────────────────────────────────────────────────────────
const QUIZ_QS = [
  {
    id: "location", q: "어디에 사용하고 싶나요?", icon: "📍",
    opts: [
      { l: "옷장",   v: "closet",   s: { lavender: 2, gardenia: 1 } },
      { l: "침실",   v: "bedroom",  s: { velvet_vanilla: 2, lavender: 1 } },
      { l: "주방",   v: "kitchen",  s: { blue_cotton: 2, blackcherry: 1 } },
      { l: "화장실", v: "bathroom", s: { blue_cotton: 2, lavender: 1 } },
      { l: "현관",   v: "entrance", s: { blackcherry: 2, blue_cotton: 1 } },
    ],
  },
  {
    id: "mood", q: "원하는 분위기는?", icon: "🌙",
    opts: [
      { l: "포근한",     v: "cozy",   s: { velvet_vanilla: 3 } },
      { l: "상쾌한",     v: "fresh",  s: { blue_cotton: 3 } },
      { l: "달콤한",     v: "sweet",  s: { blackcherry: 3 } },
      { l: "고급스러운", v: "luxe",   s: { gardenia: 3 } },
      { l: "깨끗한",     v: "clean",  s: { lavender: 3 } },
    ],
  },
  {
    id: "intensity", q: "향의 강도는?", icon: "💨",
    opts: [
      { l: "은은한", v: "subtle",   iDesc: "은은하게 감도는" },
      { l: "적당한", v: "moderate", iDesc: "적당히 존재감 있는" },
      { l: "확실한", v: "strong",   iDesc: "확실히 느껴지는" },
    ],
  },
];

const SCENTS = {
  blackcherry: {
    name: "블랙체리", emoji: "🍒", color: "#8B1A2E", bgColor: "#FCF0F2",
    reason: "현관과 거실에 강하고 인상적인 첫인상이 필요할 때. 집에 들어서는 순간을 특별하게 만드는 달콤하고 풍성한 향입니다.",
    spaces: ["현관", "거실", "주방"], rec: ["탈취제", "향초"],
    imageUrl: "/images/blackcherry-result.png",
    placeholderBg: "#F7E0E4", url: CU_SHOP,
  },
  lavender: {
    name: "라벤더", emoji: "💜", color: "#5C4A7A", bgColor: "#F5F0FC",
    reason: "깊은 휴식이 필요한 침실이나 옷장에 가장 잘 어울립니다. 긴장을 풀어주는 은은한 향으로 자연스러운 아로마테라피 효과를 냅니다.",
    spaces: ["침실", "옷장", "드레스룸"], rec: ["습기제거제", "향초"],
    imageUrl: "/images/lavender-result.png",
    placeholderBg: "#EAE4F5", url: CU_SHOP,
  },
  gardenia: {
    name: "가드니아", emoji: "🌸", color: "#7A4A3D", bgColor: "#FEF5F0",
    reason: "손님을 맞이하거나 공간에 격을 더하고 싶을 때. 치자꽃의 우아한 향이 거실과 현관을 품격 있게 만들어줍니다.",
    spaces: ["거실", "현관", "다이닝"], rec: ["향초", "탈취제"],
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#F5E8E4", url: CU_SHOP,
  },
  velvet_vanilla: {
    name: "벨벳 바닐라", emoji: "✨", color: "#6B4226", bgColor: "#FDF5EC",
    reason: "따뜻하고 포근한 분위기가 필요한 침실에 완벽합니다. 바닐라의 달콤한 향이 공간을 호텔 스위트룸처럼 감싸줍니다.",
    spaces: ["침실", "서재", "드레스룸"], rec: ["향초", "습기제거제"],
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#F5EAD8", url: CU_SHOP,
  },
  blue_cotton: {
    name: "블루 코튼 씨", emoji: "🩵", color: "#2A5C7A", bgColor: "#EDF5FC",
    reason: "생활 냄새가 자주 나는 주방·화장실·현관에 가장 적합합니다. 맑고 깨끗한 코튼 향이 공간을 리셋해주는 느낌을 줍니다.",
    spaces: ["주방", "화장실", "현관"], rec: ["탈취제", "습기제거제"],
    imageUrl: "/images/bornelli-candle.jpg",
    placeholderBg: "#D8EAF5", url: CU_SHOP,
  },
};

const CONTENT_CARDS = [
  { emoji: "🏠", category: "생활 꿀팁",  title: "집에 들어오자마자 나는 냄새 관리법",   desc: "현관부터 시작하는 홈프래그런스 루틴으로 첫 인상을 바꿔보세요." },
  { emoji: "🌧️", category: "장마철 대비", title: "장마철 옷장 냄새 해결 루틴",        desc: "습기와 냄새를 동시에 잡는 향기 제습제 활용법을 알아보세요." },
  { emoji: "🕯️", category: "공간 연출",  title: "향초 하나로 호텔 침실 분위기 만들기", desc: "올바른 향초 사용법과 위치 선정으로 프리미엄 공간을 연출하세요." },
  { emoji: "🍳", category: "주방 관리",  title: "주방 냄새, 환기만으로 부족할 때",    desc: "요리 후 잔향을 효과적으로 제거하는 탈취제 사용 가이드." },
];

// ─────────────────────────────────────────────────────────────────────────────
//  향 추천 로직
// ─────────────────────────────────────────────────────────────────────────────
function getScentKey(answers) {
  const sc = { blackcherry: 0, lavender: 0, gardenia: 0, velvet_vanilla: 0, blue_cotton: 0 };
  ["location", "mood"].forEach((qid) => {
    const q = QUIZ_QS.find((x) => x.id === qid);
    const sel = q?.opts.find((o) => o.v === answers[qid]);
    if (!sel?.s) return;
    Object.entries(sel.s).forEach(([k, v]) => { sc[k] += v; });
  });
  return Object.entries(sc).sort((a, b) => b[1] - a[1])[0][0];
}

// ─────────────────────────────────────────────────────────────────────────────
//  글로벌 스타일
// ─────────────────────────────────────────────────────────────────────────────
const G = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Noto+Sans+KR:wght@300;400;500&display=swap');

  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

  :root{
    --cream:#F7F2EA; --cream-dk:#EDE5D8; --cream-dkr:#E5D9C8;
    --amber:#C8973A; --amber-lt:#E8C77A; --amber-dim:rgba(200,151,58,.18);
    --brown:#3D2314; --brown-md:#6B4226; --brown-lt:#A07D5A;
    --sage:#8B9D77; --gray:#9B9088; --dark:#1E0C04;
    --r:4px;
  }

  html{scroll-behavior:smooth}

  body{
    background:var(--cream);color:var(--brown);
    font-family:'Noto Sans KR',sans-serif;font-weight:300;
    line-height:1.7;-webkit-font-smoothing:antialiased;
    overflow-x:hidden;padding-bottom:68px;
  }

  /* fade-in */
  .fi{opacity:0;transform:translateY(28px);transition:opacity .78s ease,transform .78s ease}
  .fi.vis{opacity:1;transform:translateY(0)}

  /* layout */
  section{padding:68px 24px}
  .inner{max-width:480px;margin:0 auto}

  /* typography helpers */
  .cat-badge{
    display:inline-block;font-size:10px;font-weight:500;
    letter-spacing:.18em;text-transform:uppercase;padding:3px 9px;
    border-radius:2px;
  }
  .section-eyebrow{
    font-size:11px;font-weight:500;letter-spacing:.28em;
    text-transform:uppercase;color:var(--amber);
    display:block;margin-bottom:10px;
  }
  .section-title{
    font-family:'Cormorant Garamond',serif;
    font-size:34px;font-weight:400;line-height:1.24;
    color:var(--brown);margin-bottom:14px;
  }
  .section-sub{
    font-size:13px;color:var(--brown-lt);line-height:1.85;
    margin-bottom:32px;
  }
  .divider{width:40px;height:1px;background:var(--amber-lt);margin:18px 0}

  /* ── 버튼 ── */
  .btn-amber{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    background:var(--amber);color:#fff;border:none;border-radius:2px;
    padding:13px 24px;font-size:13px;font-family:'Noto Sans KR',sans-serif;
    font-weight:500;letter-spacing:.04em;cursor:pointer;text-decoration:none;
    transition:background .2s,transform .15s;white-space:nowrap;
  }
  .btn-amber:hover{background:#A47830;transform:translateY(-1px)}
  .btn-amber:active{transform:translateY(0)}

  .btn-ghost{
    display:inline-flex;align-items:center;justify-content:center;gap:8px;
    background:transparent;color:rgba(247,242,234,.75);
    border:1px solid rgba(247,242,234,.28);border-radius:2px;
    padding:12px 24px;font-size:13px;font-family:'Noto Sans KR',sans-serif;
    font-weight:300;letter-spacing:.04em;cursor:pointer;text-decoration:none;
    transition:border-color .2s,color .2s,background .2s;white-space:nowrap;
  }
  .btn-ghost:hover{border-color:rgba(200,151,58,.6);color:var(--amber-lt);background:rgba(200,151,58,.08)}

  /* ── 카탈로그 카드 ── */
  .pcard{
    background:#FAF5ED;border-radius:8px;overflow:hidden;
    border:1px solid rgba(160,125,90,.14);
    transition:transform .22s,box-shadow .22s;cursor:pointer;
  }
  .pcard:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(61,35,20,.1)}

  /* ── 퀴즈 옵션 ── */
  .quiz-opt{
    width:100%;padding:13px 18px;
    background:rgba(247,242,234,.06);border:1px solid rgba(247,242,234,.14);
    border-radius:4px;color:#F7F2EA;font-size:15px;
    font-family:'Noto Sans KR',sans-serif;font-weight:300;
    cursor:pointer;text-align:left;
    transition:background .18s,border-color .18s;
  }
  .quiz-opt:hover{background:rgba(200,151,58,.18);border-color:rgba(200,151,58,.55)}

  /* ── All Products 탭 ── */
  .tab-bar{
    display:flex;gap:6px;overflow-x:auto;padding-bottom:2px;
    scrollbar-width:none;margin-bottom:28px;
  }
  .tab-bar::-webkit-scrollbar{display:none}
  .tab{
    flex-shrink:0;padding:8px 16px;border-radius:20px;
    border:1px solid rgba(160,125,90,.24);font-size:12px;
    font-family:'Noto Sans KR',sans-serif;font-weight:400;
    cursor:pointer;background:transparent;color:var(--brown-lt);
    transition:background .18s,color .18s,border-color .18s;white-space:nowrap;
  }
  .tab.active{background:var(--brown);color:#F7F2EA;border-color:var(--brown)}
  .tab:hover:not(.active){background:var(--cream-dk);border-color:rgba(160,125,90,.4)}

  /* ── 콘텐츠 카드 ── */
  .content-card{
    background:#FAF5ED;border-radius:6px;padding:20px;
    border:1px solid rgba(160,125,90,.12);
    cursor:pointer;transition:transform .22s;
  }
  .content-card:hover{transform:translateY(-3px)}

  /* ── 하단 고정 CTA ── */
  .sticky-cta{
    position:fixed;bottom:0;left:0;right:0;z-index:999;
    background:rgba(30,12,4,.97);
    backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
    padding:12px 20px 14px;
    display:flex;align-items:center;justify-content:center;
    border-top:1px solid rgba(200,151,58,.2);
    transition:transform .38s cubic-bezier(.4,0,.2,1);
  }
  .sticky-cta.hidden{transform:translateY(100%)}

  @media(max-width:480px){
    section{padding:52px 20px}
    .section-title{font-size:27px}
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
//  훅
// ─────────────────────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) e.target.classList.add("vis"); },
      { threshold: 0.07 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ─────────────────────────────────────────────────────────────────────────────
//  공통: 이미지 / Placeholder
// ─────────────────────────────────────────────────────────────────────────────
function PImg({ imageUrl, alt, emoji, placeholderBg, height = "200px", priority = false, onClick }) {
  const style = { width: "100%", height, display: "block", objectFit: "cover", objectPosition: "center" };
  if (imageUrl) {
    return (
      <div style={{ width: "100%", height, overflow: "hidden", background: placeholderBg, cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
        <img src={imageUrl} alt={alt} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "auto"} style={style} />
      </div>
    );
  }
  return (
    <div style={{ width: "100%", height, background: placeholderBg || "#EDE5D8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "10px", cursor: onClick ? "pointer" : "default" }} onClick={onClick}>
      <span style={{ fontSize: "40px", opacity: 0.55 }}>{emoji}</span>
      <span style={{ fontSize: "10px", letterSpacing: "0.2em", color: "var(--brown-light)", textTransform: "uppercase", opacity: 0.65 }}>{alt}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  1. Hero
// ─────────────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollToQuiz = () => document.getElementById("scent-finder")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section style={{ background: "linear-gradient(165deg,#1A0902 0%,#3D2314 52%,#6B3820 100%)", color: "#F7F2EA", padding: "0", minHeight: "100svh", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", overflow: "hidden" }}>
      {/* 장식 링 */}
      {[320, 230, 148].map((sz, i) => (
        <div key={i} style={{ position: "absolute", top: `${-80 + i * 40}px`, right: `${-80 + i * 40}px`, width: `${sz}px`, height: `${sz}px`, borderRadius: "50%", border: `1px solid rgba(200,151,58,${0.15 - i * 0.04})`, pointerEvents: "none" }} />
      ))}
      <div style={{ position: "absolute", bottom: "100px", left: "-70px", width: "220px", height: "220px", borderRadius: "50%", border: "1px solid rgba(200,151,58,0.07)", pointerEvents: "none" }} />

      <div className="inner" style={{ padding: "80px 28px 110px", width: "100%" }}>
        {/* 로고 */}
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", letterSpacing: "0.44em", color: "rgba(200,151,58,0.8)", textTransform: "uppercase", marginBottom: "40px" }}>BORNELLI</p>

        {/* 대표 이미지 */}
        <div style={{ width: "100%", height: "230px", borderRadius: "6px", overflow: "hidden", marginBottom: "36px", border: "1px solid rgba(200,151,58,0.18)" }}>
          {HERO_IMG ? (
            <img src={HERO_IMG} alt="보르넬리 제품 대표 이미지" loading="eager" fetchPriority="high" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center", display: "block" }} />
          ) : (
            <div style={{ width: "100%", height: "100%", background: "rgba(247,242,234,0.05)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
              <div style={{ display: "flex", gap: "24px" }}>
                {[{ e: "🕯️", l: "향초" }, { e: "💧", l: "제습제" }, { e: "🌿", l: "탈취제" }].map(({ e, l }) => (
                  <div key={l} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "7px" }}>
                    <span style={{ fontSize: "36px", opacity: 0.65 }}>{e}</span>
                    <span style={{ fontSize: "10px", color: "rgba(200,151,58,0.6)", letterSpacing: "0.1em" }}>{l}</span>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: "10px", color: "rgba(247,242,234,0.2)", letterSpacing: "0.14em", textTransform: "uppercase" }}>HERO_IMG에 이미지를 추가하세요</p>
            </div>
          )}
        </div>

        {/* 헤드라인 */}
        <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "36px", fontWeight: "400", lineHeight: "1.24", color: "#F7F2EA", letterSpacing: "-0.01em", marginBottom: "20px" }}>
          집안 냄새와 꿉꿉함,<br />
          <em style={{ fontStyle: "italic", color: "#E8C77A" }}>향기</em>로 바꾸는<br />
          보르넬리 홈케어
        </h1>
        <div style={{ width: "36px", height: "1px", background: "rgba(200,151,58,0.44)", marginBottom: "22px" }} />
        <p style={{ fontSize: "14px", fontWeight: "300", lineHeight: "1.88", color: "rgba(247,242,234,0.66)", marginBottom: "44px" }}>
          향초, 습기제거제, 탈취제로 공간별 냄새와 습기 고민을 관리하고,<br />감각적인 향으로 집의 분위기를 바꿔보세요.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          <button className="btn-amber" onClick={scrollToQuiz} style={{ fontSize: "15px", padding: "16px", width: "100%" }}>✨ 내 공간에 맞는 향 찾기</button>
          <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" className="btn-ghost" style={{ fontSize: "15px", padding: "15px" }}>쿠팡에서 가격 확인하기 →</a>
        </div>
      </div>
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "52px", background: "var(--cream)", clipPath: "ellipse(58% 100% at 50% 100%)" }} />
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  2. Problem
// ─────────────────────────────────────────────────────────────────────────────
function ProblemSection() {
  const ref = useFadeIn();
  const items = [
    { e: "😮‍💨", t: "집에 들어왔는데 은근한 생활 냄새가 신경 쓰일 때" },
    { e: "👕",    t: "옷장 문을 열었는데 옷에서 꿉꿉한 냄새가 날 때" },
    { e: "🍳",    t: "청소를 해도 주방 냄새가 쉽게 사라지지 않을 때" },
    { e: "🏠",    t: "손님이 오기 전, 집안 분위기를 빠르게 바꾸고 싶을 때" },
  ];
  return (
    <section ref={ref} className="fi" style={{ background: "#F0E8DC" }}>
      <div className="inner">
        <span className="section-eyebrow">공감 포인트</span>
        <h2 className="section-title">이런 순간,<br />한 번쯤 있지 않으셨나요?</h2>
        <div className="divider" />
        <div style={{ display: "flex", flexDirection: "column", gap: "11px", marginTop: "28px" }}>
          {items.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: "15px", padding: "17px", background: "#FAF5ED", borderRadius: "4px", borderLeft: "3px solid var(--amber)" }}>
              <span style={{ fontSize: "22px", flexShrink: 0, marginTop: "2px" }}>{p.e}</span>
              <p style={{ fontSize: "14px", fontWeight: "400", color: "var(--brown)", lineHeight: "1.68" }}>{p.t}</p>
            </div>
          ))}
        </div>
        <p style={{ marginTop: "30px", fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "300", fontStyle: "italic", color: "var(--brown-md)", lineHeight: "1.62" }}>
          "보르넬리는 이 불편함에서 시작했습니다."
        </p>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  3. New Arrival
// ─────────────────────────────────────────────────────────────────────────────
function NewArrivalSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fi" style={{ background: "var(--cream)" }}>
      <div className="inner">
        {/* 섹션 헤더 */}
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--brown)" }}>NEW ARRIVAL</span>
          <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "var(--amber)", letterSpacing: "0.08em", textDecoration: "none", display: "flex", alignItems: "center", gap: "4px" }}>
            전체 보기 →
          </a>
        </div>
        <p className="section-sub">요즘 가장 먼저 보여주고 싶은 보르넬리 라인업</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {NEW_ARRIVALS.map((p) => (
            <div key={p.id} className="pcard">
              {/* 이미지 — 클릭 시 쿠팡 이동 */}
              <div style={{ position: "relative" }}>
                <PImg imageUrl={p.imageUrl} alt={p.name} emoji={p.emoji} placeholderBg={p.placeholderBg} height="210px"
                  onClick={() => window.open(p.url, "_blank")} />
                {/* 배지 */}
                <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", fontWeight: "500", letterSpacing: "0.14em", padding: "4px 10px", background: p.badgeColor, color: "#fff", borderRadius: "2px" }}>
                  {p.badge}
                </span>
                {/* 카테고리 배지 */}
                <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "10px", padding: "4px 10px", background: "rgba(30,12,4,0.68)", color: "rgba(247,242,234,0.9)", borderRadius: "2px", letterSpacing: "0.06em", backdropFilter: "blur(4px)" }}>
                  {p.category}
                </span>
              </div>
              <div style={{ padding: "18px 18px 20px" }}>
                <p style={{ fontSize: "11px", color: "var(--brown-lt)", letterSpacing: "0.08em", marginBottom: "5px" }}>{p.space}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "21px", fontWeight: "500", color: "var(--brown)", marginBottom: "8px", lineHeight: "1.3" }}>{p.name}</h3>
                {/* 후킹 문구 */}
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontStyle: "italic", color: "var(--brown-md)", lineHeight: "1.55", marginBottom: "18px" }}>{p.hook}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-amber" style={{ width: "100%", fontSize: "13px", padding: "12px" }}>
                  쿠팡에서 가격 확인하기 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  4. Best Pick
// ─────────────────────────────────────────────────────────────────────────────
function BestPickSection() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fi" style={{ background: "#F0E8DC" }}>
      <div className="inner">
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "6px" }}>
          <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--brown)" }}>BEST PICK</span>
          <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" style={{ fontSize: "11px", color: "var(--amber)", letterSpacing: "0.08em", textDecoration: "none" }}>
            전체 보기 →
          </a>
        </div>
        <p className="section-sub">보르넬리에서 가장 많이 찾는 향기 홈케어 제품</p>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {BEST_PICKS.map((p) => (
            <div key={p.id} className="pcard">
              <div style={{ position: "relative" }}>
                <PImg imageUrl={p.imageUrl} alt={p.name} emoji={p.emoji} placeholderBg={p.placeholderBg} height="200px"
                  onClick={() => window.open(p.url, "_blank")} />
                <span style={{ position: "absolute", top: "12px", left: "12px", fontSize: "10px", fontWeight: "500", letterSpacing: "0.14em", padding: "4px 10px", background: p.badgeColor, color: "#fff", borderRadius: "2px" }}>
                  {p.badge}
                </span>
                <span style={{ position: "absolute", top: "12px", right: "12px", fontSize: "10px", padding: "4px 10px", background: "rgba(30,12,4,0.68)", color: "rgba(247,242,234,0.9)", borderRadius: "2px", letterSpacing: "0.06em", backdropFilter: "blur(4px)" }}>
                  {p.category}
                </span>
              </div>
              <div style={{ padding: "18px 18px 20px" }}>
                {/* 장면 중심 후킹 문구 */}
                <p style={{ fontSize: "12px", color: "var(--amber)", letterSpacing: "0.08em", marginBottom: "6px", fontWeight: "500" }}>{p.scene}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "20px", fontWeight: "500", color: "var(--brown)", marginBottom: "8px", lineHeight: "1.3" }}>{p.name}</h3>
                <p style={{ fontSize: "13px", color: "var(--brown-lt)", lineHeight: "1.72", marginBottom: "6px" }}>{p.desc}</p>
                <p style={{ fontSize: "11px", color: "var(--brown-lt)", letterSpacing: "0.06em", marginBottom: "18px", opacity: 0.8 }}>{p.space}</p>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="btn-amber" style={{ width: "100%", fontSize: "13px", padding: "12px" }}>
                  쿠팡에서 가격 확인하기 →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  5. Scent Finder
// ─────────────────────────────────────────────────────────────────────────────
function ScentFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const ref = useFadeIn();

  const total = QUIZ_QS.length;
  const isIntro = step === 0;
  const isDone  = step > total;
  const curQ    = QUIZ_QS[step - 1];
  const recKey  = isDone ? getScentKey(answers) : null;
  const rec     = recKey ? SCENTS[recKey] : null;
  const iOpt    = QUIZ_QS[2]?.opts.find((o) => o.v === answers.intensity);

  const ans = (qid, val) => { setAnswers((p) => ({ ...p, [qid]: val })); setStep((s) => s + 1); };
  const reset = () => { setStep(0); setAnswers({}); };

  return (
    <section id="scent-finder" ref={ref} className="fi" style={{ background: "linear-gradient(180deg, #1A0902 0%, #2A1008 100%)" }}>
      <div className="inner">
        <span className="section-eyebrow" style={{ color: "#E8C77A" }}>향 추천 테스트</span>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "30px", fontWeight: "300", lineHeight: "1.3", color: "#F7F2EA", marginBottom: "8px" }}>
          나에게 맞는<br />보르넬리 향은?
        </h2>
        <div style={{ width: "36px", height: "1px", background: "rgba(200,151,58,0.38)", margin: "18px 0 30px" }} />

        {/* 인트로 */}
        {isIntro && (
          <>
            <p style={{ fontSize: "14px", color: "rgba(247,242,234,0.62)", lineHeight: "1.88", marginBottom: "30px" }}>
              3가지 질문에 답하면 공간과 취향에 딱 맞는 향을 추천해드립니다. 1분이면 충분해요.
            </p>
            <button className="btn-amber" onClick={() => setStep(1)} style={{ width: "100%", padding: "16px", fontSize: "15px", border: "none" }}>테스트 시작하기 ✨</button>
          </>
        )}

        {/* 질문 */}
        {!isIntro && !isDone && curQ && (
          <>
            <div style={{ display: "flex", gap: "5px", marginBottom: "26px" }}>
              {QUIZ_QS.map((_, i) => (
                <div key={i} style={{ flex: 1, height: "2px", background: i < step ? "#C8973A" : "rgba(247,242,234,0.14)", borderRadius: "1px", transition: "background 0.3s" }} />
              ))}
            </div>
            <p style={{ fontSize: "10px", color: "rgba(200,151,58,0.7)", letterSpacing: "0.12em", marginBottom: "9px" }}>{step} / {total}</p>
            <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "24px", fontWeight: "400", color: "#F7F2EA", lineHeight: "1.38", marginBottom: "24px" }}>
              {curQ.icon} {curQ.q}
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {curQ.opts.map((opt) => (
                <button key={opt.v} className="quiz-opt" onClick={() => ans(curQ.id, opt.v)}>{opt.l}</button>
              ))}
            </div>
          </>
        )}

        {/* 결과 */}
        {isDone && rec && (
          <>
            <div style={{ background: rec.bgColor, borderRadius: "10px", overflow: "hidden", marginBottom: "14px", border: `1px solid ${rec.color}28` }}>
              {/* 이미지 */}
              <div style={{ height: "180px" }}>
                <PImg imageUrl={rec.imageUrl} alt={rec.name} emoji={rec.emoji} placeholderBg={rec.placeholderBg} height="180px" />
              </div>
              <div style={{ padding: "22px 20px 24px" }}>
                <p style={{ fontSize: "10px", letterSpacing: "0.2em", color: rec.color, textTransform: "uppercase", marginBottom: "4px" }}>당신에게 맞는 향</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "500", color: rec.color, marginBottom: "4px" }}>{rec.name} {rec.emoji}</h3>
                {iOpt && <p style={{ fontSize: "12px", color: "var(--gray)", marginBottom: "16px" }}>{iOpt.iDesc} 향으로</p>}
                <div style={{ width: "28px", height: "1px", background: rec.color, opacity: 0.26, margin: "0 0 16px" }} />
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--brown-lt)", textTransform: "uppercase", marginBottom: "8px" }}>이 향이 어울리는 이유</p>
                <p style={{ fontSize: "13px", color: "var(--brown-md)", lineHeight: "1.82", marginBottom: "18px" }}>{rec.reason}</p>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--brown-lt)", textTransform: "uppercase", marginBottom: "8px" }}>추천 사용 공간</p>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "18px" }}>
                  {rec.spaces.map((s) => <span key={s} style={{ fontSize: "12px", padding: "4px 11px", background: `${rec.color}10`, color: rec.color, borderRadius: "2px", border: `1px solid ${rec.color}25` }}>{s}</span>)}
                </div>
                <p style={{ fontSize: "10px", letterSpacing: "0.12em", color: "var(--brown-lt)", textTransform: "uppercase", marginBottom: "8px" }}>추천 제품</p>
                <div style={{ display: "flex", gap: "7px", flexWrap: "wrap" }}>
                  {rec.rec.map((r) => <span key={r} style={{ fontSize: "12px", padding: "5px 12px", background: `${rec.color}14`, color: rec.color, borderRadius: "2px" }}>{r}</span>)}
                </div>
              </div>
            </div>
            <a href={rec.url} target="_blank" rel="noopener noreferrer" className="btn-amber" style={{ width: "100%", padding: "15px", fontSize: "15px", marginBottom: "10px", display: "flex", border: "none" }}>
              쿠팡에서 가격 확인하기 →
            </a>
            <button onClick={reset} style={{ width: "100%", padding: "12px", background: "transparent", border: "1px solid rgba(247,242,234,0.15)", borderRadius: "2px", color: "rgba(247,242,234,0.42)", fontSize: "13px", fontFamily: "'Noto Sans KR',sans-serif", fontWeight: "300", cursor: "pointer" }}>
              다시 테스트하기
            </button>
          </>
        )}
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  6. All Products (카테고리 탭)
// ─────────────────────────────────────────────────────────────────────────────
const TABS = ["전체", "향초", "습기제거제", "탈취제", "공간별 추천"];

function AllProductsSection() {
  const [activeTab, setActiveTab] = useState("전체");
  const ref = useFadeIn();

  const filtered = (() => {
    if (activeTab === "전체") return ALL_PRODUCTS;
    if (activeTab === "공간별 추천") return null; // 별도 렌더
    return ALL_PRODUCTS.filter((p) => p.category === activeTab);
  })();

  return (
    <section ref={ref} className="fi" style={{ background: "var(--cream)" }}>
      <div className="inner">
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", fontWeight: "600", letterSpacing: "0.12em", color: "var(--brown)", display: "block", marginBottom: "6px" }}>
          ALL PRODUCTS
        </span>
        <p className="section-sub">보르넬리 향기 홈케어 전체 라인업</p>

        {/* 탭 */}
        <div className="tab-bar">
          {TABS.map((t) => (
            <button key={t} className={`tab${activeTab === t ? " active" : ""}`} onClick={() => setActiveTab(t)}>{t}</button>
          ))}
        </div>

        {/* 공간별 추천 뷰 */}
        {activeTab === "공간별 추천" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {SPACE_GROUPS.map((g) => {
              const gProds = ALL_PRODUCTS.filter((p) => g.spaces.some((sp) => p.spaces.includes(sp)));
              return (
                <div key={g.label} style={{ background: "#FAF5ED", borderRadius: "8px", overflow: "hidden", border: "1px solid rgba(160,125,90,0.14)" }}>
                  {/* 공간 헤더 */}
                  <div style={{ padding: "16px 18px 14px", borderBottom: "1px solid rgba(160,125,90,0.12)" }}>
                    <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "500", color: "var(--brown)", marginBottom: "3px" }}>{g.label}</p>
                    <p style={{ fontSize: "12px", color: "var(--brown-lt)" }}>{g.desc}</p>
                  </div>
                  {/* 공간 제품 그리드 */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1px", background: "rgba(160,125,90,0.12)" }}>
                    {gProds.map((p) => (
                      <div key={p.id} style={{ background: "#FAF5ED", cursor: "pointer" }} onClick={() => window.open(p.url, "_blank")}>
                        <PImg imageUrl={p.imageUrl} alt={p.name} emoji={p.emoji} placeholderBg={p.placeholderBg} height="110px" />
                        <div style={{ padding: "10px 12px 12px" }}>
                          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", fontWeight: "500", color: "var(--brown)", lineHeight: "1.3", marginBottom: "3px" }}>{p.name}</p>
                          <p style={{ fontSize: "10px", color: p.accent, letterSpacing: "0.06em" }}>{p.category}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 일반 그리드 뷰 */}
        {activeTab !== "공간별 추천" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
            {filtered.map((p) => (
              <div key={p.id} className="pcard" onClick={() => window.open(p.url, "_blank")}>
                {/* 썸네일 이미지 */}
                <div style={{ position: "relative" }}>
                  <PImg imageUrl={p.imageUrl} alt={p.name} emoji={p.emoji} placeholderBg={p.placeholderBg} height="140px" />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: p.accent }} />
                </div>
                <div style={{ padding: "12px 12px 14px" }}>
                  <p style={{ fontSize: "10px", color: p.accent, letterSpacing: "0.08em", marginBottom: "4px" }}>{p.category}</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "15px", fontWeight: "500", color: "var(--brown)", lineHeight: "1.3", marginBottom: "4px" }}>{p.name}</p>
                  <p style={{ fontSize: "10px", color: "var(--brown-lt)", letterSpacing: "0.05em", marginBottom: "10px", opacity: 0.85 }}>{p.tagline}</p>
                  <div style={{ fontSize: "11px", color: "var(--amber)", display: "flex", alignItems: "center", gap: "4px", fontWeight: "500" }}>
                    쿠팡에서 보기 <span>→</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 전체 보기 버튼 */}
        <div style={{ marginTop: "28px", textAlign: "center" }}>
          <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" className="btn-amber" style={{ fontSize: "14px", padding: "14px 36px", display: "inline-flex" }}>
            쿠팡에서 전체 상품 보기 →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  7. Content Hub
// ─────────────────────────────────────────────────────────────────────────────
function ContentHub() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fi" style={{ background: "#F0E8DC" }}>
      <div className="inner">
        <span className="section-eyebrow">콘텐츠 허브</span>
        <h2 className="section-title">향기로운 공간을<br />만드는 방법</h2>
        <div className="divider" />
        <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "28px" }}>
          {CONTENT_CARDS.map((card, i) => (
            <div key={i} className="content-card">
              <div style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                <span style={{ fontSize: "24px", flexShrink: 0, lineHeight: 1 }}>{card.emoji}</span>
                <div>
                  <p style={{ fontSize: "10px", color: "var(--amber)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "5px" }}>{card.category}</p>
                  <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "18px", fontWeight: "500", color: "var(--brown)", lineHeight: "1.35", marginBottom: "7px" }}>{card.title}</h4>
                  <p style={{ fontSize: "13px", color: "var(--brown-lt)", lineHeight: "1.7" }}>{card.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  8. Final CTA
// ─────────────────────────────────────────────────────────────────────────────
function FinalCTA() {
  const ref = useFadeIn();
  return (
    <section ref={ref} className="fi" style={{ background: "linear-gradient(155deg,#3D2314 0%,#6B3820 100%)", textAlign: "center", padding: "92px 28px" }}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "11px", letterSpacing: "0.44em", color: "rgba(200,151,58,0.75)", textTransform: "uppercase", marginBottom: "28px" }}>BORNELLI</p>
        <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "28px", fontWeight: "300", color: "#F7F2EA", lineHeight: "1.4", marginBottom: "20px" }}>
          우리 집에 맞는 향기 루틴,<br />
          <em style={{ fontStyle: "italic", color: "#E8C77A" }}>보르넬리</em>에서 시작해보세요.
        </h2>
        <div style={{ width: "36px", height: "1px", background: "rgba(200,151,58,0.36)", margin: "0 auto 26px" }} />
        <p style={{ fontSize: "13px", color: "rgba(247,242,234,0.55)", lineHeight: "1.88", marginBottom: "40px" }}>
          부담 없이 가격만 먼저 확인해보세요.<br />
          쿠팡에서 오늘 주문하면 빠르게 받아볼 수 있습니다.
        </p>
        <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" className="btn-amber"
          style={{ fontSize: "15px", padding: "16px 36px", display: "flex", width: "100%", maxWidth: "360px", margin: "0 auto 12px" }}>
          쿠팡에서 가격 확인하기 →
        </a>
        <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" className="btn-ghost"
          style={{ fontSize: "14px", padding: "13px 28px", display: "flex", width: "100%", maxWidth: "360px", margin: "0 auto" }}>
          쿠팡에서 빠른 배송 확인하기
        </a>
      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Footer
// ─────────────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: "#0E0500", color: "rgba(247,242,234,0.3)", padding: "44px 28px", textAlign: "center" }}>
      <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "14px", letterSpacing: "0.3em", color: "rgba(200,151,58,0.44)", marginBottom: "14px" }}>BORNELLI</p>
      <p style={{ fontSize: "12px", lineHeight: "1.95" }}>
        홈프래그런스 브랜드 · 쿠팡 공식 입점<br />
        © 2025 Bornelli. All rights reserved.
      </p>
    </footer>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  Sticky CTA
// ─────────────────────────────────────────────────────────────────────────────
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 440);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return (
    <div className={`sticky-cta${show ? "" : " hidden"}`}>
      <a href={CU_SHOP} target="_blank" rel="noopener noreferrer" className="btn-amber"
        style={{ width: "100%", maxWidth: "440px", padding: "15px 24px", fontSize: "15px", border: "none", boxShadow: "0 0 28px rgba(200,151,58,0.16)" }}>
        쿠팡에서 가격 확인하기 →
      </a>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
//  App
//  퍼널 순서: Hero → Problem → New Arrival → Best Pick →
//             Scent Finder → All Products → Content Hub → Final CTA
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  useEffect(() => {
    const s = document.createElement("style");
    s.id = "bornelli-g";
    s.textContent = G;
    document.head.appendChild(s);
    return () => document.getElementById("bornelli-g")?.remove();
  }, []);

  return (
    <>
      <div style={{ maxWidth: "100%", overflowX: "hidden" }}>
        <Hero />
        <ProblemSection />
        <NewArrivalSection />
        <BestPickSection />
        <ScentFinder />
        <AllProductsSection />
        <ContentHub />
        <FinalCTA />
        <Footer />
      </div>
      <StickyCTA />
    </>
  );
}
