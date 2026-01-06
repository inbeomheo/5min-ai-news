# 5분 AI 뉴스 - 에이전트 작업 가이드

## 📋 매일 뉴스 업로드 체크리스트

### 1️⃣ 파일 준비
- [ ] **대시.HTML** 파일 생성 (뉴스 대시보드 버전)
- [ ] **인포.HTML** 파일 생성 (인포그래픽 버전)
- [ ] 파일명 형식 확인: `5분 AI 뉴스 정리 (YYYY년 MM월 DD일) 대시.HTML`
- [ ] 파일명 형식 확인: `5분 AI 뉴스 정리 (YYYY년 MM월 DD일) 인포.HTML`

> 💡 **팁**: 이전 날짜 파일을 복사한 후 날짜와 내용만 수정하면 빠릅니다.

### 2️⃣ HTML 파일 내 필수 요소
- [ ] **날짜 업데이트**: 헤더의 날짜를 해당 일자로 수정
- [ ] **홈 버튼 확인**: 헤더에 홈(목록)으로 돌아가는 버튼 포함
  - 대시.HTML: 헤더 우측에 "← 목록" 링크
  - 인포.HTML: 헤더 상단에 "← 전체 목록" 버튼
- [ ] **카테고리 태그 색상**: 대시.HTML에서 `getCategoryColor()` 함수가 있는지 확인
- [ ] **뉴스 데이터 업데이트**: `reportData` 배열에 뉴스 항목 입력 (대시.HTML)

### 3️⃣ index.html 업데이트
- [ ] **새 월 시작 시**: 해당 월 섹션 추가 (예: January, February...)
- [ ] **새 뉴스 카드 추가**: 해당 날짜의 카드를 해당 월 섹션 그리드 최상단에 추가
- [ ] **NEW 배지 이동**: 새 카드에 `<span class="badge-new">NEW</span>` 추가
- [ ] **이전 날짜 NEW 배지 제거**: 기존 NEW 배지 제거
- [ ] **월 카운트 업데이트**: `<span class="month-count">N Issues</span>` 숫자 증가

### 4️⃣ Git 커밋 & 배포
- [ ] `git add -A`
- [ ] `git commit -m "Add [날짜] AI News (Dashboard + Infographic)"`
- [ ] `git push origin main`
- [ ] Netlify 자동 배포 확인 (1~2분 소요)

---

## 🏠 홈 버튼 코드 템플릿

### 대시.HTML 헤더 (오른쪽에 버튼 추가)
```html
<div class="text-sm font-medium text-slate-500">
    <a href="../../index.html" class="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-slate-700 font-semibold">
        <span>←</span> 목록
    </a>
</div>
```

### 인포.HTML 헤더 (상단에 버튼 추가)
```html
<a href="../../index.html" 
   class="inline-block bg-white border-2 border-black px-4 py-1 rounded-full font-bold mb-4 shadow-[2px_2px_0px_black] hover:shadow-[1px_1px_0px_black] hover:translate-x-[1px] hover:translate-y-[1px] transition-all text-sm">
    ← 전체 목록
</a>
```

---

## 📰 대시.HTML 뉴스 데이터 구조

`reportData` 배열에 뉴스 항목을 아래 형식으로 추가:

```javascript
{
    theme: THEME_INFRA,        // 테마 상수 (5가지 중 선택)
    category: "반도체/가격",    // 태그 표시용 (색상 자동 적용)
    title: "뉴스 제목...",      // 카드에 표시
    isTop5: true,              // Today's Top 5에 표시 여부
    details: "상세 내용..."     // 모달 클릭 시 표시
}
```

### 테마 상수 (5가지)
- `THEME_INFRA` - AI 인프라 및 투자
- `THEME_PLATFORM` - 플랫폼, 제품 및 에이전트
- `THEME_INDUSTRY` - 산업별 AI 적용
- `THEME_LEGAL` - 법률, 규제 및 거버넌스
- `THEME_SOCIETY` - AI와 사회

---

## 🎨 카테고리 태그 색상 매핑

| 키워드 | 색상 | Tailwind 클래스 |
|--------|------|-----------------|
| 규제, 법률, 리스크, 논란 | 🔴 Red | `bg-red-50 text-red-700` |
| 투자, 실적, 경제, 자금 | 🟢 Emerald | `bg-emerald-50 text-emerald-700` |
| 의료, 헬스, 바이오, 병원 | 🌸 Rose | `bg-rose-50 text-rose-700` |
| 기술, 플랫폼, LLM, 모델 | 🔵 Blue | `bg-blue-50 text-blue-700` |
| 로봇, CES, 하드웨어, 자율주행 | 🟠 Amber | `bg-amber-50 text-amber-700` |
| 사회, 교육, 트렌드, 고용 | 🟣 Violet | `bg-violet-50 text-violet-700` |
| 기타 | ⚪ Slate | `bg-slate-100 text-slate-600` |

---

## 📁 폴더 구조

```
5min-ai-news/
├── .gitignore
├── AGENTS.md            # 이 파일
├── index.html           # 메인 목록 페이지
├── favicon.svg
├── netlify.toml         # Netlify 배포 설정
├── visitor-tracker.js   # 방문자 추적
├── data/                # 데이터 폴더
├── scripts/             # 스크립트 폴더
└── news/
    ├── 2025-10/         # 10월 뉴스 (16개 파일)
    ├── 2025-11/         # 11월 뉴스 (54개 파일)
    ├── 2025-12/         # 12월 뉴스 (58개 파일)
    └── 2026-01/         # 1월 뉴스
        ├── 5분 AI 뉴스 정리 (2026년 01월 06일) 대시.HTML
        └── 5분 AI 뉴스 정리 (2026년 01월 06일) 인포.HTML
```

---

## ⚠️ 주의사항

1. **파일명 인코딩**: 한글 파일명은 URL 인코딩 문제가 생길 수 있으니, `git status`로 정상 인식 확인
2. **상대 경로**: 홈 버튼 링크는 `../../index.html` (news/YYYY-MM/ 폴더 기준)
3. **월 전환 시**: 새 월 섹션을 추가할 때 이전 월은 `collapsed` 클래스 추가
4. **Top 5 선정**: `isTop5: true`는 가장 중요한 5개 뉴스에만 설정

---

*Last Updated: 2026-01-06*
