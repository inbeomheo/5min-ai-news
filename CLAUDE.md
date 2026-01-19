# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

5분 AI 뉴스 - 매일 AI 기술 트렌드를 큐레이션하여 제공하는 정적 아카이브 웹사이트. 각 리포트는 대시보드(상세 분석)와 인포그래픽(시각 요약) 두 가지 버전으로 제공됨.

## Tech Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript, Tailwind CSS (CDN)
- **Visualization**: Chart.js (인포그래픽)
- **Analytics**: Supabase Realtime (`data/visitor-tracker.js`)
- **Hosting**: Netlify (git push 시 자동 배포)

## Build & Deploy

빌드 과정 없음 (순수 정적 사이트). `git push origin main` 실행 시 Netlify가 자동 배포.

```bash
git add -A && git commit -m "Add YYYY-MM-DD AI News (Dashboard + Infographic)" && git push origin main
```

## Architecture

```
5min-ai-news/
├── index.html              # 메인 목록 (월별 섹션, 카드 그리드)
├── data/visitor-tracker.js # Supabase 방문자 추적
└── news/YYYY-MM/           # 월별 뉴스 폴더
    ├── ...대시.HTML         # 대시보드 - reportData 배열, 모달 팝업
    └── ...인포.HTML         # 인포그래픽 - KPI 카드, Chart.js
```

## Daily News Workflow

**상세 체크리스트 및 코드 템플릿**: `AGENTS.md` 참조

1. `news/YYYY-MM/` 폴더에 대시.HTML, 인포.HTML 파일 생성
2. **필수 검증**: 홈 버튼 (`../../index.html`) 포함 확인
3. index.html에 새 카드 추가, NEW 배지 이동, 월 카운트 증가
4. Git 커밋 & 푸시

## Critical Rules

**커밋 전 필수 검증:**
```bash
# 홈 버튼 확인 (두 파일 모두 출력되어야 함)
grep -l "../../index.html" news/YYYY-MM/*파일명*
```

**금지:**
- 검증 없이 커밋 금지
- AGENTS.md 체크리스트 미확인 상태로 작업 금지

## Known Issues

| Issue | Prevention |
|-------|------------|
| 홈 버튼 누락 | 파일 생성 후 `grep "../../index.html"` 검증 필수 |
| CSS 호환성 경고 | `-webkit-line-clamp` 사용 시 `line-clamp`도 함께 추가 |
