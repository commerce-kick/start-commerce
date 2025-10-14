import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddToCartMutation } from "@/integrations/tanstack-query/queries/cart";
import { productsQueries } from "@/integrations/tanstack-query/queries/product";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/product/$productId")({
	component: RouteComponent,
	loader: async ({ context, params }) => {
		const { queryClient } = context;
		queryClient.ensureQueryData(productsQueries.getProduct(params.productId));
	},
});

function RouteComponent() {
	const { productId } = useParams({ from: "/product/$productId" });

	const { data } = useSuspenseQuery(productsQueries.getProduct(productId));

	const addToCartMutation = useAddToCartMutation();

	const defaultVariantId =
		data?.variants.length === 1 ? data?.variants[0]?.id : undefined;

	const _handleAddToCart = () => {
		if (!defaultVariantId) {
			return;
		}

		addToCartMutation.mutate(
			{
				lines: [{ merchandiseId: defaultVariantId, quantity: 1 }],
			},
			{
				onSuccess: () => {
					toast.success("Product Added");
				},
			},
		);
	};

	return (
		<div className="container mx-auto grid lg:grid-cols-2">
			<img
				src={data?.featuredImage.url}
				className="w-full"
				alt={data?.featuredImage.altText}
			/>
			<Card>
				<CardHeader>
					<CardTitle>{data?.title}</CardTitle>
				</CardHeader>
				<CardContent>
					<h1>{data?.priceRange.maxVariantPrice.amount}</h1>
					<Button onClick={_handleAddToCart}>add to cart</Button>
				</CardContent>
			</Card>
		</div>
	);
}
