---
name: copy-creator
description: Creates new content of any type following the Tesco Blueberry content design system. Gathers context flexibly, writes content, runs the content checker, and delivers a full brief with rationale, variants, readability, accessibility notes, and localisation considerations. Use when writing any new content for the project.
---

# Copy Creator

Create new content that fully complies with the Blueberry design system. Follow every step in order. Do not skip steps.

## Step 1: Gather the Brief

Accept whatever the user provides — a full brief, a rough idea, or just a sentence. Then identify what's missing and ask **only** for the gaps.

**Required context (infer from project files and conversation where possible):**

| Field | What to capture |
|-------|-----------------|
| Content type | What are we writing? (button, error message, modal, heading, body copy, push notification, email, chatbot response, help article, loading state, etc.) |
| Business goal | What does the business want this content to achieve? |
| User goal | What is the user trying to do? What job are they getting done? |
| Audience | Who will read this? (customers, colleagues, suppliers — and any specifics: age, literacy, accessibility needs) |
| Platform/placement | Where will this appear? (app, web, mWeb, self-checkout, chatbot, email, push notification) |
| Emotional context | What is the user likely feeling at this point? (browsing, stressed, rushing, excited, confused, anxious) |
| Constraints | Character limits, space restrictions, technical limitations, legal requirements |

If the user provides all of this, validate it and move on. If they provide a rough idea, ask for the missing fields one at a time. Never ask for something you can reasonably infer.

## Step 2: Determine Tone Calibration

Based on the brief, map the content to the correct position on the helpfulness-vs-personality spectrum:

| Context | Lean towards |
|---------|-------------|
| Browsing, discovery | More personality/playfulness |
| Searching for something specific | More helpfulness |
| Booking/scheduling | Helpfulness — reduce cognitive load |
| Payment | Balance — milestone moment but high-stakes |
| Deals/savings | More personality — exciting moment |
| Returns/errors | Helpfulness — empathy, resolve quickly |
| Onboarding | Warmth + clarity |
| AI/chatbot | Friendly, empathetic, helpful — never jokey about serious issues |

**State the tone decision explicitly** before drafting. For example: "This is a payment error, so I'm leading with helpfulness — calm, clear, empathetic. Minimal personality."

## Step 3: Identify Content Purpose

Classify which of the 4 UX writing purposes this content serves:

- **Context** — Where am I? How did I get here?
- **Feedback** — What just happened? Why?
- **Guidance** — What do I need to know? What helps me progress?
- **Action** — What can I do here?

If the content doesn't serve at least one of these, challenge whether it's needed at all. Content without purpose is clutter.

**For AI/chatbot content**, apply Grice's maxims instead:
- Quality (accurate), Quantity (right amount), Relation (relevant), Manner (clear)

**State the purpose explicitly** before drafting.

## Step 4: Check the Content Library and Existing Patterns

Before writing anything new:

1. **Check reusable templates** — Does the CLAUDE.md content library have a template for this content type?
   - Messaging: heading + body + CTA structure with type-specific templates (error, warning, success, info, amend)
   - Modals: confirmation, permission, multiple-choice templates
   - Buttons: reusable CTA patterns by action type
   - Links: verb pattern library (View, Go to, Browse, Find, Learn more about, Read)
   - Popovers: explanation, guidance, reassurance templates
   - Loading spinners: basic, with time, with warning templates
   - Ratings: question title and instruction title templates

2. **Check existing patterns** — Is there similar content already in the project? The new copy must be consistent with existing terminology, structure, and patterns. Using different words for the same action creates confusion.

If a template fits, start from it. If existing patterns exist, align with them. If this is genuinely net-new, note that.

## Step 5: Draft the Primary Copy

Write the content following all Blueberry rules:

**Language:**
- Plain, simple, everyday words (buy not purchase, help not assist)
- Active voice, present tense
- Contractions for natural tone
- Sentence case everywhere
- No Latin (e.g., i.e., etc.), no ampersands, no "and/or"
- No idioms, metaphors, or figures of speech

**Structure:**
- Verb-led CTAs that complete "I want to..."
- Sentences: aim for 15 words, never exceed 25
- Readability: Hemingway grade 6 or lower
- Scannable: headings, bullets, bold where appropriate
- Component-specific structure from the content library templates

**Terminology:**
- Use glossary-compliant terms (select not click, sign in not log in, help not assist, account not profile, charges not fees, etc.)
- Consistent with existing patterns in the project

