import type { NextConfig } from 'next';
import { PHASE_PRODUCTION_BUILD } from 'next/constants';
import generateCourseIndex from './lib/writeCoursesNames';


export default (phase: string, { defaultConfig }: { defaultConfig: NextConfig }) => {
  /**
   * @type {import('next').NextConfig}
   */
  const nextConfig: NextConfig = {
    // Your existing Next.js configuration options
  };

  if (phase === PHASE_PRODUCTION_BUILD) {
    console.log('Running custom function during build: ');
    generateCourseIndex()
  }

  return nextConfig;
};