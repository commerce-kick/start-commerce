import { AddToCartFormData, addToCart, getCart } from "@/integrations/shopify";
import {
	queryOptions,
	useMutation,
	useQueryClient,
} from "@tanstack/react-query";

export const cartQueries = {
	all: () => ["cart"],
	getCart: () =>
		queryOptions({
			queryKey: [...cartQueries.all(), "cart"],
			queryFn: async () => getCart(),
		}),
};

export const useAddToCartMutation = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: AddToCartFormData) => addToCart({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: cartQueries.all(),
			});
		},
	});
};
