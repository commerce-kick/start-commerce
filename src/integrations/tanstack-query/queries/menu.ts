import { getMenu } from "@/integrations/shopify";
import { queryOptions } from "@tanstack/react-query";

export const menuQueries = {
	all: () => ["menu"],
	getMenu: (handle: string) =>
		queryOptions({
			queryKey: [...menuQueries.all(), "menu"],
			queryFn: async () => {
				return getMenu({
					data: {
						handle,
					},
				});
			},
		}),
};
