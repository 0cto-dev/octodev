import type { MetadataRoute } from 'next';

const baseUrl = 'https://octodev.vercel.app';

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: `${baseUrl}/`,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${baseUrl}/login`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}/termos`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.4,
		},
		{
			url: `${baseUrl}/privacidade`,
			lastModified: new Date(),
			changeFrequency: 'yearly',
			priority: 0.4,
		},
	];
}
