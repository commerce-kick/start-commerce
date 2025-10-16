import Image from "@/components/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "@/components/ui/sheet";
import { cartQueries } from "@/integrations/tanstack-query/queries/cart";
import { DEFAULT_OPTION } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ShoppingBasket } from "lucide-react";

export default function CartModal() {
	const { data: cart } = useQuery(cartQueries.getCart());

	return (
		<Sheet>
			<div className="relative">
				<SheetTrigger asChild>
					<Button variant="outline" size="icon">
						<ShoppingBasket />
					</Button>
				</SheetTrigger>
				{Boolean(cart?.totalQuantity) && (
					<Badge
						variant="destructive"
						className="absolute -right-2 h-5 min-w-5 px-1.5 py-0 justify-center items-center -top-2 rounded-full text-xs"
					>
						{cart?.totalQuantity}
					</Badge>
				)}
			</div>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>My Cart</SheetTitle>
				</SheetHeader>
				<div className="gap-4 p-4">
					{cart?.lines.map((slot) => {
						return (
							<div
								key={slot.id}
								className="flex flex-row gap-3 border-b border-border pb-2 items-start pt-2"
							>
								<Image
									source={slot.merchandise.product.featuredImage}
									className="w-16 border border-border rounded-md"
								/>
								<div className="flex-1 space-y-1">
									<div>
										<span className="leading-tight text-base font-semibold">
											{slot.merchandise.product.title}
										</span>

										{slot.merchandise.title !== DEFAULT_OPTION && (
											<p className="text-xs text-neutral-500 dark:text-neutral-400">
												{slot.merchandise.title}
											</p>
										)}
									</div>

									<p className="font-semibold text-sm">
										{formatCurrency(slot.cost.totalAmount)}
									</p>
								</div>
							</div>
						);
					})}
				</div>
				<SheetFooter>
					<div className="items-center inline-flex justify-between">
						<p>Taxas</p>
						<p className="text-right">
							{formatCurrency(cart?.cost.totalTaxAmount)}
						</p>
					</div>

					<div className="items-center inline-flex justify-between">
						<p>Shipping</p>
						<p className="text-right">Calculated at checkout</p>
					</div>

					<div className="items-center inline-flex justify-between mb-4">
						<p>Total</p>
						<p className="text-right">
							{formatCurrency(cart?.cost.totalAmount)}
						</p>
					</div>
					<Button asChild>
						<a href={cart?.checkoutUrl}>Checkout</a>
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}
