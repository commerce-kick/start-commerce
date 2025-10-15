import ProductCard from "@/components/product-card";
import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	loader: ({ context }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(
			collectionsQueries.getCollectionProducts({
				collection: "hidden-homepage-carousel",
			}),
		);
	},
});

function App() {
	const { data } = useSuspenseQuery(
		collectionsQueries.getCollectionProducts({
			collection: "hidden-homepage-carousel",
		}),
	);

	return (
		<section className="grid lg:grid-cols-4 mx-auto container py-24">
			{data.map((slot) => {
				return <ProductCard key={slot.id} product={slot} />;
			})}
		</section>
	);
}
