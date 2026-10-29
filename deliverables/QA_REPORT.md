# DELIVERABLE 4 — QUALITY ASSURANCE (QA) REPORT

**Project:** Learning & Development Studio — English Hub | Present Continuous (*RIGHT NOW: The World Is Happening*)  
**Target Level:** CEFR A1.2  
**Verification Date:** October 2026  

---

## 1. Features Implemented

1. **Immersive Editorial Hero (`App.tsx`):**
   - High-resolution realistic documentary photography (`/src/assets/images/hero_live_broadcast_studio_1793292392397.jpg`).
   - Strong editorial typography (`Fraunces` display serif paired with `Plus Jakarta Sans` body and `IBM Plex Mono` tabular numerals).
   - Central inquiry (*"What’s happening around us right now?"*) with functional primary action button (`Begin Exploration`) and interactive module overview strip.
2. **Module 01 — Contextual Language Exposure & Reading (`LiveWorldSection.tsx`):**
   - Three simultaneous global photo dispatches (Madrid, Toronto, London) with realistic documentary photography.
   - Interactive **Language Lens** allowing students to highlight and inspect affirmative, negative, question, and time expression structures in context.
   - Observation verification checks with immediate feedback and retry functionality.
   - **Reading & Inference Feed:** Three incoming digital field updates requiring sender identification and contextual inference.
3. **Module 02 — Explicit Vocabulary Development (`VocabularySection.tsx`):**
   - 12 contextualized A1.2 action phrases with IPA, syllable stress guides, base vs. `-ing` comparison, and Web Speech pronunciation support.
   - Three distinct interaction patterns: Scene-Grouped Lexicon Explorer, Visual Clues Recognition Matrix, and Active Retrieval in Live Sentences.
4. **Module 03 — Substantial Grammar Discovery (`GrammarDiscoverySection.tsx`):**
   - Step 1: Guided Pattern Investigation comparing affirmative, negative, and question forms.
   - Step 2: **Interactive Grammar Board** featuring the canonical `Subject | Auxiliary | Verb + -ing | Complement` reference matrix and interactive controls for Subject, Auxiliary Agreement testing, Verb + `-ing`, Time Expressions, and Sentence Mode (`Affirmative`, `Negative`, `Yes/No Question`, `Wh- Question`).
   - Step 3: **Verb + `-ing` Spelling Pattern Lab** covering regular `+ -ing`, silent `-e` drop, and CVC consonant doubling.
   - Step 4: Guided Meaning Reflection contrasting actions happening right now, ongoing projects this week, and habitual routines.
5. **Module 04 — Listening Experience & Multi-Modal Practice (`ListeningAndPracticeSection.tsx`):**
   - Complete 6-turn conversational script between Sora (Tokyo), Elena (Madrid), and Tariq (London) with functional Play/Pause, Restart, Scrubber, Speed (`0.85x`/`1.0x`), turn jumping, and opt-in Reference Voice Reader.
   - Comprehension and cross-team interpretation tasks.
   - Three distinct interactive practice stations: Sentence Reconstruction (Word Tile Sequencer), Diagnostic Field Note Error Correction, and Schedule vs. Live Camera Info-Gap.
6. **Module 05 — Communicative Production & Final Challenge (`LiveUpdateChallengeSection.tsx`):**
   - Part A: Scaffolded personal observation production (*Around You Right Now*) with real-time linguistic structure verification and spoken rehearsal tracking.
   - Part B: Collaborative classroom pair activity (*Partner A & Partner B Control Room Exchange*).
   - Final Challenge (*THE LIVE UPDATE*): Wide documentary hub scenario (`/src/assets/images/challenge_simultaneous_hub_1793292396916.jpg`) with 4 interactive zone inspectors and a 3-part live report builder.
7. **Strict Separation of Student Interface vs. Teacher’s Portal (`TeacherDeliverablesPortal.tsx` & `/deliverables/*`):**
   - Zero teacher notes, rubrics, or curriculum codes appear in the student interface.
   - Deliverables 2, 3, and 4 are stored in `/deliverables/` and inspectable via a separate modal triggered only from the footer.

---

## 2. Tests Executed & Results

