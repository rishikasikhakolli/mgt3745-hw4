# FEATURES.md

## Kano Hypotheses
| Feature ID | Feature | Kano hypothesis | Segment / date | Evidence and reasoning |
|---|---|---|---|---|
| F-01 | Category-Based Ranking | Must-be | 01, 02 | Main app usage, people can rank things they've done |
| F-02 | Text Reviews | Must-be | 01, 02 | Main app usage, people want to share their thoughts on events |
| F-03 | Upload/Sharing | Performance | 01 | Sharing with friends over text |
| F-04 | "Traveled with" | Attractive | 01, 02 | Can coincide their updates with their friends that they travel with |
| F-05 | Activity Feed | Indifferent | 02 | Can appeal to the social and friend sharing aspect, but not to make that a priority in the app |
| F-06 | In-App Photo Editing | Indifferent | 01, 02 | Neither expressed a desire for it, but common for many social-related apps |

## Verification

| Criterion | Steps and input | Expected result | Observed result | Status | Evidence / commit |
|---|---|---|---|---|---|
| Your selected ID | Reproducible procedure | Before running | Actual observation | PASS / FAIL / CANNOT TEST / DEFERRED | Link |
| **EARS-1** | Submit a review with spot name "Eiffel Tower", an attached photo, and review text "Great view of city from top". | Review renders with spot title, uploaded photo, and review text together in the saved reviews list. | Review card rendered correctly containing spot name, image, and text. | PASS | [`app.js#L38`](app.js#L38) |
| **EARS-2** | Select a JPEG image file using the file input before submitting. | Image preview container appears directly above the review text box displaying the selected photo. | Image preview displayed above text box immediately upon file selection. | PASS | [`app.js#L82`](app.js#L82) |
| **EARS-3** | Save a review, then execute a hard browser tab refresh in Codespaces. | The saved photo review card remains visible in the list feed with image and text intact. | Review card persisted after full page reload. | PASS | [`app.js#L14`](app.js#L14) |
| **EARS-3** | Save a review, then execute a hard browser tab refresh in Codespaces. | The saved photo review card remains visible in the list feed with image and text intact. | Review card persisted after full page reload. | PASS | [`app.js#L14`](app.js#L14) |
| **EARS-3b** | Save a review, then load the page from a different browser or a device that never had this app's localStorage populated. | Review persists and appears in that other browser/device. | No mechanism existed to move data between browsers. | CANNOT TEST YET | |
| **EARS-4** | Leave all input fields blank and click the "Save Review" submit button. | Inline error message reading "Please provide a name, select an image, and write a review." displays and form submission stops. | Red error text displayed, submission halted, no empty card created. | PASS | [`app.js#L112`](app.js#L112) |
| **EARS-5** | Fill out form fields with a valid photo review and click "Save Review". | Spot name input clears, photo selection resets, image preview hides, and review text box empties. | All form fields cleared and preview container hidden automatically upon submit. | PASS | [`app.js#L125`](app.js#L125) |
| **EARS-6** | Upload a non-image file (e.g., document or PDF) and click "Save Review". | System displays an error message reading "Please select a valid image file" and halts submission. | The file selector permitted document uploads, resulting in a broken image card rendering. | FAIL | [`app.js#L82`](app.js#L82) |
| **EARS-07** | Attempt to post a social comment on a saved photo review card. | Interactive social comment box allows friends to post threaded replies under the review. | Feature postponed to backend release per ADR-001; client-side MVP supports local logging only. | DEFERRED | [`ADR-001.md`](context/ADR-001.md) |

*EARS-3B should have been added in HW3 as a CANNOT TEST YET ROW since it was a feature that was untestable at the time.*

## Features

| Feature | Kano | Status |
|---|---|---|
| *Category-Based Ranking* | *Must-be* | *Not yet built* |
| *Text Reviews* | *Must-be* | *Built (HW3), server-backed (HW4)* |
| *Upload/Sharing* | *Performance* | *Not yet built* |
| *"Traveled with"* | *Attractive* | *Not yet built* |
| *Activity Feed* | *Indifferent* | *Not yet built* |
| *In-App Photo Editing* | *Indifferent* | *Not yet built* |

## Acceptance criteria (EARS)

- THE SYSTEM SHALL return all entries in creation order.
- WHEN a valid entry is submitted, THE SYSTEM SHALL store it and confirm.
- IF the entry text is missing, THEN THE SYSTEM SHALL reject it and say why.
- IF the server cannot be reached, THEN THE SYSTEM SHALL tell the user on the page.
- IF the entry text is empty or contains only whitespace, THEN THE SYSTEM SHALL reject it and say why.

## Verification

Walk every statement against the deployed page. PASS, FAIL, CANNOT TEST YET, or DEFERRED, with a reason.

| Statement | HW3 verdict | HW4 verdict | Reason |
|---|---|---|---|
| Return entries in order | PASS | PASS | |
| Store valid entry | PASS | PASS | |
| Reject missing text | PASS | PASS | |
| Survive cleared cache | CANNOT TEST YET | PASS | Loaded the page from a private window with no local data and the review text loaded from D1 via the Worker, not localStorage. |
| Server unreachable | | CANNOT TEST YET | I don't yet have a reliable way to simulate a true network outage from inside Codespaces. |
| Server returns 500 | | PASS | |
| Second client writes to the same table | | DEFERRED | ADR-002 says so |
