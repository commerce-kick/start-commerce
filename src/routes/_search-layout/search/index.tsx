import ProductCard from "@/components/product-card";
import { productsQueries } from "@/integrations/tanstack-query/queries/product";
import { defaultSort, sorting } from "@/lib/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/_search-layout/search/")({
	validateSearch: z.object({
		q: z.string().optional(),
		sort: z.string().optional(),
		reverse: z.boolean().optional(),
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({ context, deps }) => {
		const { q, sort } = deps;

		const { sortKey } =
			sorting.find((item) => item.slug === sort) || defaultSort;

		const { queryClient } = context;

		await queryClient.ensureQueryData(
			productsQueries.getProducts({
				query: q,
				sortKey: sortKey,
			}),
		);

		return {
			sortKey,
			q,
		};
	},
	component: RouteComponent,
});

function RouteComponent() {
	const { sortKey, q } = useLoaderData({
		from: "/_search-layout/search/",
	});

	const { data: products } = useSuspenseQuery(
		productsQueries.getProducts({
			query: q,
			sortKey,
		}),
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{products?.map((slot) => {
				return <ProductCard key={slot.id} product={slot} />;
			})}
		</div>
	);
}
