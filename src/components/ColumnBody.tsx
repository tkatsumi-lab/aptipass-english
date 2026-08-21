import type { ColumnBlock } from "@/data/columns";

type ColumnBodyProps = {
  blocks: ColumnBlock[];
};

/**
 * Renders a column's block array with distinct visual treatment per block
 * type — the "文章のリズムを壊さない範囲で視覚的な変化をつける" requirement.
 * Plain server-rendered markup, no client-side JS: reading a long article
 * needs zero interactivity, so this stays a Server Component.
 */
export default function ColumnBody({ blocks }: ColumnBodyProps) {
  return (
    <div className="mt-8">
      {blocks.map((block, index) => {
        switch (block.type) {
          case "heading":
            return (
              <h2
                key={index}
                className={`text-xl font-bold text-slate-900 sm:text-2xl ${index === 0 ? "" : "mt-12"}`}
              >
                {block.text}
              </h2>
            );
          case "paragraph":
            return (
              <p key={index} className="mt-4 text-[15px] leading-[1.9] text-slate-700 sm:text-base">
                {block.text}
              </p>
            );
          case "question":
            return (
              <p
                key={index}
                className="mt-6 rounded-2xl bg-rose-50 px-5 py-4 text-[15px] leading-relaxed font-medium text-rose-900 italic sm:text-base"
              >
                <span aria-hidden="true" className="mr-1 not-italic text-rose-300">
                  “
                </span>
                {block.text.replace(/^[「“]|[」”]$/g, "")}
                <span aria-hidden="true" className="ml-1 not-italic text-rose-300">
                  ”
                </span>
              </p>
            );
          case "example":
            return (
              <div
                key={index}
                className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm"
              >
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-slate-500 uppercase">
                  EN
                </span>
                <p className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">{block.en}</p>
                <p className="mt-1.5 text-sm text-slate-500">{block.ja}</p>
              </div>
            );
          case "insight":
            return (
              <div
                key={index}
                className="mt-6 rounded-r-2xl border-l-4 border-rose-400 bg-rose-50/60 py-3 pr-4 pl-5"
              >
                <span className="text-[11px] font-semibold tracking-wide text-rose-500 uppercase">
                  気づき
                </span>
                <p className="mt-1 text-[15px] leading-relaxed font-medium text-slate-800 sm:text-base">
                  {block.text}
                </p>
              </div>
            );
          case "table":
            return (
              <div
                key={index}
                className="mt-6 overflow-x-auto rounded-2xl border border-slate-100 shadow-sm"
              >
                <table className="w-full min-w-[480px] border-collapse bg-white text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-slate-50">
                      {block.headers.map((header) => (
                        <th
                          key={header}
                          className="px-4 py-3 text-xs font-semibold whitespace-nowrap text-slate-500"
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
                        className={rowIndex % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                      >
                        {row.map((cell, cellIndex) => (
                          <td
                            key={cellIndex}
                            className={`px-4 py-3 align-top text-slate-700 ${
                              cellIndex === row.length - 1 ? "font-medium text-slate-900" : ""
                            }`}
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
        }
      })}
    </div>
  );
}
