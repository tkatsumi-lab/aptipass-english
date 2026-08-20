"use client";

import { useMemo, useState } from "react";
import type { AdminAffiliateRow, AdminAffiliateSummary, DisplayStatus } from "@/lib/adminAffiliateView";

type FilterId =
  | "all"
  | "done"
  | "highPriority"
  | "available"
  | "applied"
  | "approved"
  | "adUrlPending"
  | "unavailable"
  | "unresearched";

const FILTERS: { id: FilterId; label: string }[] = [
  { id: "all", label: "全件" },
  { id: "done", label: "対応済み" },
  { id: "highPriority", label: "今すぐ申請候補（HIGH）" },
  { id: "available", label: "未対応（案件あり）" },
  { id: "applied", label: "申請中" },
  { id: "approved", label: "提携済み未実装" },
  { id: "adUrlPending", label: "掲載URL未提出" },
  { id: "unavailable", label: "対応不可" },
  { id: "unresearched", label: "未調査" },
];

const PRIORITY_RANK: Record<"HIGH" | "MEDIUM" | "LOW", number> = { HIGH: 0, MEDIUM: 1, LOW: 2 };

function matchesFilter(row: AdminAffiliateRow, filter: FilterId): boolean {
  switch (filter) {
    case "all":
      return true;
    case "done":
      return row.displayStatus === "ACTIVE" || row.displayStatus === "COMPLETE";
    case "highPriority":
      return row.displayStatus === "AVAILABLE" && row.priority === "HIGH";
    case "available":
      return row.displayStatus === "AVAILABLE" || row.displayStatus === "NOT_APPLIED";
    case "applied":
      return row.displayStatus === "APPLIED";
    case "approved":
      return row.displayStatus === "APPROVED";
    case "adUrlPending":
      return row.adUrlSubmissionRequired === true && !row.adUrlSubmitted;
    case "unavailable":
      return row.displayStatus === "NOT_AVAILABLE" || row.displayStatus === "ENDED";
    case "unresearched":
      return row.displayStatus === "UNKNOWN" || row.displayStatus === "NOT_FOUND";
  }
}

const STATUS_LABEL: Record<DisplayStatus, string> = {
  UNKNOWN: "未調査",
  NOT_FOUND: "案件未発見",
  NOT_AVAILABLE: "対応不可",
  AVAILABLE: "案件あり",
  NOT_APPLIED: "未申請",
  APPLIED: "申請中",
  APPROVED: "承認済み（未実装）",
  ACTIVE: "実装済み",
  COMPLETE: "実装済み＋提出済み",
  ENDED: "終了",
};

const COLOR_CLASSES: Record<AdminAffiliateRow["statusColor"], string> = {
  green: "bg-emerald-100 text-emerald-800 ring-emerald-300",
  yellow: "bg-amber-100 text-amber-800 ring-amber-300",
  red: "bg-red-100 text-red-800 ring-red-300",
  gray: "bg-slate-100 text-slate-600 ring-slate-300",
};

function StatusBadge({ row }: { row: AdminAffiliateRow }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${COLOR_CLASSES[row.statusColor]}`}
    >
      {STATUS_LABEL[row.displayStatus]}
    </span>
  );
}

const PRIORITY_CLASSES: Record<"HIGH" | "MEDIUM" | "LOW", string> = {
  HIGH: "bg-rose-100 text-rose-800 ring-rose-300",
  MEDIUM: "bg-amber-100 text-amber-800 ring-amber-300",
  LOW: "bg-slate-100 text-slate-600 ring-slate-300",
};

function PriorityBadge({ priority }: { priority: AdminAffiliateRow["priority"] }) {
  if (!priority) return <span className="text-xs text-slate-300">—</span>;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${PRIORITY_CLASSES[priority]}`}
    >
      {priority}
    </span>
  );
}

