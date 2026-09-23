# STANDARDS.md

Coding and documentation rules, for humans. Restated for agents in CLAUDE.md.
Copy in from HW3; the HW4 rows are added for you.

## Rules

1. Use descriptive camelCase identifiers. Short conventional event/index names are acceptable when their role is obvious; arbitrary minimum name lengths are unnecessary.
2. Separate HTML, CSS, and JavaScript into index.html, styles.css, and app.js. Use lexical scope; do not create accidental global variables.
3. Explain important reasons in comments, not a narration of every statement. Remove temporary debug output before submission.
4. Write commit messages that name the changed behavior and purpose.
5. Use textContent for user text. Never insert user strings through innerHTML.
6. Associate form controls with labels and make success/error feedback perceivable. Preserve unsaved input when a write fails.
7. Separation of concerns: HTML for structure, CSS for presentation, JS for behavior and data.
8. User input reaches the page through `textContent`, never `innerHTML`.
9. **(HW4)** User values reach SQL through `bind()`, never string concatenation.
10. **(HW4)** No credential in the repository. Not in code, not in config, not in a context file. Database ids are addresses and may appear in `wrangler.toml`.
11. **(HW4)** A failed request is shown to the user on the page and is never thrown in the console.
12. No stray `console.log` in committed code.

## Naming

* camelCase for JavaScript variables and functions
* Kebab-case for HTML element ids, CSS classes, files
* UPPER_SNAKE_CASE for constants

## Documentation

Comments explain why, not what the code already shows. Keep comments that record a scope boundary or a past decision (e.g. schema.sql's note that a second table is future scope) instead of deleting them. Update README.md with each tag.
