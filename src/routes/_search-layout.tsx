import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { sorting } from "@/lib/constants";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	Link,
	Outlet,
	useParams
} from "@tanstack/react-router";

export const Route = createFileRoute("/_search-layout")({
	component: RouteComponent,
});

function RouteComponent() {
	const { collection } = useParams({ strict: false }) as {
		collection?: string;
	};

	const { data: collections } = useSuspenseQuery(
		collectionsQueries.getCollections(),
	);

	return (
		<div className="mx-auto flex max-w-(--breakpoint-2xl) flex-col gap-8 px-4 pb-4 text-black md:flex-row dark:text-white">
			<div className="order-first w-full flex-none md:max-w-[125px]">
				<h3 className="hidden text-xs text-neutral-500 md:block dark:text-neutral-400">
					Collections
				</h3>
				<ul>
					{collections.map((slot) => {
						return (
							<li
								key={slot.title}
								className="mt-2 flex text-black dark:text-white"
							>
								<Link
									to={slot.path}
									className="w-full text-sm hover:underline dark:hover:text-neutral-100 underline-offset-4 capitalize"
								>
									{slot.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="order-last min-h-screen w-full md:order-none">
				<Outlet />
			</div>
			<div className="order-none flex-none md:order-last md:w-[125px]">
				<ul>
					{sorting.map((slot) => {
						return (
							<li
								key={slot.title}
								className="mt-2 flex text-black dark:text-white"
							>
								<Link
									from={collection ? "/search/$collection" : "/search"}
									search={(prev) => ({
										...prev,
										...(slot.slug && { sort: slot.slug }),
									})}
									className="w-full text-sm hover:underline dark:hover:text-neutral-100 underline-offset-4 capitalize"
								>
									{slot.title}
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</div>
	);
}
