# AptiPass English — Market Coverage & Research Log

Phase 0.4 expanded the service universe from 6 to 38 services. This
document records how that research was done, what was registered vs.
rejected, and what is known to still be missing — so a future phase
doesn't have to redo this research from scratch.

## Sourcing

Two sources were used:

1. **AptiPass Decision Engine's Service Intelligence**
   (`ai-decision-engine/src/lib/service-intelligence/seedServices.ts`,
   read-only). 16 English-learning-market services were reused from
   there — that project's own doctrine requires a primary-source check
   ("公式サイトで確認") before a fact is recorded, so those records were
   treated as `evidenceStatus: "verified"` here too. Ranking/Affiliate
   fields were **not** copied — only product-shape facts (features,
   pricing model shape, trial availability, business/exam focus,
   official URL).
2. **Fresh web research this session** (WebSearch), for 16 additional
   services not present in that dataset. Where a fact traced directly to
   the service's own official domain in the search results, it's marked
   `verified`; where the strongest available signal was third-party
   aggregator/review content (even though the official URL itself was
   confirmed), it's marked `partial`. No price/trial figures from this
   tier are stated as exact numbers anywhere in the UI — only the coarse
   `pricingModel` / `trialAvailability` category is shown.

## Market Coverage Map

| Market (category) | Product shapes present | Services registered |
|---|---|---|
| オンライン英会話 (online) | 受け放題型 / 予約制多国籍型 / フィリピン人講師型 / ネイティブ型 / 日本人講師型 / 家族シェア型 / ビジネス特化型 | NativeCamp, Cambly, DMM英会話, QQEnglish, Bizmates, レアジョブ英会話, MeRISE英会話, Kimini英会話, 産経オンライン英会話Plus, EF English Live, Weblio英会話, クラウティ, hanaso, ECCオンラインレッスン, ワールドトーク (15) |
| AI英会話 (ai) | 自由対話型AI / シナリオ型AI / ビジネス特化AI / 発音特化AI | Speak, ELSA Speak, スピークバディ, ディアトーク, TORAbit, スピフル, abceed (7 — some also apps/pronunciation) |
| 英語学習アプリ (apps) | 総合学習型 / 単語特化 / 試験対策特化 / 添削・シャドーイング特化 / ビジネス瞬発力特化 | Duolingo, スタディサプリENGLISH, abceed, Santaアルク, TORAbit, スピフル, BizSprinto, BoldVoice, mikan, シャドテン (10) |
| TOEIC・試験対策 (toeic) | 総合アプリ内コース / 試験特化アプリ / コーチング内の試験対策 | スタディサプリENGLISH, abceed, Santaアルク, Liberty English Academy (4) |
| ビジネス英語 (business) | オンライン英会話のビジネスコース / ビジネス特化スピーキングアプリ / ビジネス特化コーチング | DMM英会話, Bizmates, レアジョブ英会話, EF English Live, ディアトーク, スピフル, BizSprinto, スタディサプリENGLISH, PROGRIT, トライズ, STRAIL (11) |
| 英語コーチング (coaching) | 短期集中設計型 / 長期ネイティブ伴走型 / コンサルティング特化型 / 学習管理特化型 | PROGRIT, トライズ, ENGLISH COMPANY, RIZAP ENGLISH, STRAIL, Liberty English Academy (6) |
| 子ども英語 (kids) | 子ども専門オンライン英会話 / ネイティブ講師ゲーム型 / 家族シェア型の子ども利用 | グローバルクラウン, QQキッズ, Novakid, 産経オンライン英会話Plus, クラウティ (5) |
| 発音・スピーキング (pronunciation) | AI発音診断特化 / シャドーイング添削 / AIオールインワン | ELSA Speak, BoldVoice, TORAbit, シャドテン (4) |

All 8 categories now have at least one registered service (previously
5 of 8 were empty placeholders — see Phase 0.3 report). All 12 goals now
resolve to at least one service.

## Registered (38)

See `src/data/services.ts` for the full structured record of each.
Names: NativeCamp, Cambly, DMM英会話, QQEnglish, Bizmates, レアジョブ英会話,
MeRISE英会話, Kimini英会話, 産経オンライン英会話Plus, EF English Live,
Weblio英会話, クラウティ, hanaso, ECCオンラインレッスン, ワールドトーク,
Speak, ELSA Speak, AI英会話スピークバディ, ディアトーク, Duolingo,
スタディサプリENGLISH, abceed, Santaアルク, TORAbit, スピフル,
BizSprinto, BoldVoice, mikan, シャドテン, PROGRIT, トライズ,
ENGLISH COMPANY, RIZAP ENGLISH, STRAIL, Liberty English Academy,
グローバルクラウン, QQキッズ, Novakid.

## Rejected / not registered

| Service | Status | Reason |
|---|---|---|
| Grammarly | `PRODUCT_SHAPE_OUT_OF_SCOPE` | Confirmed via its own site/Wikipedia description: a general-purpose AI writing assistant used across 1M+ apps by native and non-native writers alike (now positioned under parent brand "Superhuman"). It has no lesson structure, curriculum, or proficiency tracking — its product shape is proofreading/productivity, not English learning. |
| Quizlet | `PRODUCT_SHAPE_OUT_OF_SCOPE` | Generic multi-subject flashcard platform (any school subject, any language), not an English-learning-specific service. Registering it would blur the site's identity. |

## Evidence-insufficient candidates (not registered this phase)

None were dropped purely for insufficient evidence this phase — every
candidate that was pursued far enough to confirm a real, distinct
product shape and an official URL was registered (at `verified` or
`partial` evidence tier). Candidates from the original market seed list
that were **not** researched this phase (and so are neither registered
nor rejected — just untouched) include: EnglishCentral, スマ留 (Sumaryu,
study-abroad focused, likely a different product shape), Cafetalk,
Berlitz オンライン英会話, and several smaller/regional online-eikaiwa
brands. These are reasonable candidates for a future research pass.

## Known coverage gaps

- **IELTS/TOEFL-specific self-study app**: no dedicated IELTS/TOEFL app
  was registered. Liberty English Academy (coaching) explicitly supports
  both exams, and EF English Live has TOEFL/TOEIC coursework, but there
  is no IELTS/TOEFL equivalent of abceed/Santaアルク in the current
  Universe. Flagged for a future research pass rather than registering a
  low-confidence candidate.
- **英検 (Eiken) specialist self-study app**: covered indirectly (abceed,
  mikan, Kimini英会話, ワールドトーク all support 英検 to some degree),
  but no service is 英検-only the way Santaアルク is TOEIC-only.
- **Regional / smaller online-eikaiwa brands**: the market has more
  brands than the 15 registered here (e.g. EnglishCentral, スマ留,
  Berlitz, Cafetalk). Not registered because they weren't researched
  this phase — not because they were evaluated and rejected.
