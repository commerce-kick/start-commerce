import Image from "@/components/image";
import Prose from "@/components/prose";
import Recomendations from "@/components/recomendations";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { VariantSelector } from "@/components/variant-selector";
import { VideoPlayer } from "@/components/video-player";
import { useAddToCartMutation } from "@/integrations/tanstack-query/queries/cart";
import { productsQueries } from "@/integrations/tanstack-query/queries/product";
import { formatCurrency } from "@/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	notFound,
	useParams,
	useSearch,
} from "@tanstack/react-router";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute("/product/$productId")({
	component: RouteComponent,
	validateSearch: z.object<{ [x: string]: string }>().optional(),
	loader: async ({ context, params }) => {
		const { queryClient } = context;
		const data = await queryClient.ensureQueryData(
			productsQueries.getProduct(params.productId),
		);
		if (!data) {
			throw notFound();
		}
	},
});

function RouteComponent() {
	const { productId } = useParams({ from: "/product/$productId" });

	const search = useSearch({ from: "/product/$productId" });
	const { data } = useSuspenseQuery(productsQueries.getProduct(productId));

	const variant = data?.variants.find((variant) =>
		variant.selectedOptions.every(
			(option) => option.value === search?.[option.name.toLowerCase()],
		),
	);

	const addToCartMutation = useAddToCartMutation();

	const defaultVariantId =
		data?.variants.length === 1 ? data?.variants[0]?.id : undefined;
	const selectedVariantId = variant?.id || defaultVariantId;

	const _handleAddToCart = () => {
		if (!selectedVariantId) {
			return;
		}

		addToCartMutation.mutate(
			{
				lines: [{ merchandiseId: selectedVariantId, quantity: 1 }],
			},
			{
				onSuccess: () => {
					toast.success("Product Added");
				},
			},
		);
	};

	if (!data) {
		return notFound;
	}

	const video = data.videos.at(0);

	return (
		<div className="container mx-auto">
			<Card className="w-full">
				<div className="grid md:grid-cols-2">
					<div className="pl-6">
						{video ? (
							<VideoPlayer sources={video.sources} alt={video.alt} />
						) : (
							<Image source={data?.featuredImage} className="w-full" />
						)}
					</div>
					<div className="space-y-4">
						<CardHeader>
							<CardTitle className="mb-2 text-5xl font-medium shrink">
								{data?.title}
							</CardTitle>
							<Badge className="shrink-0" variant="destructive">
								{formatCurrency(data?.priceRange.maxVariantPrice)}
							</Badge>
						</CardHeader>
						<CardContent>
							<VariantSelector
								options={data.options}
								variants={data.variants}
							/>

							{/* Description */}
							{data.descriptionHtml ? (
								<Prose
									className="mb-6 text-sm leading-tight dark:text-white/[60%]"
									html={data.descriptionHtml}
								/>
							) : null}

							<Button
								className="w-full uppercase"
								size="lg"
								onClick={_handleAddToCart}
							>
								add to cart
							</Button>
						</CardContent>
					</div>
				</div>
			</Card>

			<Recomendations productId={data.id} />
		</div>
	);
}
