# China Trip Check MVP Design Specification

**Date:** 2026-07-14  
**Status:** Approved design draft  
**Source documents:**

- `China_Ready_全量需求分析报告_V1.0.md`
- `China_Ready_赴华旅行风险检查工具站_系统设计说明书_V1.1.md`
- `China_Ready_外国游客赴华旅行操作指南平台_系统设计说明书_V1.0.md`

## 1. Product decision

China Trip Check is an English, mobile-first pre-trip risk checking website for international visitors to China. It is not a general travel guide, itinerary generator, booking platform, or destination directory. The original project documents and internal project directory use the working name China Ready; all public-facing product copy uses China Trip Check.

Brand and domain rules:

- Canonical production domain: `https://chinatripcheck.com`
- Public brand name: `China Trip Check`
- Navigation wordmark: `ChinaTripCheck`
- Browser title suffix: `China Trip Check`
- Social sharing and structured-data organization name: `China Trip Check`
- Public copy must not display the old China Ready working name.

The first release helps users identify problems that could prevent payment, increase booking risk, or cause a failed hotel arrival. It converts answers into conservative, specific, ordered actions.

The approved positioning is:

> Find the risks before they disrupt your China trip.

Supporting copy:

> Check your payments, travel dates and hotel arrival before you leave.

Primary call to action:

> Check my trip

Secondary call to action:

> See how it works

## 2. MVP scope

The release contains four working tools:

1. China Readiness Check
2. Payment Setup Check
3. Travel Date Check
4. Hotel Arrival Check

The release also contains:

- a focused homepage;
- shared questionnaire, rule, scoring, and result systems;
- local draft and report persistence;
- essential explanatory guide content supporting the four tools;
- privacy, methodology, and disclaimer content;
- responsive and accessible layouts;
- extension boundaries for future email delivery and analytics.

The exact supporting guide set is:

1. How to test a mobile payment setup before visiting China
2. What to do if a foreign card fails in China
3. Why a travel eSIM may not receive bank verification messages
4. Why one payment method is not enough in China
5. How Chinese public holidays affect train tickets and hotel bookings
6. Whether to travel during China National Day
7. How to confirm late hotel check-in in China
8. Why to save a hotel name and address in Chinese

This list is the complete MVP guide scope. Additional guide titles from the source documents are deferred.

The release does not contain:

- a dedicated train station or transfer checker;
- references, cards, navigation items, or coming-soon labels for unbuilt tools;
- user accounts;
- a database;
- real email delivery;
- analytics service credentials;
- artificial intelligence;
- real-time travel, hotel, ticket, or crowd APIs;
- a PWA or native app;
- payment or booking functionality;
- a nationwide hotel, attraction, or station database;
- multilingual content.

Basic train preparedness can be checked inside China Readiness when it affects ticket issuance or passport matching. It is not presented as an independent product feature.

## 3. Users and success criteria

### 3.1 Primary users

- First-time independent visitors to China
- Visitors who already booked flights or hotels but fear preparation gaps
- Business visitors with late arrival, payment, or communication risks

### 3.2 Primary user outcome

Within two to four minutes, a user can identify concrete blockers, understand why they matter, and receive an ordered list of actions to complete before departure.

### 3.3 Product success signals

- Users start a check from the homepage.
- Users complete a check without registration.
- Results contain specific rather than generic findings.
- Users understand the first action to take.
- Users can resume an unfinished questionnaire after a refresh.
- Users can clear all locally saved answers and reports.

## 4. Information architecture

### 4.1 Primary navigation

- ChinaTripCheck wordmark linking to the homepage
- Checks
- How it works
- About
- Check my trip button

Navigation must not mention unbuilt functionality.

### 4.2 Main routes

- `/` homepage
- `/checks` checks overview
- `/checks/readiness` China Readiness Check
- `/checks/payment` Payment Setup Check
- `/checks/dates` Travel Date Check
- `/checks/hotel-arrival` Hotel Arrival Check
- `/guides` essential guide index
- `/guides/[slug]` guide detail
- `/how-it-works` method and privacy explanation
- `/about` product purpose and limitations

Questionnaire and report states may use nested route segments or internal view state. Sensitive or personal answers must never be encoded in URLs.

### 4.3 Main user flow

```text
Homepage
→ full check or specialist check
→ short introduction and estimated time
→ one-question-at-a-time questionnaire
→ deterministic local rule evaluation
→ actionable risk report
→ edit answers, restart, or open another relevant working check
```

## 5. Page design

### 5.1 Homepage

