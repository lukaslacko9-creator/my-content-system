---
name: content-checker
description: Automatically reviews any content against the Tesco Blueberry content design system. Flags issues, explains the rule and why it exists, educates the user, and provides a compliant rewrite. Activates whenever content is being written or edited in the project.
---

# Content Checker

Review all content against the Blueberry design system rules defined in CLAUDE.md. Run every step in order. Do not skip steps — each catches different categories of issues.

## Step 1: Classify the Content

Before checking anything, identify:

- **Content type:** CTA/button, link, heading, body copy, error message, warning, success message, info message, amend message, modal, popover, loading spinner, rating, push notification, email, chatbot/AI response, help article, form label, tooltip, or other
- **Platform context:** app, web, mWeb, self-service checkout, colleague tool, chatbot, voice assistant
- **Emotional context:** what is the user likely feeling at this point? (browsing, stressed, confused, excited, anxious)

This classification determines which component-specific rules apply in later steps.

## Step 2: Principles Scan

Check the content against all 5 principles. For each, ask:

- **HUMAN** — Does it sound like how people actually speak? Would you say this to a friend?
- **CLEAR** — Are the words simple and easy to understand? Is there any ambiguity?
- **INCLUSIVE** — Does it work for everyone regardless of background, literacy, or ability?
- **HELPFUL** — Does it have a clear purpose? Does it help the user get their job done?
- **ENGAGING** — Does it add value without getting in the way?

Flag any content that violates a principle. Cite the principle by name.

## Step 3: Voice and Tone Audit

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

## Step 4: Content Purpose Check

Every piece of UX content should serve at least one of these 4 purposes:

- **Context** — Where am I? How did I get here?
- **Feedback** — What just happened? Why?
- **Guidance** — What do I need to know? What helps me progress?
- **Action** — What can I do here?

Check:
- Does this content serve at least one purpose? If not, challenge whether it's needed.
- Do CTAs complete the sentence "I want to..."? If not, rewrite.
- Is the content consistent with patterns elsewhere in the experience? Would mixing this with surrounding content force users to think about the words instead of their task?

Flag content that serves no clear purpose, CTAs that don't pass the "I want to..." test, or content that breaks established patterns.

## Step 5: Writing Rules Check

Run through each of these mechanical rules:

| Rule | Check for |
|------|-----------|
| Active voice | No passive constructions. Use the "by monkeys" test — if you can add "by monkeys" to the end and it makes sense, it's passive. |
| Present tense | "Enter your email" not "You will need to enter your email" |
| Verb-led CTAs | Buttons, links, and headings should start with a verb |
| Sentence length | Aim for 15 words, flag anything over 25 |
| Readability | Target Hemingway grade 6 or lower |
| Plain language | Short words over long (buy not purchase, help not assist, around not approximately) |
| No Latin | No e.g., i.e., etc., per annum — use "for example", "such as", "that is", "each year" |
| No ampersands | Use "and" except in brand names or very tight spaces |
| No "and/or" | Rewrite for clarity |
| Contractions | Should be used for natural tone ("You'll" not "You will") unless awkward |
| Sentence case | Only first word and proper nouns capitalised. No Title Case. No BLOCK CAPITALS. |
| No "now" | "Apply" not "Apply now" unless contrasting with "apply later" |
| No idioms/metaphors | Avoid figures of speech that confuse non-native speakers |
| Scannable | Headings, bullets, bold, short paragraphs used appropriately |
| Consistent terminology | Same word for same concept throughout |

## Step 6: Component-Specific Rules

Based on the content type from Step 1, apply the relevant rules:

**Buttons:**
- 2-4 words max
- Start with a verb in present tense
- Sentence case
- No figurative language
- Must make sense without surrounding context
- "Sign in" not "Log in"

**Links:**
- Under 5 words ideally, 6-8 max
- Front-load meaning
- No "Click here", "Read more", "More info"
- Use correct verb pattern: "View..." (information), "Go to..." (dashboard), "Browse..." (collections), "Find..." (discovery), "Learn more about..." (educational), "Read..." (long-form)
- No mid-sentence links
- Link text must match destination

**Modals:**
- Heading + first sentence must state what's happening immediately
- No "Yes" / "No" buttons — use specific action verbs
- Avoid cancel confusion — use "Keep [thing]", "Never mind", or "Not now"
- Brevity over personality
- Extra concise for native iOS/Android modals

