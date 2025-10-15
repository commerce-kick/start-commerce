import { getCollectionProducts, getCollections } from "@/integrations/shopify";
import { queryOptions } from "@tanstack/react-query";

export const collectionsQueries = {
	all: () => ["all"],
	getCollectionProducts: ({ collection }: { collection: string }) =>
		queryOptions({
			queryKey: [collectionsQueries.all(), { collection }],
			queryFn: async () =>
				getCollectionProducts({
					data: {
						collection,
					},
				}),
		}),
	getCollections: () =>
		queryOptions({
			queryKey: [...collectionsQueries.all(), "collections"],
			queryFn: async () => getCollections(),
		}),
};
