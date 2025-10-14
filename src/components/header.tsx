import { Badge } from "@/components/ui/badge";
import { cartQueries } from "@/integrations/tanstack-query/queries/cart";
import { menuQueries } from "@/integrations/tanstack-query/queries/menu";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";

export default function Header() {
	const { data } = useSuspenseQuery(
		menuQueries.getMenu("next-js-frontend-header-menu"),
	);

	const { data: cart, isLoading } = useQuery(cartQueries.getCart());

	return (
		<header>
			{data.map((slot) => {
				return (
					<a key={slot.path} href={slot.path}>
						{slot.title}
					</a>
				);
			})}

			{isLoading ? "loading..." : <Badge>{cart?.totalQuantity}</Badge>}
		</header>
	);
}
