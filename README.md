# BORNELLI 랜딩페이지

> 보르넬리 홈프래그런스 브랜드 카탈로그형 랜딩페이지  
> 쿠팡 판매 전환을 목표로 한 모바일 우선 반응형 SPA

---

## 스택

| 항목 | 기술 |
|---|---|
| 프레임워크 | Vite + React 18 |
| 언어 | JavaScript (JSX) |
| 스타일 | CSS-in-JS (인라인 스타일) |
| 폰트 | Cormorant Garamond · Noto Sans KR (Google Fonts) |
| 배포 대상 | GitHub Pages / Vercel / Netlify |

---

## 페이지 구성

```
Hero          → 브랜드 대표 이미지 + CTA
Problem       → 소비자 공감 시나리오
NEW ARRIVAL   → 신제품 카드 (이미지 클릭 → 쿠팡)
BEST PICK     → 장면 중심 베스트셀러 카드
Scent Finder  → 3문항 향 추천 퀴즈 + 개인화 결과
ALL PRODUCTS  → 카테고리 탭 필터 (전체/향초/제습제/탈취제/공간별)
Content Hub   → 블로그·릴스 연결 카드
Final CTA     → 최종 전환 버튼
Sticky CTA    → 모바일 하단 고정 버튼
```

---

## 로컬 실행

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev
# → http://localhost:5173

# 3. 프로덕션 빌드
npm run build

# 4. 빌드 결과 미리보기
npm run preview
```

---

## 이미지 교체

`public/images/` 폴더에 아래 파일이 있어야 합니다.

| 파일명 | 용도 |
|---|---|
| `bornelli-hero.png` | Hero 대표 단체컷 |
| `blackcherry-result.png` | 블랙체리 캔들 (NEW ARRIVAL · 퀴즈 결과) |
| `lavender-result.png` | 라벤더 제습제 (NEW ARRIVAL · 퀴즈 결과) |
| `bornelli-candle.jpg` | 블루코튼씨 캔들 (캔들 계열 공통) |
| `bornelli-dehumidifier.png` | 제습제 멀티팩 |
| `bornelli-deodorizer.png` | 초강력 탈취제 |

> 추가 제품 이미지가 생기면 `src/App.jsx` 상단 각 제품 데이터의 `imageUrl` 값만 교체하면 됩니다.

---

## 쿠팡 URL 교체

`src/App.jsx` 파일 최상단 `BORNELLI_URL` 한 줄만 수정하면 전체 링크가 반영됩니다.

```js
const BORNELLI_URL = "https://shop.coupang.com/A00283859/224703?...";
```

개별 상품 URL이 생기면 아래 상수를 각각 수정하세요.

```js
const CU_CANDLE1  = "https://www.coupang.com/vp/products/상품ID";
const CU_DEHUMID1 = "https://www.coupang.com/vp/products/상품ID";
const CU_DEODOR1  = "https://www.coupang.com/vp/products/상품ID";
```

---

## Vercel 배포 (권장)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

또는 GitHub 레포지토리를 Vercel에 연결하면 push 시 자동 배포됩니다.

---

## 디렉토리 구조

```
bornelli-landing/
├── public/
│   └── images/
│       ├── bornelli-hero.png
│       ├── blackcherry-result.png
│       ├── lavender-result.png
│       ├── bornelli-candle.jpg
│       ├── bornelli-dehumidifier.png
│       └── bornelli-deodorizer.png
├── src/
│   ├── App.jsx          ← 메인 컴포넌트 (단일 파일)
│   └── main.jsx         ← React 진입점
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

© 2025 BORNELLI. All rights reserved.
