---
name: transcreator
description: Transcreates content from Central European languages (Slovak, Czech, Hungarian) into English following the full Tesco Blueberry content design system. Not a word-for-word translation — this skill recreates intent, tone, and impact in English while applying all content design rules, accessibility standards, and glossary compliance. Delivers sign-off-ready English copy in 8 structured steps.
---

# Transcreator — CE to English

Transcreate content from Slovak, Czech, or Hungarian into English that fully complies with the Blueberry content design system. This is not translation — it's recreating the intent, emotion, and user impact in English while applying every content design rule.

Follow every step in order. Do not skip steps.

## Step 1: Receive and Analyse the Source

Accept the source content in Slovak, Czech, or Hungarian. Then identify:

| Field | What to capture |
|-------|-----------------|
| Source language | Slovak, Czech, or Hungarian |
| Content type | Button, link, heading, body copy, error message, modal, popover, loading spinner, push notification, chatbot response, email, form label, help article, or other |
| Platform/placement | App, web, mWeb, self-checkout, chatbot, email, push notification, colleague tool |
| Emotional context | What is the user likely feeling? (browsing, stressed, rushing, excited, confused, anxious) |
| Business goal | What should this content achieve? |
| User goal | What is the user trying to do? |

**If the user provides only the source text:**
- Infer content type, platform, and emotional context from the text itself
- State your assumptions and ask the user to confirm or correct
- Never block progress waiting for a perfect brief — infer what you can

**Produce a literal back-translation:**
- Provide a word-for-word English translation of the source to establish what the original says
- Flag any idioms, cultural references, or constructions that don't translate directly
- Note the tone of the original — is it formal, casual, playful, urgent?

## Step 2: Identify Source-Language Patterns and Risks

Central European languages have structural differences from English that create specific transcreation challenges. Identify which apply:

**Slovak / Czech:**
- Formal vs informal "you" (vy/ty, vy/ty) — English has only "you", but the formality level affects tone calibration
- Verb-first constructions may sound unnatural in English
- Diminutives (common in casual Slovak/Czech) — these carry warmth that must be recreated through word choice, not direct translation
- Grammatical gender applied to objects — irrelevant in English, don't let it leak through
- Long compound words — break into plain English phrases
- Diacritics in proper nouns — preserve in names (Košice, České Budějovice) but never call them "special characters"
- Reflexive verbs (prihlásiť sa, přihlásit se) — map to English equivalents, don't translate "oneself" literally
- Czech/Slovak tends toward longer sentences — English copy must be shorter (15 words target, 25 max)

**Hungarian:**
- Agglutinative structure — single Hungarian words often need multiple English words, watch character count
- Vowel harmony and suffixes — irrelevant in English but affects how concepts are split
- Subject-object-verb word order — restructure to English SVO
- Hungarian formal/informal (ön/te, magázás/tegezés) — same formality decision as Slovak/Czech
- Definite vs indefinite conjugation — doesn't exist in English, ignore
- Hungarian tends to be more direct/blunt than English — calibrate tone to match Blueberry warmth
- Long words (megszentségteleníthetetlenségeskedéseitekért) — obviously break these down

**For all three languages:**
- Source may use Latin-derived terms that have plain English equivalents — always choose the plain word
- Currency, date, and time formats differ — convert to Blueberry formatting rules
- Cultural references or local expressions — replace with universal alternatives
- The source may already violate content design principles in its own language — don't carry those problems over

**State the specific risks identified** before moving to the next step.

## Step 3: Determine Tone Calibration

Based on the content type and emotional context from Step 1, set the tone:

| Context | Lean towards |
|---------|-------------|
| Browsing, discovery | More personality/playfulness |
| Searching for something specific | More helpfulness |
| Booking/scheduling | Helpfulness — reduce cognitive load |
| Payment | Balance — milestone but high-stakes |
| Deals/savings | More personality — exciting moment |
| Returns/errors | Helpfulness — empathy, resolve quickly |
| Onboarding | Warmth + clarity |
| AI/chatbot | Friendly, empathetic, helpful |

**Compare the source tone with the target tone:**
- If the source is overly formal (common in Czech/Hungarian business copy), warm it up
- If the source is too casual (common in Slovak social/marketing copy), calibrate to context
- If the source uses humour that won't land in English, replace with Blueberry-appropriate warmth

**State the tone decision explicitly.** For example: "The Slovak source is formal (vy form, passive voice). The target is a browsing context, so I'm shifting to a warmer, more conversational English tone with personality."

## Step 4: Transcreate — Don't Translate

This is the core step. Write the English version from scratch, guided by the intent of the source — not its words.

**Process:**
1. Re-read the literal back-translation from Step 1
2. Set it aside
3. Ask: "If I were writing this content in English from a blank page for a Tesco UK customer, what would I write?"
4. Write that
5. Compare with the source intent — does it achieve the same goal? Adjust if needed

**Follow all Blueberry writing rules:**

