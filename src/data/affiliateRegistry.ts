import { services } from "./services";

/**
 * Central Affiliate Registry. This is the ONLY place affiliate URLs are
 * allowed to live — never hardcode an affiliate/ASP URL into a Service
 * record or a page. `src/lib/ctaResolver.ts` reads this registry (via
 * `getLiveProgram`) to decide what a service's outbound CTA should point
 * to, and `/admin/affiliate` reads it (via `getAffiliateManagementRows`)
 * to show every Service's affiliate status, researched or not.
 *
 * Registering a Service in `services.ts` never implies an affiliate
 * relationship. A program is only added here once verified by the site
 * operator (not guessed, not assumed from a sister project's own
 * account) — see each entry's `notes`.
 *
 * One Service can have more than one Program (see `programScope`) — e.g.
 * a "kids" ad creative under the same brand is a different Program from
 * the general one, and must never be served on the general Service's
 * page just because the brand matches.
 */

/** Whether an ASP program has even been found to exist for this Service/scope. */
export type AffiliateCapabilityStatus =
  | "UNKNOWN" // not researched yet
  | "NOT_FOUND" // looked, nothing found so far (keep looking)
  | "NOT_AVAILABLE" // confirmed officially: no affiliate program exists
  | "AVAILABLE"; // a program exists (see affiliateStatus for where we are with it)

/** Where our relationship with a confirmed-AVAILABLE program stands. */
export type AffiliateRelationStatus =
  | "NOT_APPLIED"
  | "APPLIED"
  | "APPROVED" // approved, not yet implemented on the site
  | "ACTIVE" // implemented on the site
  | "COMPLETE" // implemented + any required ad-placement URL submission done
  | "ENDED"; // program/relationship ended

export type ProgramScope = "GENERAL" | "KIDS" | "BUSINESS" | "TOEIC" | "OTHER";

export type AffiliateProgram = {
  /** Stable id for this program row (not the Service id — a Service can have several). */
  id: string;
  /** Matches Service.id in services.ts. */
  serviceId: string;
  asp: string | null;
  advertiserName: string | null;
  programName: string | null;
  programId: string | null;
  programScope: ProgramScope;
  affiliateCapabilityStatus: AffiliateCapabilityStatus;
  /** Only meaningful once affiliateCapabilityStatus is "AVAILABLE". */
  affiliateStatus: AffiliateRelationStatus | null;
  /** Real outbound tracking URL. Only set once human-verified. */
  affiliateUrl: string | null;
  /** 1x1 conversion tracking pixel required by some ASPs (e.g. A8.net). */
  trackingPixelUrl: string | null;
  /** Approved ad creative text, when the ASP provides one. */
  linkText: string | null;
  /** Pages on this site where the program's link is (or will be) placed. */
  sitePlacementUrls: string[];
  /** True once the affiliate link is actually live on the site (drives the CTA Resolver). */
  affiliateImplemented: boolean;
  /** Some ASPs (e.g. A8.net) require submitting the exact placement URL for review. null = not yet determined. */
  adUrlSubmissionRequired: boolean | null;
  adUrlSubmitted: boolean;
  adUrlSubmittedAt: string | null;
  /** Whether the page carries a clear "this is an affiliate link" disclosure near the CTA. */
  prDisclosureReady: boolean;
  lastCheckedAt: string | null;
  notes: string;
};

