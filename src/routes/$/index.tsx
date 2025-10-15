import Prose from "@/components/prose";
import { pageQueries } from "@/integrations/tanstack-query/queries/page";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, notFound } from "@tanstack/react-router";

export const Route = createFileRoute("/$/")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { _splat } = params;

		if (!_splat) {
			throw notFound();
		}

		const { queryClient } = context;

		const data = await queryClient.ensureQueryData(pageQueries.getPage(_splat));

		if (!data) {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { data: page } = useSuspenseQuery(pageQueries.getPage("contact"));

	return (
		<div className="container mx-auto">
			<h1 className="mb-8 text-5xl font-bold">{page.title}</h1>
			<Prose className="mb-8" html={page.body} />
			<p className="text-sm italic">
				{`This document was last updated on ${new Intl.DateTimeFormat(
					undefined,
					{
						year: "numeric",
						month: "long",
						day: "numeric",
					},
				).format(new Date(page.updatedAt))}.`}
			</p>
		</div>
	);
}
