import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import generateCourseIndex from './lib/writeCoursesNames';

export default (phase: string, { defaultConfig }: { defaultConfig: NextConfig }) => {
	/**
	 * @type {import('next').NextConfig}
	 */
	const nextConfig: NextConfig = {
		...defaultConfig,
		images: {
			remotePatterns: [
				{
					protocol: 'https',
					hostname: 'media.licdn.com',
					pathname: '/**',
				},
				{
					protocol: 'https',
					hostname: 'lh3.googleusercontent.com',
					pathname: '/**',
				},
				{
					protocol: 'https',
					hostname: 'avatars.githubusercontent.com',
					pathname: '/**',
				},
				{
					protocol: 'https',
					hostname: 'res.cloudinary.com',
					pathname: '/**',
					port: '',
				}
			],
		},
	};

	if (phase === PHASE_PRODUCTION_BUILD) {
		console.log('Running custom function during build: ');
		generateCourseIndex();
	}

	return nextConfig;
};