export const affiliatePrograms: AffiliateProgram[] = [
  {
    id: "qq-kids-a8",
    serviceId: "qq-kids",
    asp: "A8",
    advertiserName: null,
    programName: "【QQキッズ】こども専用オンライン英会話",
    programId: null,
    programScope: "KIDS",
    affiliateCapabilityStatus: "AVAILABLE",
    affiliateStatus: "ACTIVE",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4BA8P9+YJ86I+4HHM+66H9E",
    trackingPixelUrl: "https://www19.a8.net/0.gif?a8mat=4BA8P9+YJ86I+4HHM+66H9E",
    linkText: "【QQキッズ】こども専用オンライン英会話",
    sitePlacementUrls: ["https://english.aptipass.com/services/qq-kids"],
    affiliateImplemented: true,
    adUrlSubmissionRequired: true,
    adUrlSubmitted: true,
    adUrlSubmittedAt: "2026-08-20",
    prDisclosureReady: true,
    lastCheckedAt: "2026-08-20",
    notes:
      "運営者からA8.netの公式広告素材（テキストリンク＋計測用1x1ピクセル）を提供された、Human Verified Fact。この programName の対象は「QQキッズ」（4歳〜中学生向けの子ども専門サービス、Service ID: qq-kids）のみであり、成人向け一般サービス「QQEnglish」（Service ID: qqenglish）には適用しない。両者はAptiPass English内でも別Serviceとして登録されている。advertiserName・programIdは未提供のため未確認のままにしている。2026-08-20にaffiliateUrl/trackingPixelUrlをA8.netの新しい正式広告素材（a8mat=4BA8P9+YJ86I+4HHM+66H9E）へ差し替え。linkTextはA8指定文言のまま変更なし。旧素材（a8mat=4BA8P9+YJ7EQ+4HHM+66H9E）は使用終了。2026-08-20にA8への掲載URL（https://english.aptipass.com/services/qq-kids）提出完了。",
  },
  {
    id: "nativecamp-a8-general",
    serviceId: "nativecamp",
    asp: "A8",
    advertiserName: "株式会社ネイティブキャンプ",
    programName: "業界初！予約無しでレッスンし放題のオンライン英会話【NativeCamp】",
    programId: "s00000014758001",
    programScope: "GENERAL",
    affiliateCapabilityStatus: "AVAILABLE",
    affiliateStatus: "ACTIVE",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4BA759+EB01D6+35VG+64JTE",
    trackingPixelUrl: "https://www15.a8.net/0.gif?a8mat=4BA759+EB01D6+35VG+64JTE",
    linkText: "月額6,480円でレッスンが24時間受け放題！",
    sitePlacementUrls: ["https://english.aptipass.com/services/nativecamp"],
    affiliateImplemented: true,
    adUrlSubmissionRequired: true,
    adUrlSubmitted: true,
    adUrlSubmittedAt: "2026-08-20",
    prDisclosureReady: true,
    lastCheckedAt: "2026-08-20",
    notes:
      "運営者から提供されたHuman Verified Fact。Program ID s00000014758001の一般向け（GENERAL）クリエイティブ。2026-08-20にA8.netの正式広告素材（a8mat=4BA759+EB01D6+35VG+64JTE、テキスト「月額6,480円でレッスンが24時間受け放題！」＋計測用1x1ピクセル）へ差し替え済み。以前このidは誤って programScope: KIDS のまま一般向け素材を保持していたため、今回 nativecamp-a8-general へ改名し、KIDS向けは別行（nativecamp-a8-kids）へ正しく分離した。affiliateImplemented: trueのままCTA Resolver経由で/services/nativecampに実装継続。2026-08-20にA8への掲載URL（https://english.aptipass.com/services/nativecamp）提出完了。",
  },
  {
    id: "nativecamp-a8-kids",
    serviceId: "nativecamp",
    asp: "A8",
    advertiserName: "株式会社ネイティブキャンプ",
    programName: "業界初！予約無しでレッスンし放題のオンライン英会話【NativeCamp】",
    programId: "s00000014758001",
    programScope: "KIDS",
    affiliateCapabilityStatus: "AVAILABLE",
    affiliateStatus: "APPROVED",
    affiliateUrl: "https://px.a8.net/svt/ejp?a8mat=4BA759+EB01D6+35VG+6LWTE",
    trackingPixelUrl: "https://www15.a8.net/0.gif?a8mat=4BA759+EB01D6+35VG+6LWTE",
    linkText: "ネイティブキャンプキッズ",
    sitePlacementUrls: [],
    affiliateImplemented: false,
    adUrlSubmissionRequired: true,
    adUrlSubmitted: false,
    adUrlSubmittedAt: null,
    prDisclosureReady: false,
    lastCheckedAt: "2026-08-20",
    notes:
      "運営者から提供されたHuman Verified Fact。Program ID s00000014758001と同一のA8プログラムの「ネイティブキャンプキッズ」向け正式クリエイティブ（a8mat=4BA759+EB01D6+35VG+6LWTE、テキスト「ネイティブキャンプキッズ」＋計測用1x1ピクセル）。2026-08-20時点でリポジトリ内を調査した結果、NativeCamp Kids専用のServiceページ・Kidsカテゴリでの明示的な扱い・Kids向けGoal・Kids向け比較ページ・Kids向けGuideのいずれも存在しないため、掲載先が確定できず未実装（affiliateImplemented: false）のまま registry にのみ登録する。/services/nativecamp は一般向け（nativecamp-a8-general）が使用するため、このKIDS行を誤って一般ページのCTAに使わないこと。Kids向けコンテンツが将来追加された場合のみ、sitePlacementUrls・affiliateImplemented・affiliateStatusを更新して実装すること。",
  },
];

export function getProgramsForService(serviceId: string): AffiliateProgram[] {
  return affiliatePrograms.filter((p) => p.serviceId === serviceId);
}

/**
 * The one program (if any) that should actually be used as this Service's
 * live affiliate CTA. Only "implemented" programs with a real URL qualify —
 * APPROVED-but-not-yet-implemented programs (like NativeCamp Kids above)
 * must never leak into the live CTA just because a row exists.
 */
export function getLiveProgram(serviceId: string): AffiliateProgram | undefined {
  return affiliatePrograms.find(
    (p) => p.serviceId === serviceId && p.affiliateImplemented && p.affiliateUrl,
  );
}

/**
 * One row per registered Program, PLUS a synthetic UNKNOWN row for every
 * Service that has no Program registered at all — so the admin console
 * always shows the full Service Registry vs. Affiliate Registry diff,
 * never just "whatever happens to be in the registry already".
 */
export type AffiliateManagementRow = {
  service: (typeof services)[number];
  program: AffiliateProgram | null;
};

export function getAffiliateManagementRows(): AffiliateManagementRow[] {
  const rows: AffiliateManagementRow[] = [];
  for (const service of services) {
    const programs = getProgramsForService(service.id);
    if (programs.length === 0) {
      rows.push({ service, program: null });
      continue;
    }
    for (const program of programs) {
      rows.push({ service, program });
    }
  }
  return rows;
}
