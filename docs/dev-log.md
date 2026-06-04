# 개발일지 — 이유민 포트폴리오 웹사이트

> 작업 기간: 2026년 6월 4일  
> 레포지토리: https://github.com/Yoomin-Lee/rest01  
> 배포 URL: https://yoomin-lee.github.io/rest01/

---

## 1. 프로젝트 초기 세팅

| 항목 | 내용 |
|------|------|
| 기술 스택 | HTML5 / CSS3 / Vanilla JavaScript |
| 배포 | GitHub Pages (GitHub Actions 워크플로) |
| 폰트 | Noto Sans KR, Inter (Google Fonts) |
| 구조 | 단일 페이지(SPA) 방식, 섹션 스크롤 |

**작업 내용**
- `https://github.com/Yoomin-Lee/rest01` 클론
- `index.html`, `style.css`, `script.js`, `images/` 기본 구조 생성
- GitHub Actions 배포 워크플로(`.github/workflows/deploy.yml`) 구성
- `.nojekyll` 파일 추가로 Jekyll 빌드 비활성화

---

## 2. 개인 정보 반영

**참고 소스**
- `https://github.com/Yoomin-Lee/Portfolio03` — 기존 포트폴리오
- `이유민 이력서.pdf` — 입사지원서 + 자기소개서 + 석사학위논문

**반영된 정보**

| 항목 | 내용 |
|------|------|
| 이름 | 이유민 (Yoomin Lee) |
| 생년월일 | 1996년 3월 25일 |
| 주소 | 경기도 수원시 권선구 |
| 이메일 | ym2164@naver.com |
| GitHub | Yoomin-Lee |
| 직함 | History Researcher & Junior Web Developer |

---

## 3. 섹션별 구현

### 3-1. Hero 섹션
- 프로필 사진 (`images/profile.png`) 원형 표시
- 순차 등장 애니메이션 (사진 → 인삿말 → 이름 → 태그라인 → 버튼, 0.18초 간격)
- 타이핑 효과: "History Researcher & Junior Web Developer" 글자 단위 타이핑
- 프로필 사진 플로팅 애니메이션 (4s 상하 부유)

### 3-2. 소개 섹션
- 자기소개서 기반 자연스러운 소개 텍스트 (2단락)
- `word-break: keep-all` 적용으로 한국어 어절 단위 줄바꿈
- 개인정보 목록: 이름, 생년월일, 주소, 이메일, GitHub

### 3-3. 기술 스택 섹션
- 좌: Web Development (HTML 45% / CSS 30% / JS 25% / Git 40%)
- 우: Research & Analysis (역사 자료 분석 90% / 문헌 연구 85% / 강의·콘텐츠 설계 75% / 행사 기획·운영 70%)
- 스크롤 진입 시 프로그레스 바 채워지는 애니메이션
- Shimmer 효과: 진입 시 1회 재생 후 정지

### 3-4. 경력 섹션
타임라인 형식 (flex 레이아웃으로 도트-텍스트 정렬)

| 기간 | 직책 | 기관 |
|------|------|------|
| 2021 ~ 2022 | 역사·사회 강사 | 교육기관 |
| 2022 ~ 2024 | 연구조교 | 단국대학교 부설 동양학연구원 |
| 2024 ~ 2025 | 위촉연구원 | 연구기관 (인턴 → 정식 임용) |

### 3-5. 학력 섹션
- 단국대학교 대학원 (2022.03 ~ 2025.02)
- 사학과 동양사전공 · 문학석사(M.A.)
- 논문: 「1910년대 만주 한인 이주에 대한 중국·일본의 대응」

### 3-6. 자격증 섹션
카드 그리드 레이아웃, 아이콘 + 기관명 + 취득일 구성

| 자격증 | 기관 | 취득일 |
|--------|------|--------|
| 한국사능력검정시험 1급 | 국사편찬위원회 | 2021.06.05 |
| 운전면허 2종보통 | 경기남부지방경찰청 | 2018.02.27 |
| 한자능력검정시험 3급 | 한국어문회 | 2023.09.22 |

### 3-7. 연락처 섹션
- 이메일 / GitHub 링크 카드

---

## 4. 디자인 시스템

### 컬러 팔레트 (`palette.css`)

