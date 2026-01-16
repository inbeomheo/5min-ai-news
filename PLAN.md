# Index 페이지 디자인 개선 계획

> 작성일: 2026-01-17
> 상태: 검토 대기

---

## 현재 상태 분석

### 디자인 스타일
- **테마**: 네오 브루탈리즘 (굵은 테두리, 하드 섀도우, 레트로 감성)
- **컬러**: 웜톤 배경(#FDF0E0), 다크(#1E1E1E), Primary(#FF6B6B)
- **레이아웃**: 12컬럼 그리드, 월별 아코디언

### 문제점 요약
1. 색상 활용도 낮음 (secondary 미사용)
2. 최신 뉴스 시각적 강조 부족
3. 카드 정보량 부족 (날짜만 표시)
4. 모바일 터치 영역 작음
5. Tailwind/순수CSS 혼용으로 일관성 저하

---

## 개선 계획

### Phase 1: 즉시 적용 (Low-effort, High-impact)

#### 1.1 최신 카드 Featured 스타일
```
목표: 최신 뉴스 카드를 시각적으로 강조
방법:
- 첫 번째 카드에 .featured 클래스 추가
- 배경색: 그라데이션 또는 primary 연한 버전
- 크기: span 6 (2배 너비) 또는 span 8
- 테두리: 더 굵게 (4px)
```

#### 1.2 버튼 색상 구분
```
목표: 대시보드/인포그래픽 링크 시각적 구분
방법:
- 대시보드: primary 계열 (#FF6B6B)
- 인포그래픽: secondary 계열 (#4ECDC4)
- 호버 시 색상 반전
```

#### 1.3 모바일 터치 영역 확대
```
목표: 모바일 사용성 개선
방법:
- .card-link padding: 12px → 16px
- 최소 높이 44px 확보
```

---

### Phase 2: 중기 개선 (Medium-effort)

#### 2.1 Sticky 헤더
```
목표: 스크롤 시 빠른 탐색
방법:
- header에 position: sticky; top: 0 추가
- 배경 블러 효과 (backdrop-filter)
- 스크롤 시 그림자 추가 (JS)
```

#### 2.2 코드 일관성 정리
```
목표: 유지보수성 향상
방법:
- 371번 줄 Tailwind 클래스 → 순수 CSS로 변환
- 또는 Tailwind 전면 도입 결정
```

#### 2.3 접근성 개선
```
목표: 키보드/스크린리더 지원
방법:
- 아코디언에 aria-expanded 추가
- 버튼에 role="button" 및 tabindex
- 포커스 스타일 추가
```

---

### Phase 3: 장기 개선 (High-effort)

#### 3.1 카드 정보 확장
```
목표: 콘텐츠 미리보기 제공
방법:
- 각 뉴스 파일에서 키워드 추출
- 카드에 태그 3개 표시
- 예: [Claude Code] [ChatGPT 광고] [바이브 코딩]
```

#### 3.2 검색/필터 기능
```
목표: 빠른 뉴스 탐색
방법:
- 헤더에 검색창 추가
- 월/키워드 필터
- 클라이언트 사이드 검색 (JS)
```

#### 3.3 다크모드
```
목표: 눈 피로도 감소, 트렌디함
방법:
- CSS 변수 기반 테마 전환
- prefers-color-scheme 미디어쿼리
- 토글 버튼 추가
```

---

## 구현 우선순위

| 순위 | 항목 | Phase | 예상 작업량 |
|------|------|-------|-------------|
| 1 | Featured 카드 스타일 | 1.1 | CSS 추가 |
| 2 | 버튼 색상 구분 | 1.2 | CSS 수정 |
| 3 | 터치 영역 확대 | 1.3 | CSS 수정 |
| 4 | Sticky 헤더 | 2.1 | CSS + JS |
| 5 | 코드 정리 | 2.2 | HTML/CSS |
| 6 | 접근성 | 2.3 | HTML + JS |
| 7 | 카드 정보 확장 | 3.1 | 구조 변경 |
| 8 | 검색 기능 | 3.2 | JS 개발 |
| 9 | 다크모드 | 3.3 | CSS + JS |

---

## 결정 사항 (2026-01-17 확정)

### Q1. Phase 1 범위
- [x] **1.1 + 1.2 + 1.3 모두 진행**

### Q2. 디자인 방향
- [x] **좀 더 미니멀하게 변경**
  - 테두리: 3px → 2px
  - 그림자: 하드섀도우 → 소프트섀도우
  - 색상: 채도 낮추기
  - 여백: 더 넉넉하게

---

## Phase 1 상세 구현 계획 (미니멀 버전)

### 1.1 Featured 카드 스타일
```css
/* 변경 전: 모든 카드 동일 */
/* 변경 후: 첫 번째 카드 강조 (미니멀하게) */

.card.featured {
    grid-column: span 6;           /* 2배 너비 */
    background: #FAFAFA;           /* 약간 다른 배경 */
    border: 2px solid #1E1E1E;     /* 테두리 유지하되 얇게 */
    box-shadow: 0 4px 12px rgba(0,0,0,0.08);  /* 소프트섀도우 */
}
```

### 1.2 버튼 색상 구분
```css
/* 변경 전: 모든 버튼 동일 (흰 배경 + 검은 테두리) */
/* 변경 후: 미니멀한 색상 구분 */

.card-link.dashboard {
    background: #FFF5F5;           /* 연한 핑크 */
    border-color: #E8B4B4;         /* 파스텔 레드 */
}

.card-link.infographic {
    background: #F0FAFA;           /* 연한 민트 */
    border-color: #A8D8D8;         /* 파스텔 민트 */
}
```

### 1.3 전체 미니멀화
```css
/* 카드 */
.card {
    border: 2px solid var(--dark);           /* 3px → 2px */
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);  /* 하드 → 소프트 */
    border-radius: 8px;                       /* 모서리 추가 */
}

/* 월 섹션 */
.month-section {
    border: 2px solid var(--dark);
    box-shadow: 0 4px 16px rgba(0,0,0,0.06);
}

/* 스탯 카드 */
.stat-item {
    border: 2px solid var(--dark);
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
```

### 1.4 터치 영역 확대
```css
.card-link {
    padding: 14px 16px;            /* 12px → 14px 16px */
    min-height: 44px;              /* 터치 최소 높이 */
}
```

---

## 구현 체크리스트

- [ ] CSS 변수 추가 (소프트 섀도우)
- [ ] .card 스타일 미니멀화
- [ ] .card.featured 스타일 추가
- [ ] .card-link 색상 분리 (dashboard/infographic)
- [ ] .month-section 미니멀화
- [ ] .stat-item 미니멀화
- [ ] 터치 영역 확대
- [ ] HTML에 featured 클래스 추가
- [ ] HTML에 dashboard/infographic 클래스 추가
- [ ] 테스트 및 확인

---

## 승인

- [x] 계획 승인 (2026-01-17)

---

*Last Updated: 2026-01-17*
