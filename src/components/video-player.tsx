import { useEffect, useRef } from "react";
import videojs from "video.js";
import type Player from "video.js/dist/types/player";
import "video.js/dist/video-js.css";

interface VideoPlayerProps {
	sources: Array<{
		url: string;
		mimeType: string;
		format: string;
		height: number;
		width: number;
	}>;
	alt?: string;
}

export function VideoPlayer({ sources, alt }: VideoPlayerProps) {
	const videoRef = useRef<HTMLVideoElement>(null);
	const playerRef = useRef<Player | null>(null);

	useEffect(() => {
		if (!videoRef.current) return;

		// Find m3u8 source first, fallback to highest quality mp4
		const m3u8Source = sources.find((source) => source.format === "m3u8");
		const mp4Sources = sources
			.filter((source) => source.format === "mp4")
			.sort((a, b) => b.height - a.height);

		const videoSrc = m3u8Source?.url || mp4Sources[0]?.url;
		const mimeType = m3u8Source?.mimeType || mp4Sources[0]?.mimeType;

		// Initialize Video.js
		const player = videojs(videoRef.current, {
			controls: false,
			fluid: true,
			responsive: true,

			preload: "auto",
			sources: [
				{
					src: videoSrc,
					type: mimeType,
				},
			],
		});

		playerRef.current = player;

		return () => {
			if (playerRef.current) {
				playerRef.current.dispose();
				playerRef.current = null;
			}
		};
	}, [sources]);

	return (
		<div data-vjs-player>
			<video
				ref={videoRef}
				className="video-js vjs-default-skin"
				playsInline
				aria-label={alt}
				muted
                autoPlay
                loop
			/>
		</div>
	);
}
