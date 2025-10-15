import {
	GetProductsProps,
	getProduct,
	getProductRecommendations,
	getProducts,
} from "@/integrations/shopify";
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
	getRecommendations: (handle: string) =>
		queryOptions({
			queryKey: [...productsQueries.all(), "recomendations", { handle }],
			queryFn: async () =>
				getProductRecommendations({
					data: {
						productId: handle,
					},
				}),
		}),
	getProducts: (data: GetProductsProps) =>
		queryOptions({
			queryKey: [...productsQueries.all(), "products", { ...data }],
			queryFn: async () =>
				getProducts({
					data,
				}),
		}),
};
