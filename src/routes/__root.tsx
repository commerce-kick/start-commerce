import NavBar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { createCart } from "@/integrations/shopify";
import { collectionsQueries } from "@/integrations/tanstack-query/queries/collections";
import { menuQueries } from "@/integrations/tanstack-query/queries/menu";
import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Suspense } from "react";
import TanStackQueryDevtools from "../integrations/tanstack-query/devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	beforeLoad: async () => {
		await createCart();
	},
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "TanStack Start Starter",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	shellComponent: RootDocument,
	loader: async ({ context }) => {
		const { queryClient } = context;

		queryClient.ensureQueryData(
			menuQueries.getMenu("next-js-frontend-header-menu"),
		);
		queryClient.ensureQueryData(
			collectionsQueries.getCollectionProducts({
				collection: "hidden-homepage-carousel",
			}),
		);

		queryClient.ensureQueryData(
			collectionsQueries.getCollectionProducts({
				collection: "hidden-homepage-featured-items",
			}),
		);
	},
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<HeadContent />
			</head>
			<body>
				<main className="w-full">
					<Suspense fallback={"loading..."}>
						<NavBar />
					</Suspense>
					{children}
				</main>

				<Toaster />
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
						TanStackQueryDevtools,
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
