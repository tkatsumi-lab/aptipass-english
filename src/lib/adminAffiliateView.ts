import { services } from "@/data/services";
import { getAffiliateManagementRows } from "@/data/affiliateRegistry";

/** One unified status axis for badge color / filtering, spanning both
 * AffiliateCapabilityStatus and AffiliateRelationStatus so the table has a
 * single, consistent status value per row regardless of how far along it is. */
export type DisplayStatus =
  | "UNKNOWN"
  | "NOT_FOUND"
  | "NOT_AVAILABLE"
  | "AVAILABLE"
  | "NOT_APPLIED"
  | "APPLIED"
  | "APPROVED"
  | "ACTIVE"
  | "COMPLETE"
  | "ENDED";

export type StatusColor = "green" | "yellow" | "red" | "gray";

export type AdminAffiliateRow = {
  rowKey: string;
  serviceId: string;
  serviceSlug: string;
  serviceName: string;
  officialUrl: string | null;
  asp: string | null;
  advertiserName: string | null;
  programName: string | null;
  programId: string | null;
  programScope: string | null;
  displayStatus: DisplayStatus;
  statusColor: StatusColor;
  affiliateUrl: string | null;
  sitePlacementUrls: string[];
  affiliateImplemented: boolean;
  adUrlSubmissionRequired: boolean | null;
  adUrlSubmitted: boolean;
  adUrlSubmittedAt: string | null;
  prDisclosureReady: boolean;
  priority: "HIGH" | "MEDIUM" | "LOW" | null;
  lastCheckedAt: string | null;
  notes: string;
};

function toDisplayStatus(
  capability: "UNKNOWN" | "NOT_FOUND" | "NOT_AVAILABLE" | "AVAILABLE",
  relation: string | null,
): DisplayStatus {
  if (relation) return relation as DisplayStatus;
  return capability;
}

function toStatusColor(status: DisplayStatus): StatusColor {
  if (status === "ACTIVE" || status === "COMPLETE") return "green";
  if (status === "APPLIED" || status === "APPROVED" || status === "AVAILABLE") return "yellow";
  if (status === "NOT_AVAILABLE" || status === "ENDED") return "red";
  return "gray"; // UNKNOWN, NOT_FOUND, NOT_APPLIED
}

export function buildAdminAffiliateRows(): AdminAffiliateRow[] {
  return getAffiliateManagementRows().map(({ service, program }) => {
    const capability = program?.affiliateCapabilityStatus ?? "UNKNOWN";
    const relation = program?.affiliateStatus ?? null;
    const displayStatus = toDisplayStatus(capability, relation);
    return {
      rowKey: program?.id ?? `${service.id}-unresearched`,
      serviceId: service.id,
      serviceSlug: service.slug,
      serviceName: service.name,
      officialUrl: service.officialUrl,
      asp: program?.asp ?? null,
      advertiserName: program?.advertiserName ?? null,
      programName: program?.programName ?? null,
      programId: program?.programId ?? null,
      programScope: program?.programScope ?? null,
      displayStatus,
      statusColor: toStatusColor(displayStatus),
      affiliateUrl: program?.affiliateUrl ?? null,
      sitePlacementUrls: program?.sitePlacementUrls ?? [],
      affiliateImplemented: program?.affiliateImplemented ?? false,
      adUrlSubmissionRequired: program?.adUrlSubmissionRequired ?? null,
      adUrlSubmitted: program?.adUrlSubmitted ?? false,
      adUrlSubmittedAt: program?.adUrlSubmittedAt ?? null,
      prDisclosureReady: program?.prDisclosureReady ?? false,
      priority: program?.priority ?? null,
      lastCheckedAt: program?.lastCheckedAt ?? null,
      notes: program?.notes ?? "",
    };
  });
}

export type AdminAffiliateSummary = {
  totalServices: number;
  done: number; // ACTIVE + COMPLETE
  applied: number; // APPLIED
  approvedNotImplemented: number; // APPROVED
  adUrlPending: number; // adUrlSubmissionRequired && !adUrlSubmitted
  unavailable: number; // NOT_AVAILABLE + ENDED
  unresearched: number; // UNKNOWN + NOT_FOUND
  available: number; // AVAILABLE — ready to apply to
  availableHighPriority: number; // AVAILABLE && priority === "HIGH" — apply to these first
};

export function buildAdminAffiliateSummary(rows: AdminAffiliateRow[]): AdminAffiliateSummary {
  return {
    totalServices: services.length,
    done: rows.filter((r) => r.displayStatus === "ACTIVE" || r.displayStatus === "COMPLETE").length,
    applied: rows.filter((r) => r.displayStatus === "APPLIED").length,
    approvedNotImplemented: rows.filter((r) => r.displayStatus === "APPROVED").length,
    adUrlPending: rows.filter((r) => r.adUrlSubmissionRequired === true && !r.adUrlSubmitted).length,
    unavailable: rows.filter((r) => r.displayStatus === "NOT_AVAILABLE" || r.displayStatus === "ENDED").length,
    unresearched: rows.filter((r) => r.displayStatus === "UNKNOWN" || r.displayStatus === "NOT_FOUND").length,
    available: rows.filter((r) => r.displayStatus === "AVAILABLE").length,
    availableHighPriority: rows.filter((r) => r.displayStatus === "AVAILABLE" && r.priority === "HIGH").length,
  };
}
