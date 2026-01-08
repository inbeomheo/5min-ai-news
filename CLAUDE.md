# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

5분 AI 뉴스 - 매일 AI 기술 트렌드를 큐레이션하여 제공하는 정적 아카이브 웹사이트. 각 리포트는 대시보드(상세 분석)와 인포그래픽(시각 요약) 두 가지 버전으로 제공됨.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Tailwind CSS
- **Visualization**: Chart.js (인포그래픽)
- **Analytics**: Supabase Realtime (방문자 추적)
- **Hosting**: Netlify (git push 시 자동 배포)

## Build & Deploy

빌드 과정 없음 (순수 정적 사이트). `git push origin main` 실행 시 Netlify가 1~2분 내 자동 배포.

```bash
# 배포
git add -A && git commit -m "Add [날짜] AI News (Dashboard + Infographic)" && git push origin main
```

## Daily News Upload Workflow

상세 가이드: `AGENTS.md` 참조

1. **파일 생성**: `news/YYYY-MM/` 폴더에 대시.HTML, 인포.HTML 파일 추가
2. **필수 검증**:
   - 홈 버튼 링크 (`../../index.html`) 포함 확인
   - 대시.HTML에 `line-clamp` 표준 속성 포함 확인
3. **index.html 업데이트**: 새 카드 추가, NEW 배지 이동, 월 카운트 증가
4. **Git 커밋 & 푸시**

### Verification Commands

```bash
# 홈 버튼 확인
grep -l "../../index.html" news/YYYY-MM/*.HTML

# 파일 정상 인식 확인
git status
```

## Architecture

- **index.html**: 메인 목록 페이지 (월별 섹션, 카드 그리드)
- **news/YYYY-MM/대시.HTML**: 대시보드 형식 - `reportData` 배열로 뉴스 데이터 관리, 모달 팝업 상세보기
- **news/YYYY-MM/인포.HTML**: 인포그래픽 형식 - KPI 카드, Chart.js 시각화
- **data/visitor-tracker.js**: Supabase 연동 방문자 추적 (RLS 보호)

## Key Patterns

### News Data Structure (대시.HTML)
```javascript
{
    theme: THEME_INFRA,      // 5가지: INFRA, PLATFORM, INDUSTRY, LEGAL, SOCIETY
    category: "태그명",       // 색상 자동 매핑 (getCategoryColor 함수)
    title: "뉴스 제목",
    isTop5: true,            // Top 5 표시 여부
    details: "상세 내용"
}
```

### Home Button Templates
대시.HTML과 인포.HTML 각각 다른 스타일의 홈 버튼 사용. 코드 템플릿은 `AGENTS.md`의 "🏠 홈 버튼 코드 템플릿" 섹션 참조.

## Known Issues & Prevention

| Issue | Prevention |
|-------|------------|
| 홈 버튼 누락 | 파일 생성 후 `grep "../../index.html"` 검증 필수 |
| CSS 호환성 경고 | `-webkit-line-clamp` 사용 시 `line-clamp`도 함께 추가 |

## Commit Message Format

```
Add [날짜] AI News (Dashboard + Infographic)
```
