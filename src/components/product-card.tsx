import Image from "@/components/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { Product } from "@/integrations/shopify/types";
import { Link } from "@tanstack/react-router";

export default function ProductCard({ product }: { product: Product }) {
	return (
		<Card className="pt-0 overflow-hidden">
			<Image source={product.featuredImage} className="w-full" />
			<CardHeader>{product.title}</CardHeader>
			<CardContent>
				<Button asChild>
					<Link
						to="/product/$productId"
						params={{
							productId: product.handle,
						}}
					>
						view product
					</Link>
				</Button>
			</CardContent>
		</Card>
	);
}
