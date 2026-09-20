# Architecture

**Status:** ACTIVE in Module 3.

## The Gate: HW4 rerun
*Name hard constraints and three concrete options. Weights and scores use 1–5; a score of 5 always means most favorable. Define 1/3/5 anchors. Multiply weights by scores and sum. Record estimates and run one sensitivity check.*
Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | 5 | 5 | 4 | 5 |
| Cost to maintain | 4 | 5 | 2 | 5 |
| Time to working | 4 | 4 | 4 | 5 |
| Inspectability | 5 | 5 | 1 | 2 |
| Switching cost | 3 | 5 (*scored from Session B experience*) | 2 | 4 |
| Fit to spec | 4 | 5 | 3 | 3 |
| **Weighted total** | | | | |

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Proposed
**Supersedes:** ADR-001

### Context
What data leaves the browser, to which vendor, under what terms, and who is accountable.

### Decision

### Alternatives considered

### Consequences
At least one thing that got harder.

### Revisit trigger

## ADR-001

**Title and date:** JavaScript for Text Reviews Feature (September 15, 2026)

**Status:** Superseded by ADR-002

**Door / concrete acquisition and execution choice:** Build

**Context:** Users need to type and save text reviews for without spending money or setting up a complex backend server.

**Decision:** Build it in basic form and save the review text directly in the browser.

Consequences and revisit trigger: It is free and can work in the Live Server. They can only exist in the browser and cannot be shared. Revisit it to make it shareable or multi-user.

Keep superseded ADRs. The pedagogical browser build can coexist with a different architecture recommendation; explain the distinction.
