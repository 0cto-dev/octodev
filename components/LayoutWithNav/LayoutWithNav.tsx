import React from 'react';
import NavBar from '../navBar/NavBar';

export default function LayoutWithNav({ children }: { children: React.ReactNode }) {
	return (
		<>
			<NavBar />
			{children}
		</>
	);
}
