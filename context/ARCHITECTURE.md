# Architecture

Status: ACTIVE in Module 3.

## Gate

Name hard constraints and three concrete options. Weights and scores use 1–5; a score of 5 always means most favorable. Define 1/3/5 anchors. Multiply weights by scores and sum. Record estimates and run one sensitivity check.

| Criterion | Weight | Hand-built option | Existing-service option | AI-assisted build |
|---|---:|---:|---:|---:|
| Cost to start | 5 | 5 | 4 | 5 |
| Cost to maintain | 4 | 5 | 2 | 5 |
| Time to working | 4 | 4 | 4 | 5 |
| Inspectability | 5 | 5 | 1 | 2 |
| Switching cost | 3 | 5 | 2 | 4 |
| Fit to spec | 4 | 5 | 3 | 3 |

## ADR-001

Title and date: JavaScript for Text Reviews Feature (September 15, 2026)

Status: Accepted

Door / concrete acquisition and execution choice: Build

Context: Users need to type and save text reviews for without spending money or setting up a complex backend server.

Decision: Build it in basic form and save the review text directly in the browser.

Consequences and revisit trigger: It is free and can work in the Live Server. They can only exist in the browser and cannot be shared. Revisit it to make it shareable or multi-user.

Keep superseded ADRs. The pedagogical browser build can coexist with a different architecture recommendation; explain the distinction.
