export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 px-4 py-20 text-white sm:px-6 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-pink-400/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-amber-300/20 blur-3xl"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <p className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-4 py-1.5 text-sm font-medium ring-1 ring-white/30">
          英語学習サービスの比較サイト
        </p>
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">
          英語学習、もっと選びやすく。
        </h1>
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-blue-50 sm:text-lg">
          オンライン英会話、AI英会話、アプリ、コーチング。
          <br className="hidden sm:block" />
          目的や学び方から、自分に合うサービスをかんたん比較。
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href="#categories"
            className="w-full rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-blue-700 shadow-lg transition-transform hover:scale-105 sm:w-auto"
          >
            サービスを探す
          </a>
          <a
            href="#purpose"
            className="w-full rounded-full border border-white/60 px-6 py-3 text-center text-sm font-semibold text-white transition-colors hover:bg-white/10 sm:w-auto"
          >
            目的から選ぶ
          </a>
        </div>
      </div>
    </section>
  );
}