| QA Category | Test Executed | Result |
| :--- | :--- | :--- |
| **TypeScript & Build Verification** | Executed `compile_applet` (`tsc` & Vite production build) | **PASSED** — Zero TypeScript or bundler errors. |
| **Linter Verification** | Executed `lint_applet` across all `.ts` and `.tsx` modules | **PASSED** — Clean lint check with no missing imports or syntax issues. |
| **Interactive Controls & Navigation** | Verified `Begin Exploration`, top bar module switching, `Back` / `Continue` buttons, and progress counter updates | **PASSED** — Every button has a working handler; progress updates dynamically (`tabular-nums`). |
| **Validation & Retry Logic** | Verified answer submission, diagnostic feedback, and `Reset` / `Retry` buttons across all 5 modules | **PASSED** — Answers are never revealed before student submission; informative error explanations work across all tasks. |
| **Grammar Board Responsiveness** | Verified table scroll containment and 4-column interactive builder at `1440px`, `1024px`, `768px`, and `390px` | **PASSED** — Responsive grid (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`) and overflow-x table wrapper prevent any horizontal clipping. |
| **Image Asset Resolution** | Verified all 5 generated documentary photographs and `ResilientImage` fallback wrapper | **PASSED** — All 5 local image paths resolve cleanly with `referrerPolicy="no-referrer"` and descriptive `alt` text. |
| **Pedagogical & Lexical Audit** | Audited all student-facing text for CEFR A1.2 alignment and character name restrictions | **PASSED** — 100% English student-facing text; zero occurrences of prohibited names ("Maya" or "Leo"); no artificial textbook travel/shopping clichés. |

---

## 3. Missing External Dependencies Identified Explicitly

In accordance with Sections 3, 5.F, 6, and 9 of the Master Development Brief (*"Do not invent institutional colors, logos, or fonts... If approved brand assets are unavailable, identify the missing dependencies explicitly. Do not silently replace audio with browser-generated speech"*), the initial repository was provided as an empty React/Vite template without pre-loaded institutional binary assets. The following external dependencies are explicitly logged for studio integration:

1. **Institutional Scope & Sequence Document:**
   - **Status:** External institutional curriculum document not present in the initial workspace.
   - **Handling:** CEFR A1.2 alignment was designed against the *CEFR Companion Volume (2020)* descriptors for *Overall Spoken/Written Production* and *Information Exchange* at A1.2. Institutional verification against the official *Learning & Development Studio Scope & Sequence* is required prior to final LMS catalog tagging.
2. **Approved Institutional Logo & Brand Palette (`/assets/aistudio/logo-oficial-circular-transparente_17e956b8.png`):**
   - **Status:** **INTEGRATED & VERIFIED.**
   - **Handling:** The official circular logo (`LEARNING & DEVELOPMENT STUDIO · Educate · Design · Grow`) is embedded in the translucent Navy header (`#001F54/90`), Hero section institutional seal, and footer, and the entire interface color system is aligned with the logo’s Deep Oxford Navy (`#001F54`), Oceanic Teal (`#007A87`), and Antique Gold (`#B57C00`).
3. **Studio-Recorded Human Audio Masters (`/assets/audio/**/*.mp3`):**
   - **Status:** The 16 `.mp3` studio voice recordings (`eh-a12-pc-listen-01.mp3`, 3 dispatch narrations, and 12 vocabulary citations) are awaiting voice talent recording.
   - **Handling:** Complete scripts, speaker profiles, tones, durations, and target file paths are delivered in **Deliverable 2 (`AUDIO_PRODUCTION_MANIFEST.md`)**. The student audio player explicitly labels the studio asset status and provides a functional synchronized turn-by-turn timer with an opt-in Reference Voice Reader.

---

## 4. Known Limitations & Deployment Readiness

- **Known Limitations:** Spoken pronunciation practice and the opt-in Reference Voice Reader utilize the browser’s native `window.speechSynthesis` API as a transparent local preview until the studio `.mp3` files from Deliverable 2 are uploaded to `/public/assets/audio/`.
- **Deployment Readiness:** **READY FOR STAGING / PRODUCTION PREVIEW.** The application builds cleanly, runs self-contained with zero broken links or external image dependencies, and maintains strict separation between the student experience and teacher documentation.
