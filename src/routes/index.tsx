import { createFileRoute } from "@tanstack/react-router";
import json from "./query-stock-mock.json" with { type: "json" };
import Chart from "@/components/Chart/Chart";
import { createServerFn } from "@tanstack/react-start";

const serverLoader = createServerFn({ method: "GET" }).handler(() => {
  return {
    data: json,
  };
});

export const Route = createFileRoute("/")({
  component: RouteComponent,
  loader: () => {
    return serverLoader();
  },
});

function RouteComponent() {
  const resp = Route.useLoaderData();

  return <Chart data={Object.entries(resp.data)} />;
}
