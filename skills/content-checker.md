---
name: content-checker
description: Automatically reviews any content against the Tesco Blueberry content design system. Flags issues, explains the rule and why it exists, educates the user, and provides a compliant rewrite. Activates whenever content is being written or edited in the project.
---

# Content Checker

Review all content against the Blueberry design system rules defined in CLAUDE.md.

## MANDATORY OUTPUT FORMAT

**YOU MUST PRODUCE YOUR RESPONSE IN EXACTLY THIS STRUCTURE. DO NOT SKIP TO A SUMMARY. DO NOT DO A FREEFORM REVIEW. FOLLOW THIS SKELETON:**

```
## Step 1: Content Inventory and Classification
### 1A — Content Inventory
| # | Element type | Text (exact quote) | Word count |
|---|-------------|-------------------|------------|
| 1 | ... | "..." | ... |
[every element listed]

[For screenshots: "Visual recheck complete — N elements found"]

### 1B — Classification
- Content types: ...
- Platform: ...
- Emotional context: ...

## Step 2: Principles Scan
- HUMAN: PASS / ISSUE — ...
- CLEAR: PASS / ISSUE — ...
- INCLUSIVE: PASS / ISSUE — ...
- HELPFUL: PASS / ISSUE — ...
- ENGAGING: PASS / ISSUE — ...

## Step 3: Voice and Tone Audit
- Expected tone: ...
- Actual tone: ...
- Result: PASS / ISSUE

## Step 4: Content Purpose Check
- Purpose served: ...
- "I want to..." test: [per CTA]

## Step 5: Writing Rules Check
- 5.1: PASS / ISSUE / N/A
- 5.2: PASS / ISSUE / N/A
[... through 5.28]

## Step 6: Component-Specific Rules
[numbered rules per component type]

## Step 7: Accessibility and Inclusion Check
### 7A — Accessibility
- 7A.1: PASS / ISSUE / N/A
[... through 7A.22]
### 7B — Inclusive language
- 7B.1: PASS / ISSUE / N/A
[... through 7B.14]

## Step 8: Conversation Design Check
[N/A or numbered 8.1-8.12]

## Step 9: Glossary and Formatting
### 9A — Glossary
- 9A.1: PASS / ISSUE / N/A
[... through 9A.24]
### 9B — Formatting
- 9B.1: PASS / ISSUE / N/A
[... through 9B.9]
### 9C — Term distinctions
- 9C.1: PASS / ISSUE / N/A
[... through 9C.10]

## Step 10: Report and Rewrite
### 10A — Issue Report
[grouped by Critical / Important / Style]
### 10B — Compliance Matrix
[10-row table]
### 10C — Clean Rewrite
[full rewrite]

## PASS 2: Re-scan
- P2.1: CLEAR / CAUGHT
[... through P2.17]

### Rewrite Validation
[validated or corrected]

## Final Verdict
[ALL CLEAR / REVISED / NEEDS DISCUSSION]
[Critical: N / Important: N / Style: N]
```

**If your response does not follow this structure, it is INVALID. Do not produce a casual review with bullet points. Do not skip to findings. Start with the Content Inventory table.**

---

## Enforcement Protocol

**This review is invalid unless ALL of the following are true:**

1. Every step (1-10) has a written output block — even if the output is "No issues found"
2. The Step 10 report includes a complete Compliance Matrix with all 10 steps marked
3. Pass 2 has been completed after the main review
4. No step references "see above" or "as before" — each step must contain its own findings
5. The response starts with the Content Inventory table from Step 1A — if it doesn't, start over

**If reviewing a screenshot or image:**
- The screenshot goes through the SAME Step 1 Content Inventory as any other input — no shortcut
- In Step 1A, you must visually scan the entire screenshot region by region (top to bottom, left to right) and extract every piece of text into the inventory table
- For each element, identify its type from visual appearance: buttons have borders/fills, links are underlined/coloured, headings are larger/bolder, body copy is standard size, labels sit above form fields
- Flag any text that is partially obscured, truncated, or unclear — do not guess
- If extraction is uncertain, state what is unclear before proceeding
- A screenshot review is ONLY as good as the inventory extraction — if you miss text in the inventory, it won't be checked in any step

**If reviewing multiple screens, pages, or a flow:**
- Number each screen/page (Screen 1, Screen 2, etc.)
- Run the full 10-step review for EACH screen individually
- After individual reviews, run one additional cross-screen consistency check: are the same terms, patterns, and tone used throughout the flow?

---

## PASS 1: Full Review

### Step 1: Content Inventory and Classification

**This is the most critical step. Every subsequent check references this inventory. If an element isn't in the inventory, it won't be checked.**

