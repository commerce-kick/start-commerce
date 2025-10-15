import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { defaultSort, sorting } from "@/lib/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	useLoaderData
} from "@tanstack/react-router";
import { z } from "zod";
export const Route = createFileRoute("/_search-layout/search/$collection")({
	component: RouteComponent,
	validateSearch: z.object({
		sort: z.string().optional(),
		reverse: z.boolean().optional(),
	}),
	loaderDeps: ({ search }) => search,
	loader: async ({ context, params, deps }) => {
		const { collection } = params;
		const { sortKey } =
			sorting.find((item) => item.slug === deps.sort) || defaultSort;

		const { queryClient } = context;
		
		await queryClient.ensureQueryData(
			collectionsQueries.getCollectionProducts({
				collection: collection,
				sortKey: sortKey,
			}),
		);

		queryClient.ensureQueryData(collectionsQueries.getCollections());

		return {
			sortKey,
			collection,
		};
	},
});

function RouteComponent() {
	const { sortKey, collection } = useLoaderData({
		from: "/_search-layout/search/$collection",
	});

	const { data: products } = useSuspenseQuery(
		collectionsQueries.getCollectionProducts({
			collection,
			sortKey,
		}),
	);

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
			{products.map((slot) => {
				return (
					<Card key={slot.id}>
						<CardHeader>
							<CardTitle>{slot.title}</CardTitle>
						</CardHeader>
					</Card>
				);
			})}
		</div>
	);
}
