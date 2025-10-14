import { getProduct } from "@/integrations/shopify";
import { queryOptions } from "@tanstack/react-query";

export const productsQueries = {
	all: () => ["products"],
	getProduct: (handle: string) =>
		queryOptions({
			queryKey: [...productsQueries.all(), { handle }],
			queryFn: async () =>
				getProduct({
					data: {
						handle,
					},
				}),
		}),
};