**1A — Build the Content Inventory**

Break ALL content into individual elements using this exact table format. Every piece of text must appear as its own row — do not combine elements:

```
| # | Element type | Text (exact quote) | Word count |
|---|-------------|-------------------|------------|
| 1 | Heading (H1) | "Your delivery slot" | 3 |
| 2 | Body copy | "Choose a time that works for you." | 7 |
| 3 | Button (primary) | "Add to basket" | 3 |
| 4 | Button (secondary) | "Continue browsing" | 2 |
| 5 | Link | "View all delivery slots" | 4 |
| 6 | Body copy | "Same-day home delivery slots without fees" | 7 |
| 7 | Form label | "Email address" | 2 |
| ... | ... | ... | ... |
```

Rules for building the inventory:
- Every heading, subheading, button, link, label, body sentence, error message, tooltip, and placeholder gets its own row
- For body copy, break into individual sentences — one sentence per row
- For bullet point lists, each bullet gets its own row
- Number every element sequentially — this number is the reference ID for all subsequent steps
- The word count column helps flag sentences over 15/25 words immediately
- Do NOT summarise or paraphrase — quote the exact text

**Extra rules for screenshots:**
- Scan the image systematically: top to bottom, left to right — don't jump around
- Include navigation items, footer links, breadcrumbs, tab labels, badges, and any other visible text
- If a UI element's type is ambiguous from the screenshot, note the ambiguity (e.g., "Link or button — unclear from screenshot")
- Count elements after extraction and do a visual recheck: scan the screenshot one more time to confirm you haven't missed anything. State "Visual recheck complete — [N] elements found" or "Visual recheck — found [N] additional elements" if you missed any

**1B — Classify the Content**

After the inventory, state:

- **Content types present:** list every type found in the inventory (CTA/button, link, heading, body copy, error message, warning, success message, info message, amend message, modal, popover, loading spinner, rating, form label, tooltip, chatbot/AI response, etc.)
- **Platform context:** app, web, mWeb, self-service checkout, colleague tool, chatbot, voice assistant
- **Emotional context:** what is the user likely feeling at this point? (browsing, stressed, confused, excited, anxious)

This classification determines which component-specific rules apply in later steps.

**Required output:** The complete content inventory table (1A) AND the classification (1B). If any element is ambiguous (is it a button or a link?), state the ambiguity. A review without a complete inventory is invalid.

---

### Step 2: Principles Scan

Check the content against ALL 5 principles. For each, write a finding:

- **HUMAN** — Does it sound like how people actually speak? Would you say this to a friend?
- **CLEAR** — Are the words simple and easy to understand? Is there any ambiguity?
- **INCLUSIVE** — Does it work for everyone regardless of background, literacy, or ability?
- **HELPFUL** — Does it have a clear purpose? Does it help the user get their job done?
- **ENGAGING** — Does it add value without getting in the way?

**Required output:** 5 findings, one per principle. Each must say PASS or ISSUE with explanation. No principle may be omitted.

---

### Step 3: Voice and Tone Audit

Based on the emotional context identified in Step 1:

1. Determine the correct position on the **helpfulness-vs-personality spectrum** using this guide:
   - Browsing/discovery → more personality
   - Searching → more helpfulness
   - Booking/scheduling → helpfulness (reduce cognitive load)
   - Payment → balanced (milestone but high-stakes)
   - Deals/savings → more personality (exciting moment)
   - Returns/errors → helpfulness (empathy, resolve quickly)

2. Assess whether the content hits the right balance:
   - Too much personality? Risk of sounding inauthentic or inappropriate
   - Too much helpfulness? Risk of sounding robotic or lacking humanity

3. Flag any miscalibration with the specific context and what the tone should be.

**Required output:** State the expected tone position, the actual tone position, and whether they match. PASS or ISSUE.

---

### Step 4: Content Purpose Check

Every piece of UX content should serve at least one of these 4 purposes:

- **Context** — Where am I? How did I get here?
- **Feedback** — What just happened? Why?
- **Guidance** — What do I need to know? What helps me progress?
- **Action** — What can I do here?

Check:
- Does this content serve at least one purpose? If not, challenge whether it's needed.
- Do CTAs complete the sentence "I want to..."? If not, rewrite.
- Is the content consistent with patterns elsewhere in the experience? Would mixing this with surrounding content force users to think about the words instead of their task?

**Required output:** State which purpose(s) the content serves. Run the "I want to..." test on every CTA/button/link and write the result. PASS or ISSUE per element.

---

### Step 5: Writing Rules Check

