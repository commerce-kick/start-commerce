import { Button } from "@/components/ui/button";
import type {
	ProductOption,
	ProductVariant,
} from "@/integrations/shopify/types";
import { useNavigate, useSearch } from "@tanstack/react-router";

type Combination = {
	id: string;
	availableForSale: boolean;
	[key: string]: string | boolean;
};

export function VariantSelector({
	options,
	variants,
}: {
	options: ProductOption[];
	variants: ProductVariant[];
}) {
	const navigate = useNavigate({ from: "/product/$productId" });
	const search = useSearch({ from: "/product/$productId" });

	const hasNoOptionsOrJustOneOption =
		!options.length ||
		(options.length === 1 && options[0]?.values.length === 1);

	if (hasNoOptionsOrJustOneOption) {
		return null;
	}

	const combinations: Combination[] = variants.map((variant) => ({
		id: variant.id,
		availableForSale: variant.availableForSale,
		...variant.selectedOptions.reduce(
			(accumulator, option) => ({
				...accumulator,
				[option.name.toLowerCase()]: option.value,
			}),
			{},
		),
	}));

	return options.map((option) => (
		<div key={option.id}>
			<dl className="mb-8">
				<dt className="mb-4 text-sm uppercase tracking-wide">{option.name}</dt>
				<dd className="flex flex-wrap gap-3">
					{option.values.map((value) => {
						const optionNameLowerCase = option.name.toLowerCase();

						// Base option params on current selectedOptions so we can preserve any other param state.
						const optionParams = { [optionNameLowerCase]: value };

						// Filter out invalid options and check if the option combination is available for sale.
						const filtered = Object.entries(optionParams).filter(
							([key, value]) =>
								options.find(
									(option) =>
										option.name.toLowerCase() === key &&
										option.values.includes(value),
								),
						);
						const isAvailableForSale = combinations.find((combination) =>
							filtered.every(
								([key, value]) =>
									combination[key] === value && combination.availableForSale,
							),
						);

						const isActive = search?.[optionNameLowerCase] === value;

						return (
							<Button
								key={value}
								aria-disabled={!isAvailableForSale}
								disabled={!isAvailableForSale}
								onClick={() => {
									navigate({
										search: (prev) => {
											const newSearch = { ...prev };
											if (newSearch[optionNameLowerCase] === value) {
												delete newSearch[optionNameLowerCase];
											} else {
												newSearch[optionNameLowerCase] = value;
											}
											return newSearch;
										},
									});
								}}
								title={`${option.name} ${value}${!isAvailableForSale ? " (Out of Stock)" : ""}`}
								variant={isActive ? undefined : "secondary"}
							>
								{value}
							</Button>
						);
					})}
				</dd>
			</dl>
		</div>
	));
}
