---
name: pipeline
version: 1.0.0
description: |
  9-phase Development Pipeline guide. Step-by-step from schema to deployment.
  Each phase runs an internal PDCA mini-cycle.
user-invocable: true
allowed-tools:
  - Read
  - Glob
  - Grep
  - AskUserQuestion
---

# Development Pipeline — 9-Phase Guide

## Usage
```
/pipeline start {level}    — Initialize pipeline
/pipeline next             — Guide to next phase
/pipeline status           — Show progress
/pipeline phase {N}        — Jump to phase details
```

## Phases
```
1:Schema → 2:Convention → 3:Mockup → 4:API → 5:Design System
→ 6:UI Integration → 7:SEO/Security → 8:Review → 9:Deployment
```

### Phase 1: Schema — Define domain entities, relationships, data types
### Phase 2: Convention — Coding standards, linting, git workflow
### Phase 3: Mockup — HTML/CSS/JS prototypes, gstack: `/design-consultation`, `/browse`
### Phase 4: API — REST/GraphQL design, implementation, testing
### Phase 5: Design System — Tokens, core components, composite components
### Phase 6: UI Integration — Connect frontend to backend APIs
### Phase 7: SEO/Security — Meta tags, security headers, gstack: `/cso`
### Phase 8: Review — Code review + gap analysis, gstack: `/review`, `/pdca analyze`
### Phase 9: Deployment — CI/CD, staging, production, gstack: `/ship`, `/canary`

## Level-Based Flow
- **Starter**: Phase 1 → 2 → 3 → 6 → 9
- **Dynamic**: All 9 phases
- **Enterprise**: PM Discovery + All 9 phases + security emphasis

## Status Tracking
In `.gstack/pdca-status.json` under `pipeline` key.
