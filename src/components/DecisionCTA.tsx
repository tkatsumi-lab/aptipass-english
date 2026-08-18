import TrackedLink from "./TrackedLink";
import { AnalyticsEvent } from "@/lib/analytics";

const DECISION_ENGINE_URL = "https://aptipass.com/english-learning/find-your-english-learning-method";

export default function DecisionCTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900 px-6 py-14 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl"
        />
        <div className="relative mx-auto max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-1.5 text-xs font-medium text-amber-200 ring-1 ring-white/20">
            AptiPass Decision Engine
          </span>
          <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
            どれを選べばいいか迷ったら
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-base">
            条件を選ぶだけで、自分に合う英語学習サービスを整理できます。
          </p>
          <TrackedLink
            href={DECISION_ENGINE_URL}
            event={AnalyticsEvent.DECISION_CTA_CLICK}
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-7 py-3 text-sm font-semibold text-slate-900 shadow-lg transition-transform hover:scale-105"
          >
            自分に合うサービスを探す
            <span aria-hidden="true">→</span>
          </TrackedLink>
        </div>
      </div>
    </section>
  );
}
