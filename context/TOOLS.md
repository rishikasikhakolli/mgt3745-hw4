# TOOLS.md

The ledger of Trust Boundary crossings. One row per external service this
repository depends on. Read by the agent on every task, so keep it short: a
service not in use does not belong here.

Never put a credential in this file. A key, token, or password anywhere in
the repository is graded as a security failure regardless of the rest.

Each crossing statement answers three questions in one first-person sentence:
what crosses, to whom, and who is accountable.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| Cloudflare Workers + D1 | Every entry a user types; request metadata (IP, timestamp) that Cloudflare logs by default | Cloudflare dashboard login; wrangler token inside the Codespace | "User entries leave the browser and are stored on D1 under Cloudflare's free-tier terms, in a region I did not choose. I am accountable." | Medium: `wrangler d1 export`, rewrite one Worker for another host |
| GitHub + Codespaces | Source, commit history, devcontainer | GitHub account (SSO) | My source code, commit history, and devcontainer configuration leave my machine and live on GitHub's infrastructure under their terms of service. I am accountable for the committed data. | Low: can clone to another host, portable |
| GitHub Copilot | Everything in the repository, as context for suggestions | GitHub account | Every file I have open, including this repository's content, crosses to GitHub's Copilot backend as context for generating suggestions; I am accountable for reviewing the AI before I accept it. | Low: Disable the extension |
| wrangler (npm) | Filesystem and terminal access when run, project files (wrangler.toml, worker.js, schema.sql) | none, but it holds the Clouflare login token above | Running 'npx wrangler' trusts that wrangler and its dependencies are safe. I am accountable for reviewing updates before installing them. | Medium: deploy manually through the Cloudflare dashboard |

## Revisit triggers

- A new service is added to the repository.
- A vendor changes pricing, terms, or region.
- A credential moves.
