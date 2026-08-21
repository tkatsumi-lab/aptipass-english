import type { ColumnBlock } from "@/data/columns";
import { SERIES_ACCENTS, type SeriesAccent } from "@/lib/seriesAccent";

type ColumnBodyProps = {
  blocks: ColumnBlock[];
  /** Derived from the article's series via seriesInfo — never from its slug/title. */
  accent: SeriesAccent;
  /**
   * "compact" trims the whitespace around the heading/keyMessage/englishDisplay
   * "peaks" — used only by 1分英語 so its short-form pacing reads as brisk
   * rather than a shrunk-down copy of the long-form layout. Every other
   * block type (paragraph/question/example/insight/table) is unaffected,
   * keeping the shared reading rhythm intact. Defaults to "spacious", which
   * is byte-identical to the spacing every series used before this prop existed.
   */
  density?: "spacious" | "compact";
};

/**
 * AptiPass MAGAZINE's editorial renderer. Seven block types, each with its
 * own typographic treatment — the point is rhythm (whitespace, scale,
 * rules) rather than boxes/borders/colored fills. Pure Server Component:
 * no client JS, no images, real semantic HTML throughout (a proper
 * <table> for the comparison block, not a styled div grid) so every
 * article's SEO/accessibility structure stays intact.
 *
 * `accent`/`density` are the only per-series levers here — the block
 * *types* and their overall shape stay identical across 英語コラム /
 * 英語のなぜ？ / 1分英語, per AptiPass MAGAZINE's "shared Editorial
 * Components, series-specific presentation" design.
 */
export default function ColumnBody({ blocks, accent, density = "spacious" }: ColumnBodyProps) {
  const a = SERIES_ACCENTS[accent];
  const compact = density === "compact";

  return (
    <div className="mt-10">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <div
                key={index}
                className={index === 0 ? "" : compact ? "mt-10 sm:mt-12" : "mt-16 sm:mt-20"}
              >
                <div aria-hidden="true" className={`h-px w-10 ${a.ruleBg}`} />
                <h2 className="mt-4 font-serif text-2xl font-bold tracking-tight break-keep text-slate-900 sm:text-3xl">
                  {block.text}
                </h2>
              </div>
            );

          case "paragraph":
            return (
              <p key={index} className="mt-5 text-[16px] leading-[2] text-slate-700 sm:text-[17px]">
                {block.text}
              </p>
            );

          case "question": {
            const stripped = block.text.replace(/^[「“]|[」”]$/g, "");
            return (
              <p
                key={index}
                className={`mx-auto mt-10 mb-2 max-w-md text-center font-serif text-xl leading-snug font-semibold break-keep italic sm:text-2xl ${a.display}`}
              >
                <span aria-hidden="true" className={`mr-0.5 not-italic ${a.glyph}`}>
                  “
                </span>
                {stripped}
                <span aria-hidden="true" className={`ml-0.5 not-italic ${a.glyph}`}>
                  ”
                </span>
              </p>
            );
          }

          case "example":
            return (
              <div key={index} className={`mt-8 border-l-2 pl-5 ${a.ruleBorder}`}>
                <p className="font-serif text-lg leading-snug text-slate-900 sm:text-xl">
                  {block.en}
                </p>
                <p className="mt-1.5 text-sm text-slate-500">{block.ja}</p>
              </div>
            );

          case "insight":
            return (
              <div key={index} className="my-10 border-y border-slate-100 py-6">
                <span className={`text-[11px] font-semibold tracking-[0.2em] uppercase ${a.label}`}>
                  Point
                </span>
                <p className="mt-2 font-serif text-lg leading-relaxed font-semibold text-slate-900 sm:text-xl">
                  {block.text}
                </p>
              </div>
            );

          case "keyMessage":
            return (
              <div key={index} className={compact ? "my-8 sm:my-10" : "my-14 sm:my-20"}>
                <p
                  className={`mx-auto max-w-md text-center font-serif text-[26px] leading-[1.5] font-bold tracking-tight break-keep whitespace-pre-line sm:max-w-lg sm:text-4xl sm:leading-[1.4] ${a.display}`}
                >
                  {block.text}
                </p>
                {block.caption && (
                  <p className="mt-4 text-center text-sm break-keep text-slate-400 sm:text-base">
                    {block.caption}
                  </p>
                )}
              </div>
            );

          case "englishDisplay":
            return (
              <div key={index} className={compact ? "my-8 text-center sm:my-10" : "my-14 text-center sm:my-20"}>
                <div aria-hidden="true" className={`mx-auto h-px w-8 ${a.ruleBg}`} />
                {block.context && (
                  <p className={`mt-4 text-[11px] font-semibold tracking-[0.2em] uppercase ${a.labelMuted}`}>
                    {block.context}
                  </p>
                )}
                <p
                  className={`mx-auto max-w-lg text-balance break-keep font-serif text-[28px] leading-[1.35] font-bold tracking-tight whitespace-pre-line text-slate-900 sm:text-5xl sm:leading-[1.3] ${
                    block.context ? "mt-3" : "mt-5"
                  }`}
                >
                  {block.en}
                </p>
                {block.ja && <p className="mt-4 text-xs text-slate-400 sm:text-sm">{block.ja}</p>}
              </div>
            );

          case "table": {
            const lastIndex = block.headers.length - 1;
            return (
              <div key={index} className="mt-10">
                {block.caption && <p className="text-sm text-slate-500">{block.caption}</p>}
                <div className="mt-4 rounded-2xl border border-slate-100 px-5 sm:px-6">
                  {/* Desktop: a real <table> for correct tabular semantics/SEO. */}
                  <table className="hidden w-full border-collapse text-left sm:table">
                    <thead>
                      <tr className="border-b border-slate-200">
                        {block.headers.map((header) => (
                          <th
                            key={header}
                            className="py-3 pr-6 text-xs font-semibold tracking-wide text-slate-400 uppercase last:pr-0"
                          >
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {block.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex > 0 ? "border-t border-slate-100" : ""}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className={`py-4 pr-6 align-top last:pr-0 ${
                                cellIndex === lastIndex
                                  ? "font-serif text-base font-semibold text-slate-900"
                                  : "text-sm text-slate-600"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Mobile: the same data, stacked as an editorial list instead of a scrolling grid. */}
                  <div className="divide-y divide-slate-100 sm:hidden">
                    {block.rows.map((row, rowIndex) => (
                      <div key={rowIndex} className="py-4">
                        {row.slice(0, lastIndex).map((cell, cellIndex) => (
                          <p
                            key={cellIndex}
                            className={cellIndex === 0 ? "text-xs text-slate-400" : "mt-0.5 text-sm text-slate-600"}
                          >
                            {cell}
                          </p>
                        ))}
                        <p className="mt-1.5 font-serif text-base font-semibold text-slate-900">
                          {row[lastIndex]}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          }
        }
      })}
    </div>
  );
}
