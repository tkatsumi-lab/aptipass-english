import {
  comparisonRows,
  comparisonServices,
} from "@/data/comparison";
import { getCategory } from "@/data/categories";
import { services } from "@/data/services";
import ServiceAvatar from "./ServiceAvatar";

export default function ComparisonPreview() {
  return (
    <section id="comparison" className="bg-slate-50 py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            比較Preview
          </h2>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            こんな感じで、サービスを横並びに比較できます。
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-2xl shadow-sm ring-1 ring-slate-200">
          <table className="w-full min-w-[560px] border-collapse bg-white text-left text-sm">
            <thead>
              <tr>
                <th scope="col" className="w-40 bg-white p-4 text-xs font-medium text-slate-400">
                  比較ポイント
                </th>
                {comparisonServices.map((service) => {
                  const serviceData = services.find((s) => s.id === service.id);
                  const category = serviceData
                    ? getCategory(serviceData.categoryId)
                    : undefined;
                  return (
                    <th
                      key={service.id}
                      scope="col"
                      className={`bg-gradient-to-br p-4 font-semibold text-white ${
                        category?.gradient ?? "from-blue-500 to-blue-600"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        {serviceData && (
                          <ServiceAvatar
                            categoryId={serviceData.categoryId}
                            initials={serviceData.initials}
                            size="sm"
                          />
                        )}
                        {service.name}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row, index) => (
                <tr
                  key={row.label}
                  className={index % 2 === 0 ? "bg-white" : "bg-slate-50/60"}
                >
                  <th
                    scope="row"
                    className="p-4 text-xs font-semibold text-slate-500"
                  >
                    {row.label}
                  </th>
                  {comparisonServices.map((service) => (
                    <td key={service.id} className="p-4 text-slate-700">
                      {row.values[service.id]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-center text-xs text-slate-400">
          料金・利用者数などの数値情報は今後追加予定です。
        </p>
      </div>
    </section>
  );
}