**Messaging (Error):**
- Calm language — no "failure", "broken", or even "error"
- Never blame the user
- Structure: heading (what's wrong) + body (why + how to fix) + CTA (action)
- Specific but relevant — user language, not technical

**Messaging (Warning):**
- Go light on "please" and "sorry"
- Don't say "please" if the action isn't optional
- Don't apologise for things that aren't our fault
- No capitals or exclamation marks for emphasis
- Tell them what to do next

**Messaging (Success):**
- No "successfully" — it rarely adds anything
- Positive confirmation of what the user did
- Add delight only if it doesn't compromise clarity

**Messaging (Information):**
- Use sparingly — only truly needed information
- Link to more detail when space is limited

**Messaging (Amend):**
- Include deadline clearly
- No "hurry" or "don't miss out" — avoid anxiety
- If you say they can do something, make sure they can

**Popovers:**
- 1-3 lines max
- No full stops in headings; in body only if >8 words or multiple sentences
- Only add info that isn't already on the page
- Default to body-copy-only — heading/button only if genuinely needed

**Loading spinners:**
- Present tense ("Updating your basket" not "We're going to update your basket")
- Specific, not generic ("Verifying card details" not "Loading")
- Brief — a few words or one sentence
- Time expectations only if reliable
- Personality OK for rewards/fun contexts, not for payments/sensitive data

**Ratings:**
- Neutral tone — never leading
- Brief — not the user's primary goal
- Label clearly what's being rated
- No emotionally-charged star descriptions

**Emoji (if present):**
- Placed after text, not before or mid-sentence
- No repeated emojis
- Reinforces meaning, never replaces words
- Works in both light and dark mode
- Popular, widely understood emojis only
- No facial expressions unless universally understood

## Step 7: Accessibility and Inclusion Check

**Accessibility:**
- Links make sense out of context (screen reader users skip between links)
- All links on a page are unique
- Headings use correct hierarchy (H1 → H2 → H3, never skip)
- Headings under 65 characters
- All images have appropriate alt text (clear, accurate, concise)
- No images of text
- Forms have descriptive labels, no placeholder text
- Errors below their form field, blame-free, solution-focused
- No directional language ("above", "below", "left", "right")
- No sensory-only instructions ("tap the green button")
- Use "select" not "click" or "tap"
- Watch for heteronyms (read, live, close, content, invalid) — replace with unambiguous alternatives
- Stick to commas and full stops — avoid semicolons, dashes, brackets, asterisks
- Avoid abbreviations except universally understood ones (PDF, FAQ)
- Captions on all video, transcripts for audio
- Audio descriptions for videos with important visuals

**Inclusive language:**
- Gender-neutral pronouns (they, you, we)
- No "manpower", "mankind" — use "staffing", "humankind"
- "Attended/unattended" not "manned/unmanned"
- "Blocklist/allowlist" not "blacklist/whitelist"
- "Primary/main/source" not "master"
- "Inactive" or "not available" not "disabled" (for UI states)
- No "differently abled"
- No "fast/quick/easy" — use specific timeframes ("this usually takes 2 minutes")
- Person-first language ("disabled people" not "the disabled")
- No negative framing ("suffering from", "confined to a wheelchair")
- Don't call characters like à or š "special"
- Diverse names in examples
- No black/white/dark/light as value-laden metaphors (dark mode/light mode are fine)

**Audience-specific checks:**
- If content targets elderly users → extra attention to cognitive load, font readability
- If deaf users may encounter it → captions, visual alerts, plain language (English may be second language)
- If blind users → alt text, descriptive links, correct heading hierarchy
- If cognitive disabilities → visible instructions, no flashing, simple language, clean layout

## Step 8: Conversation Design Check

**Only apply if the content is for AI/chatbot/voice assistant.**

- **Quality** — Is the information accurate and honest?
- **Quantity** — Right amount of info? Not too little, not too much?
- **Relation** — Relevant to the user's question? Stays on topic?
- **Manner** — Organised, not rambling, clear language?
- **One-breath test** — Can you say the response in one breath? If not, it's too long
- **If it sounds written, rewrite it** — Read aloud; if it sounds like an essay, make it conversational
- **Active voice** — "I'll ask you a few questions" not "You'll be asked a few questions"
- **Simple words** — No jargon; a child should understand
- **Consistent terminology** — Don't switch between "agent" and "person" and "colleague" mid-conversation
- **Never blame the user** — Handle miscommunications gracefully
- **Personality alignment** — Friendly, empathetic, helpful. Not jokey about serious issues.

## Step 9: Glossary and Formatting Compliance

Check every term against the glossary:

| Don't use | Use instead |
|-----------|-------------|
| log in / log out | sign in / sign out |
| click / tap | select |
| bank | card issuer |
| reserve (a slot) | book (a slot) |
| staff, workers | colleagues |
| profile | account |
| fees | charges |
| assist, assistance | help |
| help desk | service desk |
| modify | change |
| passcode, OTP, PIN code | code |
| Marketplace partner | Marketplace seller / seller |
| fraud, suspicious activity | "we couldn't take your payment" |
| toggle | switch on / switch off |
| enable / disable | switch on / switch off |
| SMS | text |
| thank you | thanks |
| invalid | not working, not right, wrong |
| Ok, okay, O.K. | OK |
| just, only, simply (directions) | Remove — sounds patronising |

**Formatting checks:**
- Dates: "1 January 2000" not "01/01/2000" or "1st January"
- Times: "1.30pm" not "1:30pm" or "1.30 pm" or "13:30"
- Numbers: numerals by default, commas for thousands, % symbol
- Capitalisation: sentence case everywhere except nav menus, breadcrumbs, product names
- Pronouns: no "my" or "your" in UI elements (headings, buttons, menus, labels) — only in body copy when speaking to the user
- Brand terms: Clubcard, Clubcard Prices, Clubcard points (specific capitalisation); always "collect" points
- checkout (noun) vs check out (verb); sign in (verb) vs sign-in (noun/adjective); set up (verb) vs setup (noun)

## Step 10: Report and Rewrite

For **every issue found**, provide:

1. **The problem** — what's wrong, with the specific text quoted
2. **The rule** — which section of CLAUDE.md this violates
3. **Why it matters** — the reason behind the rule (accessibility, cognitive load, brand consistency, etc.)
4. **The rewrite** — a compliant version

**Group issues by severity:**

### Critical (must fix)
Accessibility violations, inclusive language failures, blame-the-user errors, missing alt text, broken heading hierarchy, sensory-only instructions.

### Important (should fix)
Principle violations, tone miscalibration, component structure errors, passive voice, missing CTA purpose, pattern inconsistency.

### Style (nice to fix)
Glossary term mismatches, formatting inconsistencies, unnecessary words, suboptimal sentence length, capitalisation issues.

**After the report:** provide a clean, fully rewritten version of the entire content with all issues resolved.
