import Image from "@/components/image";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Product } from "@/integrations/shopify/types";
import { formatCurrency } from "@/lib/utils";
import { Link } from "@tanstack/react-router";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="p-0 overflow-hidden relative ">
			<Image
				source={product.featuredImage}
				className="w-full transition duration-300 ease-in-out hover:scale-105"
			/>
			<div className="absolute bottom-0 inset-x-0  p-4">
				<div className="rounded-full p-1.5 flex flex-row bg-secondary/50 border pl-4 backdrop-blur-lg border-white/10 items-center justify-between">
					<p className="font-semibold truncate flex-1">{product.title}</p>
					<Button asChild className="rounded-full">
						<Link
							to="/product/$productId"
							params={{
								productId: product.handle,
							}}
						>
							{formatCurrency(product.priceRange.maxVariantPrice)}
						</Link>
					</Button>
				</div>
			</div>
		</Card>
	);
}
