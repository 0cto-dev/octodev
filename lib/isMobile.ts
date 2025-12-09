import { useState, useEffect } from 'react';

export function useIsMobile() {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		function handleResize() {
			if (typeof window === 'undefined') {
				return false;
			}

			const isMobileNow = window.innerHeight > window.innerWidth && window.innerWidth < 500;
			setIsMobile(isMobileNow);
		}
		handleResize();

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return isMobile;
}
