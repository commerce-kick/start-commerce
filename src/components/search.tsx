import { Input } from "@/components/ui/input";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { SearchIcon } from "lucide-react";
import { FormEvent, useState } from "react";

export default function Search() {
	const { q } = useSearch({ strict: false }) as { q: string };

	const navigate = useNavigate({ from: "/search" });

	const [value, setValue] = useState(q);

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		navigate({
			search: {
				q: value,
			},
		});
	};

	return (
		<form
			className="w-max-[550px] relative w-full lg:w-80 xl:w-full"
			onSubmit={handleSubmit}
		>
			<Input
				type="text"
				name="q"
				placeholder="Search for products..."
				autoComplete="off"
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
			<div className="absolute right-0 top-0 mr-3 flex h-full items-center">
				<SearchIcon className="h-4" />
			</div>
		</form>
	);
}
