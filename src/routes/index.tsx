import { createFileRoute } from "@tanstack/react-router";
import json from "./query-stock-mock.json" with { type: "json" };
import Chart from "@/components/Chart/Chart";
import { createServerFn } from "@tanstack/react-start";

const serverLoader = createServerFn({ method: "GET" })
  .inputValidator((data: PeriodSearch) => ({ period: data.period }))
  .handler(async (ctx) => {
    if (ctx.data.period === "1m") {
      return { data: Object.fromEntries(Object.entries(json).slice(100, 200)) };
    }

    return {
      data: json,
    };
  });

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): PeriodSearch => {
    if (search?.period && ["1d", "1m"].includes(search.period as string)) {
      return {
        period: search.period,
      } as PeriodSearch;
    }

    return {
      period: "1d",
    };
  },
  loaderDeps: ({ search }) => ({ period: search.period }),
  loader: ({ deps }) => {
    return serverLoader({
      data: { period: deps.period },
    });
  },
});

function RouteComponent() {
  const resp = Route.useLoaderData();

  return <Chart data={Object.entries(resp.data)} />;
}

type PeriodSearch = {
  period: "1d" | "1m";
};