function BoolBadge({ value, trueLabel, falseLabel }: { value: boolean; trueLabel: string; falseLabel: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ring-1 ${
        value ? "bg-emerald-100 text-emerald-800 ring-emerald-300" : "bg-slate-100 text-slate-500 ring-slate-300"
      }`}
    >
      {value ? trueLabel : falseLabel}
    </span>
  );
}

type AffiliateConsoleProps = {
  rows: AdminAffiliateRow[];
  summary: AdminAffiliateSummary;
  registryJson: string;
};

export default function AffiliateConsole({ rows, summary, registryJson }: AffiliateConsoleProps) {
  const [filter, setFilter] = useState<FilterId>("all");
  const [asp, setAsp] = useState<string>("ALL");
  const [query, setQuery] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [copied, setCopied] = useState(false);

  const aspOptions = useMemo(() => {
    const set = new Set<string>();
    for (const row of rows) if (row.asp) set.add(row.asp);
    return ["ALL", ...[...set].sort()];
  }, [rows]);

  const filteredRows = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows
      .filter((row) => {
        if (!matchesFilter(row, filter)) return false;
        if (asp !== "ALL" && row.asp !== asp) return false;
        if (q && !row.serviceName.toLowerCase().includes(q) && !row.serviceId.toLowerCase().includes(q)) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        // AVAILABLE rows surface HIGH-priority "apply next" candidates first;
        // everything else keeps the registry's natural order (stable sort).
        if (a.displayStatus !== "AVAILABLE" || b.displayStatus !== "AVAILABLE") return 0;
        const rankA = a.priority ? PRIORITY_RANK[a.priority] : 99;
        const rankB = b.priority ? PRIORITY_RANK[b.priority] : 99;
        return rankA - rankB;
      });
  }, [rows, filter, asp, query]);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(registryJson);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard API unavailable — user can still select the textarea manually
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <h1 className="text-2xl font-bold text-slate-900">Affiliate Management Console</h1>
      <p className="mt-1 text-sm text-slate-500">
        全{summary.totalServices} Serviceのアフィリエイト対応状況（このページはnoindex・要認証、公開サイトからはリンクされていません）
      </p>

      {/* Summary */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-9">
        <SummaryCard label="全Service" value={summary.totalServices} />
        <SummaryCard label="対応済み" value={summary.done} color="green" />
        <SummaryCard label="今すぐ申請候補（HIGH）" value={summary.availableHighPriority} color="red" />
        <SummaryCard label="案件あり（未申請）" value={summary.available} color="yellow" />
        <SummaryCard label="申請中" value={summary.applied} color="yellow" />
        <SummaryCard label="提携済み未実装" value={summary.approvedNotImplemented} color="yellow" />
        <SummaryCard label="掲載URL未提出" value={summary.adUrlPending} color="yellow" />
        <SummaryCard label="対応不可" value={summary.unavailable} color="red" />
        <SummaryCard label="未調査" value={summary.unresearched} color="gray" />
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-wrap items-center gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            aria-pressed={filter === f.id}
            className={`rounded-full px-3 py-1.5 text-xs font-medium ring-1 transition-colors ${
              filter === f.id
                ? "bg-slate-900 text-white ring-slate-900"
                : "bg-white text-slate-600 ring-slate-200 hover:bg-slate-50"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <select
          value={asp}
          onChange={(e) => setAsp(e.target.value)}
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700"
        >
          {aspOptions.map((a) => (
            <option key={a} value={a}>
              {a === "ALL" ? "全ASP" : a}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="サービス名で検索"
          className="rounded-lg border border-slate-200 px-3 py-1.5 text-sm text-slate-700 placeholder:text-slate-400"
        />
        <span className="text-xs text-slate-400">{filteredRows.length}件表示中（全{rows.length}行）</span>
        <button
          type="button"
          onClick={() => setShowJson((v) => !v)}
          className="ml-auto rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50"
        >
          {showJson ? "JSON表示を閉じる" : "JSONとして表示・編集"}
        </button>
      </div>

      {showJson && (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            現在の <code>affiliatePrograms</code> の内容です。編集はこの画面からは保存されません（DBを持たない設計のため）。コピーして
            <code className="mx-1 rounded bg-slate-200 px-1">src/data/affiliateRegistry.ts</code>
            の <code>affiliatePrograms</code> 配列へ反映し、build・deployしてください。
          </p>
          <div className="mt-2 flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-medium text-white hover:bg-slate-700"
            >
              {copied ? "コピーしました" : "全文をコピー"}
            </button>
          </div>
          <textarea
            readOnly
            value={registryJson}
            rows={16}
            className="mt-2 w-full rounded-lg border border-slate-200 bg-white p-3 font-mono text-xs text-slate-700"
          />
        </div>
      )}

      {/* Table */}
      <div className="mt-6 overflow-x-auto rounded-2xl border border-slate-200">
        <table className="w-full min-w-[1100px] border-collapse bg-white text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <Th>Service</Th>
              <Th>Scope</Th>
              <Th>ASP</Th>
              <Th>Program</Th>
              <Th>Status</Th>
              <Th>優先度</Th>
              <Th>Affiliate URL</Th>
              <Th>Site実装</Th>
              <Th>掲載URL提出</Th>
              <Th>PR表記</Th>
              <Th>最終確認</Th>
              <Th>Action</Th>
            </tr>
          </thead>
          <tbody>
            {filteredRows.map((row) => (
              <tr key={row.rowKey} className="border-b border-slate-100 align-top hover:bg-slate-50/60">
                <Td>
                  <div className="font-semibold text-slate-900">{row.serviceName}</div>
                  <div className="text-xs text-slate-400">{row.serviceId}</div>
                </Td>
                <Td>
                  <span className="text-xs text-slate-600">{row.programScope ?? "—"}</span>
                </Td>
                <Td>{row.asp ?? "—"}</Td>
                <Td>
                  <div className="max-w-[220px] text-xs text-slate-700">{row.programName ?? "—"}</div>
                  {row.programId && <div className="text-xs text-slate-400">{row.programId}</div>}
                  {row.advertiserName && <div className="text-xs text-slate-400">{row.advertiserName}</div>}
                </Td>
                <Td>
                  <StatusBadge row={row} />
                </Td>
                <Td>
                  <PriorityBadge priority={row.priority} />
                </Td>
                <Td>
                  {row.affiliateUrl ? (
                    <a
                      href={row.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="max-w-[180px] truncate text-xs text-blue-600 underline"
                    >
                      {row.affiliateUrl}
                    </a>
                  ) : (
                    <span className="text-xs text-slate-400">—</span>
                  )}
                </Td>
                <Td>
                  <BoolBadge value={row.affiliateImplemented} trueLabel="実装済み" falseLabel="未実装" />
                </Td>
                <Td>
                  {row.adUrlSubmissionRequired === null ? (
                    <span className="text-xs text-slate-400">未確認</span>
                  ) : row.adUrlSubmissionRequired === false ? (
                    <span className="text-xs text-slate-400">不要</span>
                  ) : (
                    <BoolBadge value={row.adUrlSubmitted} trueLabel="提出済み" falseLabel="未提出" />
                  )}
                </Td>
                <Td>
                  <BoolBadge value={row.prDisclosureReady} trueLabel="対応済み" falseLabel="未対応" />
                </Td>
                <Td>
                  <span className="text-xs text-slate-500">{row.lastCheckedAt ?? "—"}</span>
                </Td>
                <Td>
                  <a
                    href={`/services/${row.serviceSlug}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 hover:text-blue-700"
                  >
                    詳細を見る →
                  </a>
                </Td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SummaryCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color?: "green" | "yellow" | "red" | "gray";
}) {
  const colorClass = color ? COLOR_CLASSES[color] : "bg-white text-slate-900 ring-slate-200";
  return (
    <div className={`rounded-2xl p-4 ring-1 ${colorClass}`}>
      <p className="text-xs opacity-80">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );
}

function Th({ children }: { children: React.ReactNode }) {
  return <th className="whitespace-nowrap px-3 py-2 text-xs font-semibold text-slate-500">{children}</th>;
}

function Td({ children }: { children: React.ReactNode }) {
  return <td className="px-3 py-3">{children}</td>;
}
