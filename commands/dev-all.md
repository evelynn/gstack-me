# /dev-all — 자동 개발 사이클 (통합 스킬 v2)

새 기능 개발의 전체 사이클을 자동으로 진행합니다.
gstack 엔지니어링 스킬 + PDCA 방법론 + 에이전트 시스템을 통합 활용하여
기획부터 배포까지 품질을 정량적으로 관리합니다.

**사용법:** `/dev-all <기능 설명>`

---

## 전체 흐름

```
Phase 0: 프로젝트 레벨 감지 + PDCA 초기화
    ↓ 자동
Phase 1: 기획 (Planning + PDCA Plan)
    ↓ 자동
Phase 2: 설계 (Design + PDCA Design)
    ↓ 사용자 확인
Phase 3: 구현 (Implementation + PDCA Do)
    ↓ 자동
Phase 4: QA 강화 루프 (Browser QA + Log QA + Gap Analysis)
    ↓ Match Rate ≥ 90% 달성 시
Phase 5: 디자인 QA 루프 (Design Review + Spec Validation)
    ↓ 이슈 0 달성 시
Phase 6: 코드 리뷰 + 수정 루프 (Review + Code Analyzer)
    ↓ 클린 시
Phase 7: 보고서 + 배포 (Report + Ship)
```

---

## Phase 0: 프로젝트 레벨 감지 + PDCA 초기화

### Step 0.1: 프로젝트 레벨 자동 감지

프로젝트 구조를 분석하여 레벨을 결정합니다:

| 감지 신호 | 레벨 | 이후 워크플로우 |
|----------|------|--------------|
| Static HTML/CSS만 있음 | **Starter** | 기획 축소, QA만 1회, 바로 배포 |
| Next.js + DB/API 패턴 | **Dynamic** | 전체 PDCA 사이클 |
| Docker + K8s + 마이크로서비스 | **Enterprise** | PM Discovery + 전체 PDCA + 보안 강화 |

### Step 0.2: PDCA 상태 초기화

```
/pdca status
```

기존 PDCA 상태가 있으면 이어서 진행, 없으면 새로 생성합니다.
기능명을 PDCA 피처명으로 등록합니다.

---

## Phase 1: 기획 (Planning)

### Step 1.1: 기능 분석

사용자가 입력한 `$ARGUMENTS`를 기능 설명으로 사용합니다.
기능 설명이 비어있으면 AskUserQuestion으로 물어봅니다.

기능의 복잡도를 판단합니다:
- **Simple**: UI 변경, 텍스트 수정, 스타일 조정 → Phase 1 축소, 바로 Phase 3
- **Medium**: 새 컴포넌트, API 연동, 폼 추가 → /office-hours + PDCA Plan
- **Complex**: 새 시스템, 아키텍처 변경, 다중 서비스 → PM Discovery + /autoplan + PDCA Plan

### Step 1.2: PM Discovery (Complex + Enterprise만)

```
/pm-discovery {feature}
```

제품 발견 → 가치 분석 → 시장 조사 → PRD 생성
출력: `docs/00-pm/{feature}.prd.md`

### Step 1.3: 브레인스토밍 (Medium/Complex)

```
/office-hours (builder 모드)
```

결과물: 초기 구상 문서

### Step 1.4: 플랜 리뷰 (Complex만)

```
/autoplan
```

CEO + Design + Eng 리뷰를 자동 실행합니다.
(autoplan에 통합된 PDCA Planning + PM팀 기능 활용)

### Step 1.5: PDCA Plan 문서 생성

```
/pdca plan {feature}
```

기획 결과를 `docs/01-plan/features/{feature}.plan.md`로 구조화합니다.
템플릿 기반: Executive Summary, Requirements, Scope, Architecture, Timeline, Risks

### Step 1.6: 기획 완료 확인

AskUserQuestion으로 물어봅니다:
- "기획이 완료되었습니다. 설계를 시작할까요?"
- Options: ["설계 시작", "기획 수정 필요", "Simple로 변경 (설계 스킵)"]

---

## Phase 2: 설계 (Design) — Medium/Complex만

### Step 2.1: PDCA Design 문서 생성

```
/pdca design {feature}
```

