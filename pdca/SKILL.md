---
name: pdca
version: 1.0.0
description: |
  Unified PDCA (Plan-Design-Do-Check-Act) cycle management.
  Orchestrates document-driven development with automatic phase progression,
  gap analysis, and iterative improvement loops.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - Bash
  - Agent
  - AskUserQuestion
---

# PDCA — Plan-Design-Do-Check-Act Cycle Manager

## Overview
PDCA is a document-driven development methodology ensuring every feature goes through structured planning, design, implementation, verification, and improvement phases.

## Usage
```
/pdca plan {feature}      — Create/update plan document
/pdca design {feature}    — Create/update design document
/pdca do {feature}        — Start implementation phase
/pdca analyze {feature}   — Run gap analysis (design vs implementation)
/pdca iterate {feature}   — Auto-fix gaps found in analysis
/pdca report {feature}    — Generate completion report
/pdca status              — Show current PDCA status
/pdca next                — Suggest next action based on current phase
```

## PDCA Phases

```
[Plan] → [Design] → [Do] → [Check] → [Act] → [Report]
                              │         │
                              │         └─ if <90% iterate
                              └─ gap analysis
```

### Phase 1: Plan
**Output:** `docs/01-plan/features/{feature}.plan.md`
Required: Executive Summary, Requirements, Scope, Architecture, Timeline, Risks
**gstack:** Use `/autoplan` for 3-perspective review, `/office-hours` for brainstorming

### Phase 2: Design
**Output:** `docs/02-design/features/{feature}.design.md`
Required: API Contracts, Data Models, Component Structure, Error Handling, UI Specs
**gstack:** Use `/design-consultation`, `/plan-design-review`

### Phase 3: Do (Implementation)
Follow design exactly. Commit frequently. If design gaps found → update design first.
**gstack:** Use `/ship`, `/review`, `/careful`, `/guard`

### Phase 4: Check (Gap Analysis)
**Output:** `docs/03-analysis/{feature}.gap-analysis.md`
Compare design vs implementation point-by-point. Calculate Match Rate.
**gstack:** Use `/qa`, `/browse`, `/benchmark`, `/cso`

### Phase 5: Act (Iteration)
Loop: Fix gaps → re-analyze → if >= 90% proceed, else repeat (max 5 iterations)

### Phase 6: Report
**Output:** `docs/04-report/{feature}.report.md`
Executive Summary, Value Delivered, Phase Summary, Quality Metrics, Lessons Learned
**gstack:** Use `/document-release`, `/retro`

## Project Level Detection
| Signal | Level | PDCA Depth |
|--------|-------|-----------|
| Static HTML/CSS | Starter | Plan → Do → Report |
| Next.js + DB/API | Dynamic | Full PDCA cycle |
| Microservices + K8s | Enterprise | Full + PM + Security |

## State Management
Tracked in `.gstack/pdca-status.json`

## Integration Map
```
/office-hours       → Pre-Plan brainstorming
/autoplan           → Plan phase review
/design-consultation→ Design phase
/review             → Do phase code review
/qa, /qa-only       → Check phase visual
/cso                → Check phase security
/benchmark          → Check phase performance
/investigate        → Check phase debugging
/ship               → Do→Check transition
/land-and-deploy    → Post-Check deployment
/canary             → Post-deploy monitoring
/document-release   → Report phase
/retro              → Post-Report retrospective
```
