import { useState, useEffect } from 'react';

export const useIsMobile = () => {
	const [isMobile, setIsMobile] = useState(calculateIsMobile);

	function calculateIsMobile() {
		if (typeof window === 'undefined') {
			return false;
		}
		return window.innerHeight > window.innerWidth && window.innerWidth < 500;
	}

	useEffect(() => {
		function handleResize() {
			setIsMobile(calculateIsMobile());
		}
		const listener = window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return isMobile;
};
