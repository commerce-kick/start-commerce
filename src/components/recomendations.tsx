import ProductCard from "@/components/product-card";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
} from "@/components/ui/carousel";
import { productsQueries } from "@/integrations/tanstack-query/queries/product";
import { useQuery } from "@tanstack/react-query";

export default function Recomendations({ productId }: { productId: string }) {
	const { data, isLoading } = useQuery(
		productsQueries.getRecommendations(productId),
	);

	if (!data || isLoading) {
		return;
	}

	return (
		<div className="py-8">
			<h2 className="mb-4 text-2xl font-bold">Related Products</h2>

			<Carousel>
				<CarouselContent>
					{data?.map((slot) => {
						return (
							<CarouselItem key={slot.id} className="basis-1/5">
								<ProductCard product={slot} />
							</CarouselItem>
						);
					})}
				</CarouselContent>
			</Carousel>
			
		</div>
	);
}