설계 문서를 `docs/02-design/features/{feature}.design.md`로 생성합니다:
- API Contracts (엔드포인트, 메서드, 요청/응답 스키마)
- Data Models (엔티티, 필드, 관계)
- Component Structure (컴포넌트 트리, props, state)
- Error Handling (에러 코드, 메시지, 복구 흐름)
- UI Specifications (레이아웃, 인터랙션, 반응형)

### Step 2.2: 디자인 시스템 (필요시)

새로운 UI 패턴이 필요하면:
```
/design-consultation
```
(통합된 목업 파이프라인 + 디자인 토큰 + 컴포넌트 매핑 활용)

### Step 2.3: 설계 완료 확인

AskUserQuestion:
- "설계가 완료되었습니다. 구현을 시작할까요?"
- Options: ["구현 시작", "설계 수정 필요"]

---

## Phase 3: 구현 (Implementation)

### Step 3.1: 구현 계획 수립

설계 문서를 기반으로 구현 계획을 세웁니다:
1. 필요한 파일 목록 (설계문서의 Component Structure 참조)
2. API 엔드포인트 (설계문서의 API Contracts 참조)
3. 데이터 모델 (설계문서의 Data Models 참조)
4. 구현 순서: 데이터 모델 → API → UI 컴포넌트 → 통합

### Step 3.2: 코드 구현

설계 문서를 정확히 따라 구현합니다.
각 파일 작성 후 기본적인 문법 검증을 수행합니다.
설계에서 벗어나는 부분 발견 시 → 설계 문서 먼저 업데이트

### Step 3.3: 구현 완료 확인

AskUserQuestion:
- "구현이 완료되었습니다. QA + Gap Analysis를 시작할까요?"
- Options: ["QA 시작", "추가 구현 필요"]

---

## Phase 4: QA 강화 + Gap Analysis 루프 (핵심)

이 Phase가 핵심입니다. **브라우저 QA + 로그 QA + 설계-구현 갭 분석**을 통합 실행합니다.

### 루프 설정

```
MAX_QA_ITERATIONS = 5
QA_TIER = "Exhaustive"
PASS_THRESHOLD = 95       # 헬스 스코어 95 이상
MATCH_RATE_THRESHOLD = 90  # 설계-구현 일치율 90% 이상
current_iteration = 0
```

### Step 4.1: 브라우저 QA 실행

```
/qa (Exhaustive tier)
```

QA 검사 항목:
- Critical: 크래시, 데이터 손실, 보안 취약점
- High: 기능 미동작, 잘못된 데이터 표시
- Medium: UX 문제, 성능 저하
- Cosmetic: 스타일 불일치, 오타

(/qa에 통합된 Zero Script QA 로그 분석도 함께 실행 — Dynamic/Enterprise 레벨)

### Step 4.2: Gap Analysis 실행

설계 문서가 존재하면 (Medium/Complex):
```
/pdca analyze {feature}
```

gap-detector 에이전트가 실행되어:
- 설계된 API vs 구현된 라우트 비교
- 설계된 데이터 모델 vs 실제 스키마 비교
- 설계된 컴포넌트 vs 실제 파일 비교
- 에러 처리 설계 vs 실제 구현 비교
- Match Rate 계산

### Step 4.3: 결과 평가

**통과 조건:**
- 헬스 스코어 >= 95
- Critical/High 이슈 = 0
- Medium 이슈 <= 2
- Match Rate >= 90% (설계 문서가 있는 경우)

**통과 시:** → Phase 5로 진행
**미통과 시:** → Step 4.4로

### Step 4.4: 자동 수정

**QA 버그:** /qa가 자동으로 수정 (atomic commit)
**Gap 이슈:** pdca-iterator 에이전트가 자동 수정

```
/pdca iterate {feature}
```

(설계에 맞게 코드를 자동 수정, gap-detector 재실행하여 검증)

### Step 4.5: 회귀 검증

```
current_iteration += 1

if current_iteration >= MAX_QA_ITERATIONS:
    AskUserQuestion:
    - "QA {MAX_QA_ITERATIONS}회 반복 후 상태"
    - "헬스: {health_score}, Match Rate: {match_rate}%"
    - "남은 이슈: {issue_list}"
    - Options: ["계속 진행", "수동 수정 후 재시도", "중단"]
else:
    → Step 4.1 (재실행)
```

### Step 4.6: QA + Gap Analysis 통과 리포트