**Inclusive and accessible:**
- Gender-neutral pronouns
- Person-first disability language
- No directional or sensory-only language
- Descriptive links that make sense out of context
- No "my" or "your" in UI elements (only in body copy)

**Read-back test:** Read the draft out loud. Would you actually say this to someone? Would an 8-year-old understand it? Would your grandma look puzzled? If it sounds written, rewrite it until it sounds spoken.

## Step 6: Consider Emoji

Evaluate whether the content type and context could benefit from emoji:

**Potentially appropriate:** push notifications, casual in-app messaging, celebratory success messages, Clubcard rewards
**Not appropriate:** errors, payments, legal content, form labels, headings, modals, loading states

If adding emoji:
- Place after the text, never before or mid-sentence
- Use only one, never repeat
- Choose popular, widely understood emojis
- Must work in both light and dark mode
- Must reinforce meaning, not replace words
- Avoid facial expressions — not universally understood

If not appropriate, skip this step entirely.

## Step 7: Create Variants

Produce 2-3 alternative versions. Each variant should differ in a meaningful way:

**Possible variation axes:**
- **Tone level** — more helpful vs more personality
- **Length** — full version vs space-constrained version
- **Platform** — app vs web vs mWeb
- **Emotional state** — user is calm vs user is frustrated
- **Audience** — customer vs colleague

**Label each variant** with:
- Its position on the tone spectrum
- The context/use case it's designed for
- How it differs from the primary copy

Variants are not random rewrites — each should serve a specific scenario the user might face.

## Step 8: Run the Content Checker

Apply all 10 steps of the `content-checker` skill against the primary copy AND all variants:

1. Classify the content
2. Principles scan (Human, Clear, Inclusive, Helpful, Engaging)
3. Voice and tone audit
4. Content purpose check
5. Writing rules check
6. Component-specific rules
7. Accessibility and inclusion check
8. Conversation design check (if applicable)
9. Glossary and formatting compliance
10. Report and rewrite

**Fix all issues before presenting to the user.** If fixing an issue creates a trade-off (e.g., a CTA needs 5 words because 4 loses clarity), note the trade-off explicitly.

## Step 9: Compile the Full Brief

Present the complete deliverable in this structure:

---

### Primary Copy
The recommended version, ready to use.

### Variants
2-3 alternative versions, each labelled with:
- Tone position (e.g., "More personality" or "Maximum helpfulness")
- Target context (e.g., "For space-constrained mWeb" or "If the user is frustrated")

### Rationale
Key decisions explained:
- Why this word over alternatives
- Why this structure
- Why this tone level
- Any trade-offs made and why

### Content Purpose
Which of the 4 purposes this content serves (Context, Feedback, Guidance, Action) — or which of Grice's maxims for chatbot content.

### Readability
- Target Hemingway grade (should be 6 or lower)
- Average sentence length
- Any complex words flagged and justified

### Accessibility Notes
- Screen reader considerations (how will this be announced?)
- Alt text needs (if images are involved)
- Heading hierarchy (if headings are involved)
- Audience-specific notes (e.g., "This checkout flow may be used by elderly users — cognitive load is minimised with short sentences and visible instructions")

### Localisation Flag
- Words or phrases that might cause issues in translation
- Character-length risks (short English words that may be longer in Slovak, Czech, Hungarian)
- Cultural references that may not translate
- If none: "No localisation risks identified"

### Glossary Compliance
Confirmation that all terminology matches house style. List any notable glossary decisions (e.g., "Used 'select' not 'tap' per glossary").

### Data Suggestion
Recommend whether this copy should be:
- A/B tested (if there's genuine uncertainty about which version performs better)
- Checked against customer language on feedback channels
- Validated with user research
- Or is low-risk enough to ship as-is

---

## Step 10: Iterate and Handoff

Present the full brief to the user.

If they request changes:
1. Revise the copy
2. Re-run the content checker (Step 8)
3. Update the brief
4. Present again

Repeat until approved.

**Before final handoff, recommend:**
- For high-stakes content (payment, errors, legal-adjacent, anything seen by millions): get a content designer to review before build
- For standard content: approved brief is ready to implement

**Once approved:** the content is ready for development. Note any implementation considerations (e.g., "The error message body copy is dynamic — it needs to accept a variable for the specific error reason").