The homepage contains:

1. Simple navigation
2. Risk-focused hero with primary and secondary actions
3. Small visual preview of a result summary
4. Four-tool bento section
5. How the checks work
6. Privacy, conservative guidance, and review-date trust statements
7. Essential supporting guides
8. Final check call to action
9. Footer with method, privacy, disclaimer, and review information

The tool section uses a cool white and pale blue-grey background. The China Readiness card is the blue visual anchor. The remaining three tools fill the grid without an empty cell.

### 5.2 Questionnaire

The questionnaire uses a focused single-question layout:

- clear tool name and step count;
- progress bar;
- one decision per step;
- concise explanation where context is necessary;
- large answer targets;
- an explicit `I'm not sure` option where uncertainty is meaningful;
- Back, Continue, Save and exit controls;
- visible validation for unanswered required questions;
- automatic local draft persistence;
- safe restoration after refresh;
- restart and clear controls.

The interface must not ask for passport numbers, card numbers, hotel order numbers, or other sensitive credentials.

### 5.3 Result report

The result report uses a calm upper section and a denser decision area. It includes:

1. Overall status
2. Readiness score as secondary context
3. Critical, High Risk, and Ready counts
4. De-duplicated risk findings
5. Plain-language explanations
6. Ordered actions
7. Backup plan
8. Relevant guide links
9. Another relevant working check, when applicable
10. Last-reviewed date
11. Conservative disclaimer
12. Edit answers, restart, and clear report actions

Risk findings are more important than the numerical score. The report must never imply certainty about a specific bank, hotel, ticket, or provider.

## 6. Visual system

The visual direction combines:

- the clean structure and reassurance of the approved modern service concept;
- editorial warmth in typography and selected content surfaces;
- compact technical status language only inside risk and report components.

### 6.1 Palette

- Main canvas: white
- Secondary surfaces: cool white and pale blue-grey
- Primary action: saturated accessible blue
- Critical: red
- High Risk: orange
- Ready: green
- Information: blue
- Pending: grey
- Warm accent: limited to small editorial notes, image lighting, or selected guide surfaces

Large yellow, beige, or warm-tinted section backgrounds are not used. Warm tones must not compete with the blue action system.

### 6.2 Typography

- Editorial display serif for major marketing headings
- Highly legible sans serif for navigation, forms, reports, and body content
- Strong size and weight hierarchy
- Short line lengths on questionnaire and result copy

The display type should give the brand personality without making the product resemble a corporate software landing page.

### 6.3 Shape and layout

- Soft but controlled corner radius system
- Minimal shadows
- Generous whitespace on marketing and questionnaire surfaces
- Tighter spacing only in report metrics and risk lists
- Bento composition for the tool chooser, with no empty grid areas
- One-column mobile collapse in reading and action order

### 6.4 Imagery

Use a small number of warm, authentic travel images or illustrations. Imagery supports reassurance and context rather than decoration. It must not dominate the questionnaire or risk report.

### 6.5 Accessibility

- WCAG AA color contrast
- Color never acts as the only status indicator
- Visible keyboard focus
- Semantic headings and landmarks
- Large touch targets
- Error messages connected to inputs
- Reduced-motion support
- Screen-reader progress and status announcements
- No forced animation or automatic carousel

## 7. Technical architecture

The implementation uses a configuration-driven Next.js application:

```text
Next.js application
├── static marketing and guide pages
├── shared questionnaire renderer
├── typed tool configurations
├── deterministic rule engine
├── shared result renderer
├── local persistence adapter
└── extension adapters for future email and analytics
```

### 7.1 Technology

- Next.js
- React
- TypeScript
- Tailwind CSS
- Static generation where possible
- Client components only for questionnaire interaction and local persistence
- Browser localStorage through a guarded persistence adapter

No server runtime is required for core checks.

### 7.2 Module boundaries

Each unit has one responsibility:

- Tool catalog: public metadata and route mapping
- Question configuration: prompts, choices, help, validation
- Rule configuration: conditions, severity, findings, and actions
- Rule engine: pure evaluation with no UI dependency
- Scoring: pure score and status calculation
- Finding merger: groups related triggers into one user-facing risk
- Questionnaire state: navigation, validation, and answer updates
- Persistence adapter: versioned local draft and report storage
- Report presenter: severity grouping and ordered actions
- Guide catalog: supporting static content and review metadata

## 8. Data models

### 8.1 Question

Questions contain:

- stable identifier;
- tool identifier;
- prompt;
- optional explanation;
- answer type;
- required flag;
- options;
- validation rules;
- accessibility label;
- conditional visibility when needed.

