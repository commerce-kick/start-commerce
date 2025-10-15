import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/search/$collection")({
	component: RouteComponent,
	loader: ({ context, params }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(
			collectionsQueries.getCollectionProducts({
				collection: params.collection,
			}),
		);

		queryClient.ensureQueryData(collectionsQueries.getCollections());
	},
});

function RouteComponent() {
	const { collection } = useParams({ from: "/search/$collection" });
  
	const { data: products } = useSuspenseQuery(
		collectionsQueries.getCollectionProducts({ collection }),
	);

	const { data: collections } = useSuspenseQuery(
		collectionsQueries.getCollections(),
	);

	return (
		<div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
			<div className="order-first w-full flex-none md:max-w-[125px]">
				{collections.map((slot) => {
					return <p key={slot.title}>{slot.title}</p>;
				})}
			</div>
			<div className="order-last min-h-screen w-full md:order-none">
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
			</div>
		</div>
	);
}
