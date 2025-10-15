import {
	GetCollectionProductsProps,
	getCollectionProducts,
	getCollections,
} from "@/integrations/shopify";
import { queryOptions } from "@tanstack/react-query";

export const collectionsQueries = {
	all: () => ["all"],
	getCollectionProducts: (data: GetCollectionProductsProps) =>
		queryOptions({
			queryKey: [collectionsQueries.all(), { ...data }],
			queryFn: async () =>
				getCollectionProducts({
					data,
				}),
		}),
	getCollections: () =>
		queryOptions({
			queryKey: [...collectionsQueries.all(), "collections"],
			queryFn: async () => getCollections(),
		}),
};