- Plain, simple, everyday words (buy not purchase, help not assist)
- Active voice, present tense
- Contractions for natural tone ("you'll" not "you will")
- Sentence case everywhere
- No Latin (e.g., i.e., etc.), no ampersands, no "and/or"
- No idioms, metaphors, or figures of speech
- Verb-led CTAs that complete "I want to..."
- Sentences: aim for 15 words, never exceed 25
- Readability: Hemingway grade 6 or lower
- All glossary-compliant terms (select not click, sign in not log in, charges not fees, etc.)
- Gender-neutral pronouns
- No directional or sensory-only language
- No "my" or "your" in UI elements

**Apply component-specific rules** based on the content type:
- Buttons: 2-4 words, verb-led, sentence case
- Links: under 5 words, front-loaded, correct verb pattern
- Modals: heading + body + specific action verbs (no "Yes"/"No")
- Error messages: calm, blame-free, heading + body + CTA
- Loading states: present tense, specific, brief
- (Full rules in content-checker Step 6)

**Read-back test:** Read aloud. Would you say this to a friend? Would an 8-year-old understand? If it sounds translated, rewrite until it sounds native.

## Step 5: Verify Intent Preservation

Compare the transcreated English copy against the source:

| Check | Question |
|-------|----------|
| Core message | Does the English version communicate the same essential information? |
| User action | If the source tells the user to do something, does the English version tell them to do the same thing? |
| Emotional impact | Does the English version create a similar feeling? (reassurance, excitement, urgency, calm) |
| Business goal | Does the English version achieve the same business objective? |
| Nothing added | Have you introduced meaning that wasn't in the source? |
| Nothing lost | Have you dropped information that was important in the source? |

**Acceptable divergences:**
- Structure and word order will differ — that's expected
- Tone may be warmer or more casual in English — that's the Blueberry way
- Idioms and cultural references should be replaced — note what was changed and why
- Length may differ — English is often shorter than Czech/Slovak, but longer than Hungarian compressed forms

**Unacceptable divergences:**
- Different user action or CTA
- Missing critical information (deadlines, amounts, consequences)
- Changed meaning or intent
- Added marketing messages not in the source

Flag any intentional divergences and explain why.

## Step 6: Full Content Design Compliance Check

Run the transcreated copy through all checks from the content-checker skill:

1. **Principles scan** — Human, Clear, Inclusive, Helpful, Engaging
2. **Voice and tone** — correct position on the helpfulness-personality spectrum
3. **Content purpose** — serves at least one of: Context, Feedback, Guidance, Action
4. **Writing rules** — active voice, present tense, sentence length, readability, plain language, sentence case, contractions
5. **Component-specific rules** — button length, link patterns, modal structure, messaging structure
6. **Accessibility** — descriptive links, heading hierarchy, no directional language, "select" not "click", no heteronyms, screen reader friendly
7. **Inclusive language** — gender-neutral, person-first, no value-laden colour terms, no "fast/quick/easy"
8. **Glossary compliance** — every term checked against the glossary (sign in not log in, charges not fees, etc.)
9. **Formatting** — dates (1 January 2000), times (1.30pm), numbers (numerals, commas for thousands, % symbol), sentence case

**Fix all issues before proceeding.** If fixing creates a trade-off, note it.

## Step 7: Compile the Transcreation Brief

Present the complete deliverable:

---

### Source text
The original content in the source language.

### Literal back-translation
Word-for-word English translation showing what the source says literally.

### Transcreated English copy (recommended)
The final, sign-off-ready English version.

### Transcreation notes
For each significant departure from the literal translation, explain:
- **What changed** — the specific word, phrase, or structure
- **Why** — the content design rule or principle that drove the change
- **Impact** — how this improves the user experience vs a direct translation

### Tone calibration
- Source tone: (formal/informal/casual/urgent/playful)
- Target tone: (the Blueberry-calibrated tone for this context)
- Shift applied: (what changed and why)

### Intent verification
- Core message preserved: yes/no (with notes)
- User action preserved: yes/no
- Emotional impact preserved or improved: yes/no
- Any intentional divergences: listed with rationale

### Content design compliance
- Principles: all 5 pass
- Readability: Hemingway grade (should be 6 or lower)
- Glossary: all terms compliant
- Accessibility: all checks pass
- Component rules: all applicable rules pass

### Localisation notes (reverse)
Flag anything in the English version that might cause issues if the content later needs to work across other CE markets:
- Words that are notably longer/shorter in Slovak/Czech/Hungarian
- Concepts that don't translate back easily
- UK-specific references that may need local equivalents

---

## Step 8: Iterate and Handoff

Present the full brief to the user.

If they request changes:
1. Revise the English copy
2. Re-run the compliance check (Step 6)
3. Update the brief
4. Present again

Repeat until approved.

**Before final handoff, confirm:**
- The English copy is ready for sign-off without further content design review (all rules applied)
- Any trade-offs are documented
- The user knows which divergences from the source are intentional and why

**Output the final English copy cleanly** — ready to paste into design tools, development tickets, or content management systems.