**Go through the Content Inventory from Step 1 element by element.** For each rule below, scan every inventory item (by #) and check it. Do not review "the content as a whole" — check each numbered element against each rule.

| # | Rule | Check for |
|---|------|-----------|
| 5.1 | Active voice | No passive constructions. Use the "by monkeys" test — if you can add "by monkeys" to the end and it makes sense, it's passive. |
| 5.2 | Present tense | Use present tense, not future. Flag: "You will need to..." (→ just state the action), "We will send you..." (→ "We'll send you..." or "You'll get..."), "You will be able to..." (→ "You can..."), "This will allow you to..." (→ "This lets you..."). Future tense adds unnecessary words and distance. |
| 5.3 | Verb-led CTAs | Buttons, links, and headings should start with a verb |
| 5.4 | Sentence length | Aim for 15 words, flag anything over 25 |
| 5.5 | Readability | Target Hemingway grade 6 or lower |
| 5.6 | Plain language | Use short, common words. Flag ANY of these formal/complex words and replace: purchase→buy, assist/assistance→help, approximately→about/around, require→need, obtain→get, inform→tell, commence→start/begin, utilise→use, prior to→before, sufficient→enough, additional→more/extra, currently→now, ensure→make sure, regarding→about, subsequently→then/next, terminate→end/stop, endeavour→try, proceed→go/continue, submit→send/confirm, navigate→go to, access (verb)→go to/open, "in order to"→to, "at this time"→now, "in the event of"→if. Also: no mathematical symbols or notation (×, +, ÷, =, >, <) — use words ("double" not "2×", "more than" not ">"). |
| 5.7 | No Latin | No e.g., i.e., etc., per annum — use "for example", "such as", "that is", "each year" |
| 5.8 | No ampersands | Use "and" except in brand names or very tight spaces |
| 5.9 | No "and/or" | Rewrite for clarity |
| 5.9a | No slash as "or" | Don't use "/" to mean "or" or "and" — "delivery/collection" should be "delivery or collection". Slashes are ambiguous, hard for screen readers, and not plain English. Exception: established terms like Click+Collect. |
| 5.10 | Contractions | Should be used for natural tone ("You'll" not "You will") unless awkward |
| 5.11 | Sentence case | Only first word and proper nouns capitalised. No Title Case. No BLOCK CAPITALS. |
| 5.12 | No "now" | "Apply" not "Apply now" unless contrasting with "apply later" |
| 5.13 | No idioms/metaphors | Avoid figures of speech that confuse non-native speakers |
| 5.14 | Scannable | Headings, bullets, bold, short paragraphs used appropriately |
| 5.15 | Consistent terminology | Same word for same concept throughout |
| 5.16 | No "please" | Don't say "please" if the action isn't optional — state what the user needs to do directly |
| 5.17 | No "sorry" (unless our fault) | Only apologise when something went wrong on our end. Don't apologise for user errors. |
| 5.18 | No "successfully" | Unnecessary. "Your password was reset" not "Your password was successfully reset" |
| 5.19 | No dismissive or condescending words | Flag: "just", "only", "simply", "obviously", "clearly", "of course", "basically", "as you know", "naturally", "needless to say". All sound patronising or assume user knowledge. |
| 5.20 | No possessive pronouns in UI elements | No "my" or "your" in headings, buttons, menus, labels — only in body copy |
| 5.21 | No questions in headings | "Frontloading headings" not "Should I frontload my headings?" — statements outperform questions |
| 5.22 | Explain technical terms | If a technical term is used, it must be explained the first time it appears |
| 5.23 | Avoid FAQs | Don't use FAQ format — put important information in-journey where users need it |
| 5.24 | Bullet point structure | Bullets must: complete a sentence, be front-loaded with key info, start with the same language element (all verbs, or all nouns), use correct grammar |
| 5.25 | No negative framing | Don't lead with what the user can't do. Flag: "Don't forget to..." (→ just state the action), "You can't..." (→ rephrase positively or state what they can do), "Unfortunately..." (→ state the situation and the fix), "We're unable to..." (→ "We can't..." or state alternatives). Focus on the path forward, not the obstacle. |
| 5.26 | No vague error language | Flag: "Something went wrong" (too vague — say what happened), "Error 404" or any error codes (users don't speak HTTP), "Request failed"/"Operation failed" (failure family — say what to do instead), "An unexpected error occurred" (meaningless to users). Every error must say what happened AND what to do next. |
| 5.27 | Every word must earn its place | Read each sentence and ask: can I remove any word without losing meaning? Flag redundant words and tautologies. Common examples: "home delivery"→"delivery" (delivery implies home), "free of charge"→"free", "completely free"→"free", "new innovation"→"innovation", "end result"→"result", "close proximity"→"close"/"nearby", "added bonus"→"bonus", "return back"→"return", "repeat again"→"repeat", "current status"→"status", "advance booking"→"booking", "This is the total cost"→"Total cost", "in order to"→"to". If removing a word doesn't change the meaning, remove it. |
| 5.28 | Parallel structure in lists | When listing similar items, they must follow the same grammatical structure. If one item starts with a verb, all must. If one is a noun phrase, all must. Inconsistent structure forces the reader to re-parse each item. Check every bulleted list, every set of options, every group of CTAs for parallel structure. |

**Required output:** A numbered checklist (5.1 through 5.28, including 5.9a). Each rule must show PASS, ISSUE (with the offending text quoted), or N/A (with reason). No rule may be skipped.

---

### Step 6: Component-Specific Rules

Based on the content type(s) from Step 1, apply ALL relevant rules below. If a content type has no section here, write "No component-specific rules for [type]".

**Buttons:**

| # | Rule |
|---|------|
| 6B.1 | 2-4 words max |
| 6B.2 | Start with a verb in present tense |
| 6B.3 | Sentence case |
| 6B.4 | No figurative language |
| 6B.5 | Must make sense without surrounding context |
| 6B.6 | "Sign in" not "Log in" |
| 6B.7 | Use links not buttons when sending users to another page for information |
| 6B.8 | No "Got it" (confusing for non-native speakers) or "Dismiss" (unclear outcome) — use specific action verbs or "OK" |

**Links:**

| # | Rule |
|---|------|
| 6L.1 | Under 5 words ideally, 6-8 max |
| 6L.2 | Front-load meaning |
| 6L.3 | No vague links: "Click here", "Read more", "More info", "Learn more" (bare). "Learn more about [topic]" is OK but bare "Learn more" fails the out-of-context test. |
| 6L.4 | Use correct verb pattern: "View..." (information), "Go to..." (dashboard), "Browse..." (collections), "Find..." (discovery), "Learn more about..." (educational), "Read..." (long-form) |
| 6L.5 | No mid-sentence links |
| 6L.6 | Link text must match destination |

**Modals:**

| # | Rule |
|---|------|
| 6M.1 | Heading + first sentence must state what's happening immediately |
| 6M.2 | No "Yes" / "No" buttons — use specific action verbs |
| 6M.3 | Avoid cancel confusion — use "Keep [thing]", "Never mind", or "Not now" |
| 6M.4 | Brevity over personality |
| 6M.5 | Extra concise for native iOS/Android modals |

**General Messaging (applies to ALL message types — error, warning, success, info, amend):**

| # | Rule |
|---|------|
| 6GM.1 | Start strong — most important information first |
| 6GM.2 | Focus on one thing — don't overload with multiple issues in one message |
| 6GM.3 | Include timescales — if there's a deadline or wait time, state it |
| 6GM.4 | Focus on action — provide a way to fix problems or move forward |

**Messaging (Error):**

| # | Rule |
|---|------|
| 6E.1 | Calm language — no "failure", "broken", or even "error" |
| 6E.2 | Never blame the user |
| 6E.3 | Structure: heading (what's wrong) + body (why + how to fix) + CTA (action) |
| 6E.4 | Specific but relevant — user language, not technical |
| 6E.5 | No jokey tone in errors — don't say "Ooops", "Whoops", or similar. Friendly but serious. |

**Messaging (Warning):**

| # | Rule |
|---|------|
| 6W.1 | Go light on "please" and "sorry" |
| 6W.2 | Don't say "please" if the action isn't optional |
| 6W.3 | Don't apologise for things that aren't our fault |
| 6W.4 | No capitals or exclamation marks for emphasis |
| 6W.5 | Tell them what to do next |

**Messaging (Success):**

| # | Rule |
|---|------|
| 6S.1 | No "successfully" — it rarely adds anything |
| 6S.2 | Positive confirmation of what the user did |
| 6S.3 | Add delight only if it doesn't compromise clarity |

**Messaging (Information):**

| # | Rule |
|---|------|
| 6I.1 | Use sparingly — only truly needed information |
| 6I.2 | Link to more detail when space is limited |

**Messaging (Amend):**

| # | Rule |
|---|------|
| 6A.1 | Include deadline clearly |
| 6A.2 | No "hurry" or "don't miss out" — avoid anxiety |
| 6A.3 | If you say they can do something, make sure they can |

**Popovers:**

| # | Rule |
|---|------|
| 6P.1 | 1-3 lines max |
| 6P.2 | No full stops in headings; in body only if >8 words or multiple sentences |
| 6P.3 | Only add info that isn't already on the page |
| 6P.4 | Default to body-copy-only — heading/button only if genuinely needed |

**Loading spinners:**

| # | Rule |
|---|------|
| 6LS.1 | Present tense ("Updating your basket" not "We're going to update your basket") |
| 6LS.2 | Specific, not generic ("Verifying card details" not "Loading") |
| 6LS.3 | Brief — a few words or one sentence |
| 6LS.4 | Time expectations only if reliable |
| 6LS.5 | Personality OK for rewards/fun contexts, not for payments/sensitive data |
| 6LS.6 | Show progress for longer waits — "75% complete" or step-by-step updates |

**Ratings:**

| # | Rule |
|---|------|
| 6R.1 | Neutral tone — never leading |
| 6R.2 | Brief — not the user's primary goal |
| 6R.3 | Label clearly what's being rated |
| 6R.4 | No emotionally-charged star descriptions |
| 6R.5 | Non-interactive ratings: pair visual stars with written text ("5 stars") and show number of reviewers |

**Emoji (if present):**

| # | Rule |
|---|------|
| 6EM.1 | Placed after text, not before or mid-sentence |
| 6EM.2 | No repeated emojis |
| 6EM.3 | Reinforces meaning, never replaces words |
| 6EM.4 | Works in both light and dark mode |
| 6EM.5 | Popular, widely understood emojis only |
| 6EM.6 | No facial expressions unless universally understood |
| 6EM.7 | Use emojis, not emoticons — emoticons lack alt text for screen readers |
| 6EM.8 | Yellow skin tone doesn't mean "neutral" — consider representation |

**Required output:** Name each component type being checked and produce a numbered checklist using the IDs above (e.g., 6B.1: PASS). Each rule must show PASS, ISSUE (with offending text), or N/A. If no component-specific rules apply, state that explicitly.

---

### Step 7: Accessibility and Inclusion Check

**7A — Accessibility:**

Check every rule individually:

| # | Rule | Check for |
|---|------|-----------|
| 7A.1 | Descriptive links | Links make sense out of context (screen reader users skip between links) |
| 7A.2 | Unique links | All links on a page are unique |
| 7A.3 | Heading hierarchy | Correct hierarchy (H1 → H2 → H3, never skip) |
| 7A.4 | Heading length | Under 65 characters |
| 7A.5 | Alt text | All images have appropriate alt text (clear, accurate, concise) |
| 7A.6 | No images of text | Use actual text, not images of text |
| 7A.7 | Form labels | Descriptive labels, no placeholder text as labels |
| 7A.8 | Error placement | Errors below their form field, blame-free, solution-focused |
| 7A.9 | No directional language | No "above", "below", "left", "right" |
| 7A.10 | No sensory-only instructions | No "tap the green button" — describe the function |
| 7A.11 | Use "select" | Not "click" or "tap" |
| 7A.12 | Heteronyms | Watch for read, live, close, content, invalid — replace with unambiguous alternatives |
| 7A.13 | Simple punctuation | Stick to commas and full stops — avoid semicolons, dashes, brackets, asterisks |
| 7A.14 | No abbreviations | Except universally understood (PDF, FAQ) |
| 7A.15 | Video captions | Captions on all video, transcripts for audio |
| 7A.16 | Audio descriptions | For videos with important visuals |
| 7A.17 | Icon-only buttons | Icon-only buttons must have a text alternative |
| 7A.18 | Decorative vs informational images | Decorative images should have empty alt text (alt=""). Only informational images need descriptive alt text. |
| 7A.19 | Unique heading per page | Every page/screen should have a unique heading |
| 7A.20 | Descriptive headings | Headings should make sense in isolation — descriptive, not vague |
| 7A.21 | No shape/colour/position-only meaning | Don't rely on shape, size, colour, or position alone to convey meaning |
| 7A.22 | Form field labelling | Only label optional fields — don't mark everything as (required) |

**7B — Inclusive language:**

| # | Rule | Check for |
|---|------|-----------|
| 7B.1 | Gender-neutral | They, you, we — no "manpower", "mankind" |
| 7B.2 | No gendered terms | "Attended/unattended" not "manned/unmanned" |
| 7B.3 | No colour-coded language | "Blocklist/allowlist" not "blacklist/whitelist"; "primary/main" not "master" |
| 7B.4 | Disability-aware UI language | "Inactive" or "not available" not "disabled" (for UI states) |
| 7B.5 | No euphemisms | No "differently abled" |
| 7B.6 | No speed assumptions | No "fast/quick/easy" — use specific timeframes |
| 7B.7 | Person-first language | "Disabled people" not "the disabled" |
| 7B.8 | No negative framing | No "suffering from", "confined to a wheelchair" |
| 7B.9 | Respectful character references | Don't call characters like à or š "special" |
| 7B.10 | Diverse examples | Diverse names if examples are used |
| 7B.11 | No value-laden metaphors | No black/white/dark/light as value metaphors (dark mode/light mode are fine) |
| 7B.12 | Pronouns phrasing | Ask for "pronouns" not "preferred pronouns" |
| 7B.13 | No "other" gender option | Don't include "other" as a gender option — let people self-describe or skip |
| 7B.14 | Question titles | Consider whether titles (Mr/Mrs/Ms) are needed at all — avoid if possible |

**Required output:** Two numbered checklists (7A.1-7A.22 and 7B.1-7B.14). Each rule must show PASS, ISSUE (with offending text), or N/A (with reason). No rule may be skipped.

---

### Step 8: Conversation Design Check

**Only apply if the content is for AI/chatbot/voice assistant. If not, write "N/A — not conversational UI" and move to Step 9.**

| # | Rule | Check for |
|---|------|-----------|
| 8.1 | Quality | Is the information accurate and honest? |
| 8.2 | Quantity | Right amount of info? Not too little, not too much? |
| 8.3 | Relation | Relevant to the user's question? Stays on topic? |
| 8.4 | Manner | Organised, not rambling, clear language? |
| 8.5 | One-breath test | Can you say the response in one breath? If not, it's too long |
| 8.6 | Sounds spoken | Read aloud — if it sounds like an essay, make it conversational |
| 8.7 | Active voice | "I'll ask you a few questions" not "You'll be asked a few questions" |
| 8.8 | Simple words | No jargon; a child should understand |
| 8.9 | Consistent terminology | Don't switch terms mid-conversation |
| 8.10 | Never blame user | Handle miscommunications gracefully |
| 8.11 | Personality alignment | Friendly, empathetic, helpful. Not jokey about serious issues. |
| 8.12 | AI terminology | Use "virtual assistant" or "chat assistant" for AI. Use "agent" only for human agents. |

**Required output:** If applicable, numbered checklist 8.1-8.12 with PASS, ISSUE, or N/A per rule. If not applicable, state "N/A — not conversational UI".

---

### Step 9: Glossary and Formatting Compliance

**9A — Glossary term scan.** Go through the Content Inventory from Step 1 element by element (by #). For each element, scan its text against EVERY term in the table below. This is a word-by-word scan — read each inventory item's text slowly and check for matches:

| # | Don't use | Use instead |
|---|-----------|-------------|
| 9A.1 | log in / log out | sign in / sign out |
| 9A.2 | click / tap | select |
| 9A.3 | bank | card issuer |
| 9A.4 | reserve (a slot) | book (a slot) |
| 9A.5 | staff, workers | colleagues |
| 9A.6 | profile | account |
| 9A.7 | fees | charges |
| 9A.8 | assist, assistance | help |
| 9A.9 | help desk | service desk |
| 9A.10 | modify | change |
| 9A.11 | passcode, OTP, PIN code | code |
| 9A.12 | Marketplace partner | Marketplace seller / seller |
| 9A.13 | fraud, suspicious activity | "we couldn't take your payment" |
| 9A.14 | toggle | switch on / switch off |
| 9A.15 | enable / disable | switch on / switch off |
| 9A.16 | SMS | text |
| 9A.17 | thank you | thanks |
| 9A.18 | invalid | not working, not right, wrong |
| 9A.19 | Ok, okay, O.K. | OK |
| 9A.20 | just, only, simply (directions) | Remove — sounds patronising |
| 9A.21 | home delivery | delivery — "home" is redundant, delivery means to your home |
| 9A.22 | unlock (for features/benefits) | get, start, access — "unlock" is gaming/marketing speak, not how people talk |
| 9A.23 | free of charge | free — "of charge" is redundant |
| 9A.24 | Ooops, Oops, Whoops (in errors) | Remove — don't be jokey in error messages |

**9B — Formatting checks:**

| # | Rule | Check for |
|---|------|-----------|
| 9B.1 | Dates — format | "1 January 2000" not "01/01/2000" or "1st January". No ordinals. Short: "1 Jan 2000". |
| 9B.1a | Dates — ranges | Hyphen no spaces for same month (1-2 January). Spaces around hyphen for cross-month (1 January - 1 February). |
| 9B.1b | Dates — year | Don't include the year unless the date isn't this year. |
| 9B.2 | Times — format | "1.30pm" not "1:30pm" or "1.30 pm" or "13:30". 12-hour clock, full stop separator, no space before am/pm. |
| 9B.2a | Times — zeros | No leading zeros (9am not 09am). No minutes when zero (1pm not 1.00pm). |
| 9B.2b | Times — noon/midnight | 12pm and 12am, not "noon" or "midnight". |
| 9B.2c | Times — ranges | am/pm for both times, hyphen with no spaces (7am-8am not 7-8am). |
| 9B.2d | Times — "minutes" | Use "minutes" not "mins" unless space is very limited. |
| 9B.3 | Numbers | Numerals by default, commas for thousands, % symbol |
| 9B.4 | Capitalisation | Sentence case everywhere except nav menus, breadcrumbs, product names |
| 9B.5 | Pronouns in UI | No "my" or "your" in headings, buttons, menus, labels — only in body copy |
| 9B.6 | Brand terms | Clubcard, Clubcard Prices, Clubcard points (specific capitalisation); always "collect" points |
| 9B.7 | Compound words | checkout (noun) vs check out (verb); sign in (verb) vs sign-in (noun/adjective); set up (verb) vs setup (noun); in-store (always hyphenated); upfront (one word) |
| 9B.8 | Oxford comma | Do not use oxford commas (British English style) |
| 9B.9 | Section name capitalisation | Capitalise specific section names ("Go to your Favourites") but lowercase in running copy ("Shop your favourites") |

**9C — Term distinction and brand format checks.** These terms have specific usage rules. If any appear in the content, verify they are used correctly:

| # | Term | Rule |
|---|------|------|
| 9C.1 | Click+Collect | Always "Click+Collect" — no spaces, no ampersand ("Click & Collect"), never abbreviate to "C+C" in customer-facing copy |
| 9C.2 | choose vs select | "Choose" = customer decisions not tied to UI (choosing a meal deal). "Select" = tappable/clickable UI decisions (select a delivery slot) |
| 9C.3 | continue vs next | "Continue" = when consent is needed or choices will be made. "Next" = shorter steps or going through content (onboarding) |
| 9C.4 | view vs show | "View" = navigates to a different page ("View all"). "Show" = reveals content on the same page ("Show more") |
| 9C.5 | cost vs price | "Price" = what something costs before discounts. "Cost" = what the customer actually pays |
| 9C.6 | product vs item | "Product" = a unique thing we stock. "Item" = quantity of products (3 items of the same product) |
| 9C.7 | checkout vs check out | "Checkout" = noun (the place/process: "before checkout"). "Check out" = verb (the action: "check out our offers") |
| 9C.8 | sign in vs sign-in | "Sign in" = verb (two words: "Sign in to continue"). "Sign-in" = noun/adjective (hyphenated: "the sign-in screen") |
| 9C.9 | set up vs setup | "Set up" = verb ("Set up your account"). "Setup" = noun/adjective ("Your account setup is complete") |
| 9C.10 | Clubcard terms | "Clubcard" (one word, capital C). "Clubcard Prices" (both capitalised). "Clubcard points" (lowercase p). Always "collect" points — never "earn" or "get" |

**Required output:** Three numbered checklists (9A.1-9A.24, 9B.1-9B.9 including sub-rules 9B.1a/1b/2a/2b/2c/2d, and 9C.1-9C.10). Each must show PASS (term not found / formatting correct), ISSUE (with offending text quoted), or N/A. No item may be skipped.

---

### Step 10: Report and Rewrite

**10A — Issue Report**

For **every issue found across all steps**, provide:

1. **The problem** — what's wrong, with the specific text quoted
2. **The rule** — which step and rule number this violates (e.g., "Step 5, Rule 5.7 — No Latin")
3. **Why it matters** — the reason behind the rule (accessibility, cognitive load, brand consistency, etc.)
4. **The rewrite** — a compliant version

**Group issues by severity:**

**Critical (must fix)**
Accessibility violations, inclusive language failures, blame-the-user errors, missing alt text, broken heading hierarchy, sensory-only instructions.

**Important (should fix)**
Principle violations, tone miscalibration, component structure errors, passive voice, missing CTA purpose, pattern inconsistency.

**Style (nice to fix)**
Glossary term mismatches, formatting inconsistencies, unnecessary words, suboptimal sentence length, capitalisation issues.

**10B — Compliance Matrix**

After the issue report, produce this exact table. Every row must be filled. A review missing any row is invalid.

```
| Step | Name                          | Result       | Issues found |
|------|-------------------------------|--------------|--------------|
| 1    | Classify the Content          | DONE         | N/A          |
| 2    | Principles Scan               | PASS / ISSUE | count        |
| 3    | Voice and Tone Audit          | PASS / ISSUE | count        |
| 4    | Content Purpose Check         | PASS / ISSUE | count        |
| 5    | Writing Rules Check           | PASS / ISSUE | count        |
| 6    | Component-Specific Rules      | PASS / ISSUE / N/A | count  |
| 7    | Accessibility and Inclusion   | PASS / ISSUE | count        |
| 8    | Conversation Design Check     | PASS / ISSUE / N/A | count  |
| 9    | Glossary, Formatting, and Term Distinctions | PASS / ISSUE | count |
| 10   | Report and Rewrite            | DONE         | total count  |
```

**10C — Clean Rewrite**

Provide a clean, fully rewritten version of the entire content with all issues resolved. This must be a standalone block the user can copy directly.

---

## PASS 2: Targeted Re-scan

After completing the full review above, run this second pass. Pass 2 catches the issues most commonly missed in Pass 1.

### Re-scan Checklist

Go back to the **Content Inventory from Step 1** (not the rewrite). Work through it element by element (by #) for each re-scan target below. Quote the inventory item number and text for every finding:

| # | Re-scan target | What to look for |
|---|---------------|-----------------|
| P2.1 | Every glossary term (9A.1-9A.24) and term distinction (9C.1-9C.10) | Read the content word by word one more time. Did you miss any forbidden terms or misused distinctions? Check especially for: home delivery, unlock, free of charge, fees. |
| P2.2 | Every CTA and button | Does it start with a verb? 2-4 words? Pass the "I want to..." test? |
| P2.3 | Every link | Descriptive? No "click here"/"read more"? Makes sense out of context? Under 8 words? |
| P2.4 | Passive voice | Re-run the "by monkeys" test on every sentence |
| P2.5 | "please", "sorry", "successfully", "just", "only", "simply" | Scan for these specific words one more time |
| P2.6 | Sentence case | Check every heading, button, and link — no Title Case, no BLOCK CAPITALS |
| P2.7 | Dates, times, numbers | Check every instance against the formatting rules |
| P2.8 | "click" or "tap" | Must be "select" |
| P2.9 | Oxford commas | Scan every list — no oxford commas (British English style) |
| P2.10 | Heteronyms | Check for: read, live, close, content, invalid — can any be misread? |
| P2.11 | Symbols and notation | Scan for any mathematical symbols (×, +, ÷, =, >, <, %, #, @) or notation used in place of plain English words. "Double" not "2×", "more than" not ">", "number" not "#". % symbol is OK for percentages (25%). |
| P2.12 | Formal/complex words | Re-scan for: purchase, assist, approximately, require, obtain, inform, commence, utilise, prior to, sufficient, additional, currently, ensure, regarding, subsequently, terminate, endeavour, proceed, submit, navigate, access (as verb). Each should be replaced with a simpler word. |
| P2.13 | Slashes as words | Scan for "/" used to mean "or" or "and" (delivery/collection, yes/no, on/off). Must be written out. |
| P2.14 | Negative framing | Scan for "Don't forget", "You can't", "Unfortunately", "We're unable to", "We regret". Rephrase positively. |
| P2.15 | Condescending words | Scan for "obviously", "clearly", "of course", "basically", "as you know", "naturally", "needless to say" — in addition to "just", "only", "simply" from P2.5. |
| P2.16 | Redundant words | Re-read every phrase. Can any word be removed without losing meaning? Check for: "home delivery", "free of charge", "completely free", "new innovation", "end result", "close proximity", "added bonus", "return back", "repeat again", "current status", "advance booking". |
| P2.17 | Parallel structure | Re-check every list, set of options, and group of CTAs. Do all items follow the same grammatical pattern? |

**Required output:** Numbered checklist P2.1-P2.17. Each must say CLEAR (nothing missed) or CAUGHT (with the missed issue described). If Pass 2 finds new issues, add them to the Issue Report and update the Clean Rewrite.

### Rewrite Validation

After Pass 2 on the original, re-read your Clean Rewrite from 10C and confirm it does not introduce any NEW violations. Specifically check:

- No glossary term violations introduced in the rewrite (9A.1-9A.20)
- No term distinction errors introduced in the rewrite (9C.1-9C.10)
- No passive voice introduced in the rewrite
- No "please", "sorry", "successfully", "just", "only", "simply" added
- Sentence case maintained in all UI elements
- No oxford commas introduced
- All CTAs still start with a verb and pass "I want to..." test
- Tone is consistent with the context from Step 1

**Required output:** State "REWRITE VALIDATED — no new issues introduced" or list any new issues found and provide a corrected final rewrite.

---

## Final Verdict

After both passes, state one of:

- **ALL CLEAR** — No issues found across both passes. Content is fully Blueberry-compliant.
- **REVISED** — Issues were found and corrected. The Clean Rewrite is Blueberry-compliant.
- **NEEDS DISCUSSION** — Some issues require user input (ambiguous context, competing rules, content strategy decisions).

Include the total issue count broken down: Critical / Important / Style.