```
╔══════════════════════════════════════════════════════╗
║  Phase 4 결과: QA + Gap Analysis                      ║
╠══════════════════════════════════════════════════════╣
║  QA 반복:      {current_iteration}회                   ║
║  최종 헬스:    {health_score}/100                      ║
║  수정된 버그:  {fixed_count}개                         ║
║  Match Rate:   {match_rate}%                          ║
║  갭 수정:      {gap_fixed_count}개                     ║
║  상태:         PASS ✓                                 ║
╚══════════════════════════════════════════════════════╝
```

→ Phase 5로 자동 진행

---

## Phase 5: 디자인 QA + 스펙 검증 루프

### 루프 설정

```
MAX_DESIGN_ITERATIONS = 3
current_design_iteration = 0
```

### Step 5.1: 디자인 리뷰 실행

```
/design-review
```

시각적 불일치, 간격 문제, 계층 문제, AI slop 패턴을 감지하고 수정합니다.
(통합된 설계 스펙 검증 기능도 함께 실행 — 설계문서 vs 실제 UI 비교)

### Step 5.2: 결과 평가

**통과 조건:** 디자인 이슈 = 0 (또는 minor cosmetic만 남음)

**통과 시:** → Phase 6으로 진행
**미통과 시:**

```
current_design_iteration += 1

if current_design_iteration >= MAX_DESIGN_ITERATIONS:
    AskUserQuestion:
    - "디자인 QA {MAX_DESIGN_ITERATIONS}회 반복 후에도 이슈가 남아있습니다."
    - Options: ["계속 진행", "수동 수정 후 재시도", "중단"]
else:
    → Step 5.1 (재실행)
```

### Step 5.3: 디자인 QA 통과 리포트

→ Phase 6으로 자동 진행

---

## Phase 6: 코드 리뷰 + 품질 스코어링 루프

### Step 6.1: 코드 리뷰 실행

```
/review
```

SQL 안전성, LLM 신뢰 경계, 조건부 사이드 이펙트, 보안 이슈를 검사합니다.
(통합된 code-analyzer 6차원 품질 스코어링 포함:
 Architecture 25%, Security 20%, Duplication 15%, Performance 15%, Test 15%, Convention 10%)

### Step 6.2: 보안 감사 (Enterprise 레벨 또는 인증/결제 관련)

인증, 결제, 개인정보 관련 기능이면:
```
/cso
```
(통합된 SEO + 보안 아키텍처 리뷰 포함)

### Step 6.3: 결과 평가

**통과 조건:**
- /review PASS
- Quality Score >= 80 (code-analyzer)
- Security 차원 >= 5/10

**이슈 발견 시:**
1. 각 이슈를 자동 수정
2. 수정 후 /review 재실행 (최대 3회)

### Step 6.4: 리뷰 통과 리포트

→ Phase 7으로 자동 진행

---

## Phase 7: 보고서 + 배포 (Report + Ship)

### Step 7.1: PDCA 완료 보고서 생성 (Medium/Complex)

```
/pdca report {feature}
```

report-generator 에이전트가 실행되어:
- Executive Summary (피처, 날짜, Match Rate, 파일/라인 수)
- Value Delivered 4관점 (Problem, Solution, UX Effect, Core Value)
- Phase별 요약
- Quality Metrics
- Lessons Learned

출력: `docs/04-report/{feature}.report.md`

### Step 7.2: 배포 전 최종 요약

전체 사이클 리포트를 출력합니다:

```
══════════════════════════════════════════════════════════
  Dev Cycle 완료 리포트 (통합 v2)
══════════════════════════════════════════════════════════
  기능:           {feature_description}
  프로젝트 레벨:  {Starter/Dynamic/Enterprise}
  기획 방식:      {Simple/Medium/Complex}

  Phase 1 - 기획:
    방식:         {PM Discovery / office-hours / autoplan}
    Plan 문서:    {docs/01-plan 경로 또는 N/A}

  Phase 2 - 설계:
    Design 문서:  {docs/02-design 경로 또는 N/A}
    API 계약:     {count}개 엔드포인트
    데이터 모델:  {count}개 엔티티

  Phase 4 - QA + Gap Analysis:
    QA 반복:      {qa_iterations}회
    수정 버그:    {qa_fixed}개
    최종 헬스:    {health_score}/100
    Match Rate:   {match_rate}%
    갭 수정:      {gap_fixed}개

  Phase 5 - Design QA:
    반복:         {design_iterations}회
    수정 이슈:    {design_fixed}개

  Phase 6 - Code Review:
    반복:         {review_iterations}회
    Quality Score:{quality_score}/100
    수정 이슈:    {review_fixed}개

  총 커밋:        {total_commits}개
  PDCA 보고서:    {docs/04-report 경로}
══════════════════════════════════════════════════════════
```

