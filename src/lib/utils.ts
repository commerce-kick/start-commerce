import { Money } from "@/integrations/shopify/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function delay(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export const formatCurrency = (money: Money | undefined) => {
	if (!money?.amount) {
		return 0;
	}
	const numAmount = typeof money.amount === "string" ? Number(money.amount) : money.amount;
	return new Intl.NumberFormat(money.currencyCode, {
		style: "currency",
		currency: money.currencyCode,
	}).format(numAmount);
};
