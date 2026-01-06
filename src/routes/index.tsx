import { createFileRoute } from "@tanstack/react-router";
import tsla from "./TSLA.json" with { type: "json" };
import nsdq from "./NSDQ.json" with { type: "json" };
import nvda from "./NVDA.json" with { type: "json" };
import Chart from "@/features/Chart/Chart";
import { createServerFn } from "@tanstack/react-start";

const serverLoader = createServerFn({ method: "GET" })
  .inputValidator((data: SearchParams) => ({
    period: data.period,
    stock: data.stock,
  }))
  .handler(async (ctx) => {
    if (ctx.data.stock === "nsdq") return { data: nsdq };
    if (ctx.data.stock === "tsla") return { data: tsla };
    if (ctx.data.stock === "nvda") return { data: nvda };

    return {
      data: nsdq,
    };
  });

export const Route = createFileRoute("/")({
  component: RouteComponent,
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    let res: SearchParams = {
      period: "1y",
      stock: "nsdq",
    };

    if (search?.period && ["1y"].includes(search.period as string)) {
      res = Object.assign(res, { period: search.period });
    }

    if (search?.stock && ["nsdq", "tsla", "nvda"].includes(search.stock as string)) {
      res = Object.assign(res, { stock: search.stock });
    }

    return res;
  },
  loaderDeps: ({ search }) => ({ period: search.period, stock: search.stock }),
  loader: ({ deps }) => {
    return serverLoader({
      data: { period: deps.period, stock: deps.stock },
    });
  },
});

function RouteComponent() {
  const resp = Route.useLoaderData();

  return <Chart data={Object.entries(resp.data)} />;
}

type SearchParams = {
  period: "1y";
  stock: "nsdq" | "tsla" | "nvda";
};