| 토큰 | 색상 | 용도 |
|------|------|------|
| `--p1` | `#1E0A3C` Deep Violet | 다크모드 배경 / 라이트 본문 텍스트 |
| `--p2` | `#7C3AED` Violet | 이벤트 컬러 / 라이트모드 액센트 |
| `--p3` | `#F5C518` Yellow | 주컬러 / 다크모드 액센트 |
| `--p4` | `rgba(245,197,24,0.5)` | 보조컬러 / 배지·배경 |
| `--p5` | `#FAF7FF` Lavender Cream | 배경 섹션 |

**접근성 대비율**
- 라이트: Violet on White = 4.8:1 (WCAG AA ✓)
- 다크: Yellow on Dark = 11:1 (WCAG AAA ✓)

### 다크 모드
- 시스템 설정 자동 감지 (`prefers-color-scheme: dark`)
- 수동 토글 버튼 (☀️/🌙) — 선택값 `localStorage` 저장
- 라이트: 바이올렛 액센트 / 다크: 옐로우 액센트

---

## 5. 인터랙션 효과

| 효과 | 구현 방식 |
|------|----------|
| 스크롤 페이드인 | `IntersectionObserver` + CSS transition |
| 스킬 바 진입 애니메이션 | `IntersectionObserver` + width transition + 1회 shimmer |
| 타이핑 커서 | 커스텀 `setInterval` 타이핑 로직 |
| 커스텀 커서 | CSS `cursor: url(SVG data URI)` |
| 스파클 트레일 | `mousemove` 이벤트 + DOM 스폰 + CSS keyframe |
| Nav 액티브 하이라이트 | `IntersectionObserver` rootMargin 기반 |
| 다크모드 토글 | `data-theme` attribute + localStorage |

---

## 6. SEO / 소셜 공유

### OG 메타태그 (카카오톡 등)
```html
og:title       이유민 — 한국의 웹개발 전문가
og:description History Researcher & Junior Web Developer
og:image       /images/og-image.png (1200×630)
og:locale      ko_KR
```

### og:image 생성
- Playwright 헤드리스 브라우저로 HTML 렌더링 → PNG 추출
- 바이올렛 배경 + 한국어 이름 + 직함 + YM 레터마크

### 파비콘
- `images/favicon.svg` — 커서 화살표 모양 (옐로우→바이올렛 그라디언트)
- `images/favicon.png` — SVG 폴백용 32×32 PNG
- `images/apple-touch-icon.png` — 180×180 Apple Touch Icon

---

## 7. 커밋 이력 요약

| 커밋 | 내용 |
|------|------|
| `ce9c9f1` | 이력서 웹사이트 초기 구조 세팅 |
| `ca0edfd` | Portfolio03 참고 개인 정보 반영 |
| `e8494d9` | 이력서 PDF 기반 실제 데이터 반영 |
| `8952bb5` | GitHub Actions 자동 배포 워크플로 추가 |
| `230576d` | 프로젝트 섹션 완전 제거 |
| `d5c35de` | 경력 근무 기간 및 위촉연구원 임용 내용 추가 |
| `6f82b3e` | 동양학연구원 경력 추가 및 대학원 재학 기간 수정 |
| `0c8d745` | 동양학연구원 연구조교 경력 설명 추가 |
| `a70314e` | 섹션 타이틀 파란 바 → 글씨 너비 맞춤 수정 |
| `474d1a5` | 자격증 섹션 추가 |
| `4fbfa7e` | 소개 문단 자연스럽게 수정, 자격증 한 줄 처리 |
| `f280107` | Yellow+Violet 팔레트 시스템 (palette.css 분리, 다크모드) |
| `8c53723` | 섹션 타이틀 하단 바 색상 옐로우 → 바이올렛 |
| `92ffcb8` | 커스텀 커서 및 스파클 트레일 효과 추가 |
| `cf6c11c` | 타임라인 dot-텍스트 수평 정렬 (flex 방식) |
| `530d84a` | OG 메타태그 / 파비콘 / og:image 추가 |
| `3574024` | 파비콘 커서 이미지로 교체 (SVG + PNG) |
| `d2dfca5` | Hero 스크롤 힌트 바 제거 |
| `e2dd8d9` | 스킬 바 그라디언트 강화 + shimmer 애니메이션 |
| `2b04ad2` | Shimmer 무한 반복 제거, 스크롤 진입 시 1회만 |
| `17a62cf` | 소개 텍스트 word-break: keep-all 적용 |
| `fafb394` | 소개 텍스트 크기 1.05rem → 0.9rem |
| `b89115b` | 소개 텍스트 0.9rem → 1.15rem, 줄간격 1.9 |
