# gstack-me

**gstack + PDCA = 완전 자동화된 AI 개발 팩토리**

gstack의 28개 엔지니어링 스킬(브라우저 QA, 코드 리뷰, 보안 감사, 배포 자동화)과
PDCA 방법론(설계 기반 개발, 갭 분석, 자동 반복 개선, 14개 AI 에이전트)을 융합한 통합 개발 시스템.

> 원본 [gstack](https://github.com/garrytan/gstack) by Garry Tan (YC President)의 포크.
> bkit vibecoding framework의 PDCA 방법론, 에이전트 시스템, 개발 파이프라인을 통합.

---

## 핵심 차별점: gstack vs gstack-me

| | gstack (원본) | gstack-me (통합) |
|---|---|---|
| **스킬 수** | 28개 | 31개 (+3 신규) |
| **에이전트** | 없음 | 14개 AI 에이전트 |
| **개발 방법론** | 스프린트 기반 | PDCA 사이클 (설계 &rarr; 구현 &rarr; 검증 &rarr; 개선) |
| **품질 지표** | 헬스 스코어 | 헬스 + Match Rate + Quality Score |
| **설계 문서** | 수동 | 자동 생성 + 구현 대비 검증 |
| **QA 방식** | 브라우저 QA | 브라우저 + 로그 QA + Gap Analysis |
| **자동화 레벨** | 스킬별 독립 | `/dev-all` 원커맨드 전체 사이클 |
| **프로젝트 적응** | 일률적 | Starter/Dynamic/Enterprise 자동 조정 |

---

## Quick Start

### 방법 1: `/dev-all` &mdash; 원커맨드 전체 사이클

```
/dev-all 사용자 인증 시스템
```

레벨 감지 &rarr; 기획 &rarr; 설계 &rarr; 구현 &rarr; QA + Gap Analysis &rarr; 디자인 QA &rarr; 코드 리뷰 &rarr; 보고서 + 배포까지 자동 진행.

### 방법 2: 스킬 개별 사용

```
/office-hours           — 제품 아이디어 브레인스토밍
/pdca plan my-feature   — 구조화된 기획 문서 생성
/pdca design my-feature — API 계약, 데이터 모델, 컴포넌트 설계
(구현)
/pdca analyze my-feature— 설계 vs 구현 갭 분석 (Match Rate 산출)
/pdca iterate my-feature— 갭 자동 수정 (90% 이상까지 반복)
/review                 — 코드 리뷰 + 품질 스코어링
/qa                     — 브라우저 QA + 로그 QA
/ship                   — PR 생성 + 배포
/pdca report my-feature — 완료 보고서 생성
```

---

## 설치

**요구사항:** [Claude Code](https://docs.anthropic.com/en/docs/claude-code), [Git](https://git-scm.com/), [Bun](https://bun.sh/) v1.0+, [Node.js](https://nodejs.org/) (Windows만)

### 머신에 설치 (30초)

Claude Code에서 이 메시지를 붙여넣으세요:

> Install gstack-me: run **`git clone https://github.com/evelynn/gstack-me.git ~/.claude/skills/gstack && cd ~/.claude/skills/gstack && ./setup`** then add a "gstack" section to CLAUDE.md listing available skills.

### 프로젝트에 추가 (팀 공유용)

```bash
cp -Rf ~/.claude/skills/gstack .claude/skills/gstack
rm -rf .claude/skills/gstack/.git
cd .claude/skills/gstack && ./setup
```

---

## 전체 스킬 맵 (31개 + /dev-all)

### PDCA + Pipeline (신규 통합)

| 스킬 | 역할 |
|------|------|
| `/pdca` | PDCA 사이클 통합 관리 (plan/design/do/analyze/iterate/report/status/next) |
| `/pipeline` | 9단계 개발 파이프라인 가이드 (스키마 &rarr; 배포) |
| `/pm-discovery` | PM 에이전트 팀 &mdash; 제품 발견, 시장 조사, PRD 생성 |
| `/dev-all` | 원커맨드 전체 사이클 자동화 (기획 &rarr; 배포) |

### 기획 & 리뷰 (Plan)

| 스킬 | 역할 | 통합 강화 |
|------|------|----------|
| `/office-hours` | YC 스타일 브레인스토밍 | |
| `/plan-ceo-review` | CEO 관점 리뷰 | |
| `/plan-eng-review` | 엔지니어링 관점 리뷰 | |
| `/plan-design-review` | 디자인 관점 리뷰 | |
| `/autoplan` | 3관점 리뷰 자동 파이프라인 | + PDCA Plan + PM팀 통합 |

### 설계 & 디자인 (Design)

| 스킬 | 역할 | 통합 강화 |
|------|------|----------|
| `/design-consultation` | 디자인 시스템 구축 | + 목업 파이프라인 + 디자인 토큰 |
| `/design-review` | 시각 QA + 수정 루프 | + 설계 스펙 검증 (Match Rate) |

### 구현 & 디버깅 (Do)

| 스킬 | 역할 | 통합 강화 |
|------|------|----------|
| `/review` | PR 코드 리뷰 | + 6차원 품질 스코어링 + 설계 갭 체크 |
| `/investigate` | 체계적 디버깅 | + 설계-구현 갭 인식 |
| `/codex` | OpenAI Codex 독립 리뷰 | |

### QA & 검증 (Check)

| 스킬 | 역할 | 통합 강화 |
|------|------|----------|
| `/qa` | 브라우저 QA + 버그 수정 | + Zero Script 로그 QA |
| `/qa-only` | QA 리포트만 | + Zero Script 로그 QA |
| `/cso` | 보안 감사 (OWASP/STRIDE) | + SEO + 보안 아키텍처 리뷰 |
| `/benchmark` | 성능 회귀 감지 | |

### 배포 & 모니터링 (Ship)

| 스킬 | 역할 | 통합 강화 |
|------|------|----------|
| `/ship` | 테스트 &rarr; 리뷰 &rarr; PR | + 레벨별 배포 전략 |
| `/land-and-deploy` | PR 머지 &rarr; 배포 &rarr; 검증 | + 레벨별 배포 전략 |
| `/canary` | 배포 후 모니터링 | |
| `/document-release` | 배포 후 문서 업데이트 | + PDCA 완료 보고서 |

### 브라우저 & 도구

| 스킬 | 역할 |
|------|------|
| `/browse` | 헤드리스 Chromium (~100ms/커맨드, 50+ 명령어) |
| `/connect-chrome` | 실제 Chrome 연결 (Side Panel 라이브 피드) |
| `/setup-browser-cookies` | 브라우저 쿠키 가져오기 |
| `/setup-deploy` | 배포 플랫폼 설정 |
| `/retro` | 주간 회고 (인당 기여도, 코드 품질 트렌드) |

### 안전 장치

| 스킬 | 역할 |
|------|------|
| `/careful` | 파괴적 명령어 경고 (rm -rf, DROP TABLE, force-push) |
| `/freeze` | 디렉토리 편집 잠금 |
| `/guard` | careful + freeze 동시 활성화 |
| `/unfreeze` | 편집 잠금 해제 |
| `/gstack-upgrade` | 업그레이드 |

---

## AI 에이전트 시스템 (14개)

PDCA 각 단계에서 자동 작동하는 전문 에이전트:

| 에이전트 | 모델 | 단계 | 역할 |
|---------|:----:|------|------|
| `gap-detector` | opus | Check | 설계 vs 코드 비교, Match Rate 산출 |
| `code-analyzer` | opus | Check | 6차원 코드 품질 스코어링 |
| `pdca-iterator` | sonnet | Act | 설계 갭 자동 수정 (최대 5회) |
| `report-generator` | haiku | Report | 완료 보고서 생성 |
| `cto-lead` | opus | 전체 | 팀 오케스트레이션, 단계 진행 결정 |
| `product-manager` | sonnet | Plan | 요구사항 분석, Plan 문서 생성 |
| `frontend-architect` | sonnet | Design/Do | UI 아키텍처, 컴포넌트 설계 |
| `security-architect` | opus | Design/Check | 보안 리뷰, OWASP 컴플라이언스 |
| `enterprise-expert` | opus | Design | 마이크로서비스, 확장성 아키텍처 |
| `infra-architect` | sonnet | Design | AWS/K8s/Terraform 인프라 |
| `design-validator` | sonnet | Design | 설계 문서 완전성 검증 |
| `qa-strategist` | sonnet | Check | 테스트 전략 수립 |
| `pm-lead` | opus | PM | PM Discovery 오케스트레이션 |
| `starter-guide` | haiku | 전체 | 초보자 가이드 |

---

## PDCA 워크플로우

```
[PM Discovery] -> [Plan + Review] -> [Design] -> [Do] -> [Check] -> [Act] -> [Report]
      |                |                |          |        |         |         |
  /pm-discovery    /autoplan       /design-*    /ship    /qa       /pdca     /document-
                   /plan-*-review              /review  /cso      iterate    release
                                               /browse  /benchmark
                                                        /pdca analyze
```

### Match Rate: 설계-구현 일치율

PDCA의 핵심 지표. gap-detector가 설계 문서의 모든 항목을 코드와 대조하여 산출:

```
Match Rate = (구현 항목 + 부분 구현*0.5) / 전체 설계 항목 * 100

>= 90%  ->  Report 단계로 진행
70-89%  ->  수동/자동 수정 선택
< 70%   ->  설계 문서 재검토 필요
```

### 프로젝트 레벨 자동 감지

| 감지 신호 | 레벨 | PDCA 깊이 | 배포 전략 |
|----------|------|----------|----------|
| 정적 HTML/CSS | **Starter** | Plan &rarr; Do &rarr; Report | GitHub Pages / Netlify |
| Next.js + DB/API | **Dynamic** | 전체 PDCA | Vercel / Railway |
| Docker + K8s | **Enterprise** | PM + 전체 PDCA + 보안 | CI/CD + 카나리 |

---

## `/dev-all` &mdash; 원커맨드 전체 사이클

```
/dev-all <기능 설명>
```

8단계 자동 진행:

| Phase | 내용 | 활용 스킬 |
|:-----:|------|----------|
| 0 | 레벨 감지 + PDCA 초기화 | `/pdca status` |
| 1 | 기획 | `/pm-discovery` &rarr; `/office-hours` &rarr; `/autoplan` &rarr; `/pdca plan` |
| 2 | 설계 | `/pdca design` &rarr; `/design-consultation` |
| 3 | 구현 | 설계 문서 기반 코딩 |
| 4 | QA + Gap Analysis | `/qa` + `/pdca analyze` + `/pdca iterate` (90%까지) |
| 5 | 디자인 QA | `/design-review` (+ 스펙 검증) |
| 6 | 코드 리뷰 | `/review` (+ Quality Score) + `/cso` |
| 7 | 배포 | `/pdca report` &rarr; `/ship` &rarr; `/land-and-deploy` &rarr; `/canary` |

레벨별 자동 조정:

| Phase | Starter | Dynamic | Enterprise |
|:-----:|:-------:|:-------:|:----------:|
| 기획 | 축소 | office-hours + PDCA | PM Discovery + autoplan |
| 설계 | 스킵 | PDCA Design | Design + consultation |
| QA | 1회 | QA 루프 + Gap | QA + Gap + Log QA |
| 리뷰 | 1회 | review 루프 | review + cso + Quality |
| 배포 | ship만 | Report + ship | Report + ship + canary |

---

## PDCA 문서 구조

```
docs/
├── 00-pm/           ← PM Discovery PRD
├── 01-plan/         ← Plan 문서
│   └── features/
├── 02-design/       ← Design 사양서
│   └── features/
├── 03-analysis/     ← Gap Analysis 보고서
└── 04-report/       ← 완료 보고서
```

### 템플릿 (`templates/`)

| 템플릿 | 용도 |
|--------|------|
| `pdca/plan.template.md` | 요구사항, 범위, 아키텍처, 리스크 |
| `pdca/design.template.md` | API 계약, 데이터 모델, 컴포넌트, UI 스펙 |
| `pdca/analysis.template.md` | Match Rate, 갭 분류, 추천 |
| `pdca/report.template.md` | Executive Summary, 4관점 가치, 교훈 |
| `shared/naming-conventions.md` | 파일, 변수, DB, API 네이밍 |
| `shared/error-handling-patterns.md` | 에러 응답, HTTP 상태 코드, 검증 |

---

## 브라우저 자동화

gstack의 전체 브라우저 자동화 기능 포함:

- **`/browse`** &mdash; 헤드리스 Chromium, 50+ 명령어, ~100ms/커맨드
- **`$B connect`** &mdash; 실제 Chrome 연결 + Side Panel 라이브 피드
- **`$B handoff`** / **`$B resume`** &mdash; CAPTCHA/MFA 해결 후 이어서
- **Sidebar Agent** &mdash; Side Panel에서 자연어 브라우저 조작
- **`/setup-browser-cookies`** &mdash; 인증 페이지 테스트용 쿠키 가져오기

---

## 빌드 명령

```bash
bun install              # 의존성 설치
bun test                 # 테스트 (무료, <5초)
bun run build            # 문서 생성 + 바이너리 컴파일
bun run gen:skill-docs   # SKILL.md 템플릿에서 재생성
bun run skill:check      # 전체 스킬 헬스 대시보드
```

---

## 트러블슈팅

- **스킬 안 보임?** `cd ~/.claude/skills/gstack && ./setup`
- **`/browse` 실패?** `cd ~/.claude/skills/gstack && bun install && bun run build`
- **업그레이드:** `/gstack-upgrade` 또는 `~/.gstack/config.yaml`에서 `auto_upgrade: true`
- **Windows:** Git Bash/WSL 필요. Bun + Node.js 모두 PATH에 있어야 함

**CLAUDE.md에 추가:**
```
## gstack
Use /browse from gstack for all web browsing. Never use mcp__claude-in-chrome__* tools.
Available skills: /office-hours, /plan-ceo-review, /plan-eng-review, /plan-design-review,
/design-consultation, /review, /ship, /land-and-deploy, /canary, /benchmark, /browse,
/qa, /qa-only, /design-review, /setup-browser-cookies, /setup-deploy, /retro,
/investigate, /document-release, /codex, /cso, /autoplan, /careful, /freeze, /guard,
/unfreeze, /gstack-upgrade, /pdca, /pipeline, /pm-discovery, /dev-all.
```

---

## 문서

| 문서 | 내용 |
|------|------|
| [스킬 심화](docs/skills.md) | 모든 스킬의 철학, 예시, 워크플로우 |
| [빌더 철학](ETHOS.md) | Boil the Lake, Search Before Building |
| [아키텍처](ARCHITECTURE.md) | 시스템 내부 설계 |
| [브라우저 레퍼런스](BROWSER.md) | `/browse` 전체 명령어 |
| [에이전트 가이드](AGENTS.md) | 전체 스킬 + 에이전트 맵 |
| [기여 가이드](CONTRIBUTING.md) | 개발 환경, 테스트 |
| [변경 이력](CHANGELOG.md) | 버전별 변경사항 |

---

## 프라이버시 & 텔레메트리

- **기본값: 꺼짐.** 명시적 동의 없이 아무것도 전송하지 않음
- **전송 내용 (동의 시):** 스킬명, 소요 시간, 성공/실패, 버전, OS
- **전송 안 함:** 코드, 파일 경로, 레포명, 프롬프트, 사용자 콘텐츠
- **변경:** `gstack-config set telemetry off`

---

## 크레딧

- [gstack](https://github.com/garrytan/gstack) by [Garry Tan](https://x.com/garrytan) (YC President) &mdash; MIT License
- [bkit](https://github.com/popup-studio-ai/bkit-claude-code) by POPUP STUDIO &mdash; PDCA 방법론, 에이전트 시스템 &mdash; Apache-2.0

## 라이선스

MIT. 자유롭게 사용하세요.
