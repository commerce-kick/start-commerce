import { useSession } from "@tanstack/react-start/server";

type SessionData = {
	cartId: string | undefined;
};

export function useAppSession() {
	return useSession<SessionData>({
		name: "cart",
		password:
			process.env.SESSION_SECRET ||
			"your-session-secret-here-asd-a-sd-asd-as-d-as-da-sd-as",
	});
}
