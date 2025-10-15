import type { Image as SourceProps } from "@/integrations/shopify/types";
import { cn } from "@/lib/utils";
import { Image as UnImage } from "@unpic/react";

export default function Image({
	source: { width, height, altText, url },
	className,
	...props
}: {
	source: SourceProps;
	className?: string;
}) {
	return (
		<div className={cn("relative overflow-hidden bg-background", className)}>
			<UnImage
				layout="constrained"
				width={width}
				height={height}
				alt={altText}
				src={url}
				{...props}
			/>
		</div>
	);
}
