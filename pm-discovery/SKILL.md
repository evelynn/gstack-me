---
name: pm-discovery
version: 1.0.0
description: |
  PM Agent Team for product discovery, strategy analysis,
  and PRD generation before PDCA Plan phase.
user-invocable: true
allowed-tools:
  - Read
  - Write
  - Edit
  - Glob
  - Grep
  - WebSearch
  - WebFetch
  - AskUserQuestion
---

# PM Discovery — Product Management Agent Team

## Usage
```
/pm-discovery {product}         — Full PM pipeline
/pm-discovery research {topic}  — Market research only
/pm-discovery strategy {product}— Value proposition + Lean Canvas
/pm-discovery prd {feature}     — Generate PRD from analysis
```

## Discovery Pipeline
```
User Input → [Discovery(OST)] + [Strategy(JTBD+Canvas)] + [Research(Personas+Competitors)]
         → [PRD Synthesis + Beachhead + GTM]
         → docs/00-pm/{feature}.prd.md
```

## 8 Analysis Frameworks
1. **Opportunity Discovery** (Teresa Torres OST)
2. **Value Proposition** (JTBD 6-Part)
3. **Lean Canvas** (Business model hypothesis)
4. **User Personas** (2-3 detailed profiles)
5. **Competitor Analysis** (Strengths/Weaknesses/Differentiators)
6. **Market Sizing** (TAM/SAM/SOM)
7. **Beachhead Segment** (First market to win)
8. **GTM Strategy** (Channel, message, pricing, launch)

## PRD Output: `docs/00-pm/{feature}.prd.md`
8 sections: Executive Summary, Problem, Solution, Target Users,
Requirements, Competitive Landscape, Success Metrics, Go-to-Market

## Integration
- PRD feeds into `/pdca plan {feature}`
- `/office-hours` for early brainstorming
- `/browse` for competitor analysis
