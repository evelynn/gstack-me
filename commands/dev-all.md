# /dev-all — 자동 개발 사이클 (통합 스킬 v2)

기획부터 배포까지 전체 사이클을 자동 실행합니다.

**사용법:** `/dev-all <기능 설명>`

---

## 전체 흐름

```
Phase 0: 프로젝트 레벨 감지
Phase 1: 기획 (Planning + PDCA Plan)
Phase 2: 설계 (Design + PDCA Design)
Phase 3: 구현 (Implementation)
Phase 4: QA + Gap Analysis 루프
Phase 5: 디자인 QA 루프
Phase 6: 코드 리뷰 루프
Phase 7: 배포
```

---

## Phase 0: 프로젝트 레벨 감지

프로젝트 구조를 분석하여 레벨을 결정:

| 감지 신호 | 레벨 | 워크플로우 |
|----------|------|----------|
| Static HTML/CSS | **Starter** | 기획 축소, QA 1회, 바로 배포 |
| Next.js + DB/API | **Dynamic** | 전체 PDCA 사이클 |
| Docker + K8s | **Enterprise** | PM Discovery + 전체 PDCA + 보안 강화 |

---

## Phase 1: 기획

사용자 입력 `$ARGUMENTS`를 기능 설명으로 사용. 비어있으면 AskUserQuestion.

복잡도 판단:
- **Simple**: UI 변경, 스타일 조정 → Phase 2 스킵, 바로 Phase 3
- **Medium**: 새 컴포넌트, API 연동 → `/office-hours` + `/pdca plan`
- **Complex**: 아키텍처 변경, 다중 서비스 → `/pm-discovery` + `/autoplan` + `/pdca plan`

### 실행 순서
1. `/pm-discovery {feature}` (Complex + Enterprise만)
2. `/office-hours` builder 모드 (Medium/Complex)
3. `/autoplan` CEO + Design + Eng 리뷰 (Complex만)
4. `/pdca plan {feature}` → `docs/01-plan/features/{feature}.plan.md`

AskUserQuestion: "기획 완료. 설계 시작?" → ["시작", "수정 필요", "Simple로 변경"]

---

## Phase 2: 설계 (Medium/Complex만)

1. `/pdca design {feature}` → `docs/02-design/features/{feature}.design.md`
   - API Contracts, Data Models, Component Structure, Error Handling, UI Specs
2. `/design-consultation` (새 UI 패턴 필요시)

AskUserQuestion: "설계 완료. 구현 시작?" → ["시작", "수정 필요"]

---

## Phase 3: 구현

설계 문서 기반 구현:
1. 구현 순서: 데이터 모델 → API → UI 컴포넌트 → 통합
2. 설계에서 벗어나면 → 설계 문서 먼저 업데이트
3. 각 파일 작성 후 문법 검증

AskUserQuestion: "구현 완료. QA 시작?" → ["시작", "추가 구현"]

---

## Phase 4: QA + Gap Analysis 루프 (핵심)

```
MAX_QA_ITERATIONS = 5
PASS: 헬스 >= 95, Critical/High = 0, Match Rate >= 90%
```

### 루프
1. `/qa` Exhaustive tier (브라우저 QA + 로그 QA + 콘솔/네트워크 감시)
2. 각 수정마다 **브라우저 재검증**: 수정 → 2초 대기 → `$B goto` → `$B console --errors` → 동작 재실행 → 결과 확인
3. 시각 QA 통과 후 **인터랙션 플로우 테스트**: 핵심 유저 플로우를 실제 클릭/입력으로 실행
4. `/pdca analyze {feature}` (설계 문서 있으면 gap-detector 실행)
5. 통과 조건: 헬스 >= 95, Critical/High = 0, Match Rate >= 90%, 콘솔 에러 = 0, 플로우 FAIL = 0
6. 미통과 → 수정 + 재검증. 같은 버그 2회 실패 → **runtime-debugger** 전략 (상태 주입 검사, 데이터 흐름 추적)
7. `/pdca iterate {feature}` 갭 수정
8. 반복 (최대 5회)
9. 5회 초과 → AskUserQuestion: ["계속", "수동 수정", "중단"]

---

## Phase 5: 디자인 QA 루프

```
MAX_DESIGN_ITERATIONS = 3
```

1. `/design-review` (시각 불일치 + 스펙 검증)
2. 이슈 0이면 통과, 아니면 수정 후 재실행
3. 3회 초과 → AskUserQuestion: ["계속", "수동 수정", "중단"]

---

## Phase 6: 코드 리뷰 루프

1. `/review` (SQL 안전성, 보안, code-analyzer 품질 스코어링)
2. `/cso` (Enterprise 또는 인증/결제 관련)
3. 이슈 자동 수정 → 재실행 (최대 3회)

---

## Phase 7: 배포

1. `/pdca report {feature}` → `docs/04-report/{feature}.report.md` (Medium/Complex)
2. AskUserQuestion: ["PR 생성", "배포까지 진행", "중단"]

**PR 생성:** `/ship`

**배포까지:**
```
/ship → /land-and-deploy → /canary (5분) → /document-release
```

---

## 레벨별 Phase 자동 조정

| Phase | Starter | Dynamic | Enterprise |
|:-----:|:-------:|:-------:|:----------:|
| 기획 | 축소 | office-hours + PDCA | PM Discovery + autoplan |
| 설계 | 스킵 | PDCA Design | Design + consultation |
| QA | 1회 | QA 루프 + Gap | QA + Gap + Log QA |
| 리뷰 | 1회 | review 루프 | review + cso |
| 배포 | ship만 | report + ship | report + ship + canary |

---

## 설정 오버라이드

```
/dev-all <기능> --skip-planning      # Phase 1 스킵
/dev-all <기능> --skip-design        # Phase 2 스킵
/dev-all <기능> --skip-design-qa     # Phase 5 스킵
/dev-all <기능> --skip-gap-analysis  # Gap Analysis 스킵
/dev-all <기능> --qa-tier standard   # QA 티어 변경
/dev-all <기능> --max-qa-loops 10    # QA 최대 반복 변경
/dev-all <기능> --auto-ship          # 확인 없이 자동 ship
/dev-all <기능> --level starter      # 레벨 강제 지정
/dev-all <기능> --no-pdca            # PDCA 문서 생성 스킵
```
