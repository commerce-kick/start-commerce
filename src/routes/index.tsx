import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";

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
		<div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
			<section className="grid lg:grid-cols-4 mx-auto container py-24">
				{data.map((slot) => {
					return (
						<Card key={slot.id} className="pt-0 overflow-hidden">
							<img
								src={slot.featuredImage.url}
								className="w-full"
								alt={slot.featuredImage.altText}
							/>
							<CardHeader>{slot.title}</CardHeader>
							<CardContent>
								<Button asChild>
									<Link
										to="/product/$productId"
										params={{
											productId: slot.handle,
										}}
									>
										view product
									</Link>
								</Button>
							</CardContent>
						</Card>
					);
				})}
			</section>
		</div>
	);
}