### Step 7.3: Ship 확인

AskUserQuestion:
- "모든 검증이 완료되었습니다. 어떻게 진행할까요?"
- Options: ["PR 생성 (/ship)", "배포까지 진행 (/ship + /land-and-deploy)", "여기서 중단"]

**"PR 생성" 선택 시:**
```
/ship
```

**"배포까지 진행" 선택 시:**
```
/ship
→ 완료 후 자동으로:
/land-and-deploy
→ 완료 후 자동으로:
/canary (5분 모니터링)
→ 이상 없으면:
/document-release
```
(ship, land-and-deploy에 통합된 레벨별 배포 전략 자동 적용)

---

## 레벨별 Phase 자동 조정

| Phase | Starter | Dynamic | Enterprise |
|:-----:|:-------:|:-------:|:----------:|
| 0: 레벨감지 | O | O | O |
| 1: 기획 | 축소 (Simple) | /office-hours + PDCA | PM Discovery + /autoplan + PDCA |
| 2: 설계 | 스킵 | PDCA Design | PDCA Design + /design-consultation |
| 3: 구현 | O | O | O |
| 4: QA + Gap | QA 1회만 | QA 루프 + Gap Analysis | QA 루프 + Gap + Log QA |
| 5: Design QA | 스킵 | /design-review | /design-review + Spec Validation |
| 6: 리뷰 | /review 1회 | /review 루프 | /review + /cso + Quality Score |
| 7: 보고서+배포 | /ship만 | PDCA Report + /ship | Report + /ship + /canary + /document-release |

---

## 중단 및 재개

어떤 Phase에서든 사용자가 "중단"을 선택하면:
1. 현재까지의 진행 상황을 리포트
2. PDCA 상태를 `.gstack/pdca-status.json`에 저장
3. 어디서 중단했는지 기록
4. "다음에 `/dev-all continue`로 재개할 수 있습니다" 안내

재개 시:
```
/pdca status  # 현재 상태 확인
→ 마지막 Phase부터 이어서 진행
```

---

## 설정 오버라이드

사용자가 특정 Phase를 스킵하거나 설정을 변경하고 싶을 때:

```
/dev-all <기능> --skip-planning      # Phase 1 스킵
/dev-all <기능> --skip-design        # Phase 2 스킵
/dev-all <기능> --skip-design-qa     # Phase 5 스킵
/dev-all <기능> --skip-gap-analysis  # Gap Analysis 스킵 (QA만 실행)
/dev-all <기능> --qa-tier standard   # QA 티어 변경 (Quick/Standard/Exhaustive)
/dev-all <기능> --max-qa-loops 10    # QA 최대 반복 횟수 변경
/dev-all <기능> --auto-ship          # Phase 7에서 확인 없이 자동 ship
/dev-all <기능> --level starter      # 레벨 강제 지정
/dev-all <기능> --no-pdca            # PDCA 문서 생성 스킵 (gstack만 사용)
```

---

## 통합 스킬 활용 맵

```
Phase 0: /pdca status
Phase 1: /pm-discovery → /office-hours → /autoplan → /pdca plan
Phase 2: /pdca design → /design-consultation
Phase 3: (구현)
Phase 4: /qa + /pdca analyze + /pdca iterate
Phase 5: /design-review (+ Spec Validation)
Phase 6: /review (+ Code Analyzer) + /cso
Phase 7: /pdca report → /ship → /land-and-deploy → /canary → /document-release
```

**활용 에이전트:**
- gap-detector: Phase 4 (설계-구현 갭 분석)
- pdca-iterator: Phase 4 (자동 수정)
- code-analyzer: Phase 6 (품질 스코어링)
- report-generator: Phase 7 (완료 보고서)
- security-architect: Phase 6 (보안 감사, Enterprise)