Supported MVP answer types are single choice, multiple choice, date, time, and short non-sensitive text.

### 8.2 Risk rule

Rules contain:

- stable code;
- tool identifier;
- status and review metadata;
- `all` or `any` conditions;
- severity;
- finding group;
- title;
- explanation;
- ordered actions;
- backup advice;
- related guides;
- optional related working check.

### 8.3 Holiday event

Holiday events contain official start and end dates, conservative pre-risk and post-risk windows, affected cities, and travel categories. The MVP uses maintained static data and does not predict live crowd levels or prices.

The first dataset covers officially published 2026 national holiday arrangements and clearly labeled seasonal risk periods. The interface does not invent future official dates. A trip outside the verified dataset receives a review-needed information message rather than a fabricated holiday assessment.

### 8.4 Report

Reports contain:

- tool identifier;
- schema version;
- generated timestamp;
- overall status;
- score;
- severity counts;
- merged findings;
- ordered actions;
- backup plan;
- related guides;
- last-reviewed date.

## 9. Rule and scoring behavior

The rule engine is pure and deterministic. It supports equality, inequality, inclusion, absence, number comparison, date overlap, and grouped conditions.

Rules are evaluated in this order:

1. Normalize typed answers.
2. Validate required answers.
3. Evaluate active rules.
4. Group matching rules by finding group.
5. Keep the strongest severity in each group.
6. Merge explanations and remove duplicate actions.
7. Sort findings by severity and configured priority.
8. Calculate score and overall status.

An uncertain answer can produce a conservative Information or High Risk finding depending on consequence. It must not automatically become Critical unless the user's available path is genuinely blocked.

The score summarizes preparedness. Critical blockers and High Risks remain the primary output.

## 10. Local persistence and privacy

Draft answers and recent reports are saved locally with schema versions. Each tool has an independent storage key so a damaged entry does not affect other tools.

On load:

1. Read the saved entry in a browser-only guard.
2. Validate its schema version and shape.
3. Restore valid data.
4. Discard invalid data and show a quiet recovery notice.

Users can clear a single tool or all locally stored China Trip Check data. The interface explicitly states that no account is required and answers remain on the current device.

## 11. Error and edge-case handling

- Required unanswered questions block progression with an inline message.
- Invalid dates are rejected before evaluation.
- A departure date earlier than arrival is rejected.
- A direct result-page visit without a valid report returns the user to the tool introduction.
- Unknown tool or guide slugs render a normal not-found page.
- Corrupt local storage resets only the affected entry.
- An invalid rule is omitted from production output and exposed during development or tests.
- Empty risk groups produce a positive but conservative ready state.
- Browser storage unavailability falls back to an in-memory session without blocking the check.

## 12. Content and trust

Visible product copy is English. It uses friendly, direct language and avoids insurance, legal, or alarmist tone.

Each tool and guide displays:

- last reviewed date;
- what the tool can and cannot determine;
- conservative verification advice;
- source or methodology notes where relevant.

The site must not promise that a bank card will work, a hotel will accept a guest, or a booking will succeed.

## 13. Testing strategy

### 13.1 Unit tests

- condition operators;
- grouped conditions;
- date overlap and risk windows;
- severity ordering;
- finding merging;
- action de-duplication;
- scoring and overall status;
- local persistence validation and migration behavior.

### 13.2 Component tests

- required-answer validation;
- back and continue navigation;
- progress calculation;
- conditional question visibility;
- result metric rendering;
- clear and restart actions;
- accessible names and status announcements.

### 13.3 Integration tests

Each of the four tools has at least:

- a low-risk completion path;
- a high-risk path;
- a critical path;
- an uncertain-answer path;
- refresh and resume coverage.

### 13.4 End-to-end and visual checks

- homepage to each tool and result;
- mobile and desktop layouts;
- keyboard-only questionnaire completion;
- invalid date behavior;
- direct result URL recovery;
- local data clearing;
- no appearance of out-of-scope tools;
- production build and static rendering;
- visual review in a real browser at common viewport sizes.

## 14. Implementation acceptance

The MVP is complete when:

- all four tools use real configuration and deterministic rules;
- all four produce specific, merged, ordered reports;
- drafts resume safely after refresh;
- local data can be cleared;
- no out-of-scope tool is presented anywhere;
- the approved cool-neutral visual system is implemented responsively;
- critical paths are keyboard accessible;
- tests and production build pass;
- key pages are visually verified on desktop and mobile.
