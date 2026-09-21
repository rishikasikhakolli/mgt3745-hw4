# Architecture

**Status:** ACTIVE in Module 3.

## The Gate: HW4 rerun
Where should entries live now that they must survive a cleared cache?

| Criterion | Weight | Build (Worker + D1) | Buy (hosted BaaS) | Delegate (AI builder hosts it) |
|---|---|---|---|---|
| Cost to start | 5 | 5 | 4 | 5 |
| Cost to maintain | 4 | 5 | 2 | 5 |
| Time to working | 4 | 4 | 4 | 5 |
| Inspectability | 5 | 5 | 1 | 2 |
| Switching cost | 3 | 4 | 2 | 3 |
| Fit to spec | 4 | 5 | 3 | 3 |
| **Weighted total** | | **118** | **70** | **88** |

## ADR-002: Entries move from localStorage to Cloudflare D1

**Status:** Proposed
**Supersedes:** ADR-001

### Context
Data that leaves the browser includes the contents of the review submission, timestamp, and metadata. The vendor is Cloudfare, Inc. It would be under Cloudfare's terms for serverless execution and storage. I am responsible for data governance and making sure data is validated and secure.

### Decision
Move the text review entry storage from 'localStorage' to a backend API in Cloudflare. The interactions henceforth would occur via HTTP endpoints and parameterized statements to prevent vulnerabilities.

### Alternatives considered
* **Buy (hosted BaaS):** Offer fast backend setup, they introduce obscure database internals and create vendor lock-in with complex export workflows.
* **Delegate (AI builder hosts it):** Autonomous AI app generators (e.g., bolt.new) can rapidly provision hosted backends, but conceal architecture routing and security controls, making code verification impossible and leaving the project vulnerable to unvetted third-party service dependencies.

### Consequences
* Entries now persist across cache clears, private browsing sessions, and multiple devices.
* API code and database query execution are fully inspectable, tested, and guarded against SQL injection using parameterized `bind()` inputs.
* **What got harder:** Network reliance and offline availability. Reviews can no longer be submitted or retrieved if the user loses WiFi and the app now requires UI error states to handle it.
  
### Revisit trigger
Revisit this architecture if user volume exceeds Cloudflare’s free tier request limits, if structured relational SQL no longer fits review data requirements, or when multi-tenant user authentication with row-level access permissions is required[cite: 1].

## ADR-001

**Title and date:** JavaScript for Text Reviews Feature (September 15, 2026)

**Status:** Superseded by ADR-002

**Door / concrete acquisition and execution choice:** Build

**Context:** Users need to type and save text reviews for without spending money or setting up a complex backend server.

**Decision:** Build it in basic form and save the review text directly in the browser.

**Consequences and revisit trigger:** It is free and can work in the Live Server. They can only exist in the browser and cannot be shared. Revisit it to make it shareable or multi-user.

Keep superseded ADRs. The pedagogical browser build can coexist with a different architecture recommendation; explain the distinction.
