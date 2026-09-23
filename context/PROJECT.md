# PROJECT.md

Your HW1 problem framing, graduated to its permanent home. Copy it in from HW3.

## Problem statement

Traveling is one of people's most beloved hobbies, and is a time where they are constantly taking pictures to share with the world. However, in this day and age, social media is more judgemental of the content you post. Certain platforms are too formal, while others are too serious. For example, I take trips often and love sharing about them with my friends on social and text, but I never get to simply put my thoughts out there in a quick way and often forget details since they were never recorded.

## Who it is for

* **Primary:** casual travelers who want a low-pressure way to share trip highlights with friends without frequent public posting. 
* **Secondary:** active social media users who want an aesthetic, in-depth alternative to typical short-form travel content.
  
*Details in [USERS.md](USERS.md).*

## Scope

*In: ... Out: ... Deferred: ...*
* **In:** photo + text reviews that can be saved and listed, with review text now persisted server-side via Cloudflare 
* **Out:** trip booking and in-app chat (explicit non-goals)
* **Deferred:** category-based ranking, city ranking/map, "Traveled with" tagging, and shareable links (not built yet), multi-user concurrent-write handling

*Full scope and acceptance criteria in [FEATURES.md](FEATURES.md).*

## Constraints

The platform is built and run in GitHub Codespaces. It has been deployed on Cloudflare (compute) and D1 (storage). Currently, anyone with the URL can read and write entries. The Trust Boundary crossings now recorded in [TOOLS.md](TOOLS.md).
