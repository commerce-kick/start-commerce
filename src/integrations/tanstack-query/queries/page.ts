import { getPage } from "@/integrations/shopify";
import { queryOptions } from "@tanstack/react-query";

export const pageQueries = {
	all: () => ["all"],
	getPage: (handle: string) =>
		queryOptions({
			queryKey: [...pageQueries.all(), { handle }],
			queryFn: async () => getPage({ data: { handle } }),
		}),
};
