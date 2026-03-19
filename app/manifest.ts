import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: 'OctoDev',
		short_name: 'OctoDev',
		description:
			'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
		start_url: '/',
		display: 'standalone',
		background_color: '#0a0a0a',
		theme_color: '#000000',
		icons: [
			{
				src: '/favicon.png',
				sizes: '192x192',
				type: 'image/png',
			},
			{
				src: '/favicon.png',
				sizes: '512x512',
				type: 'image/png',
			},
		],
	};
}
