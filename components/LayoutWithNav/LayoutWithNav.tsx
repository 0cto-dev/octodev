import React from 'react';
import './LayoutWithNav.css'
export default function LayoutWithNav({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<>
			<header>
				<ul>
					<li>OctoDev</li>
					<li>ProfilePicture</li>
				</ul>
			</header>
			{children}
		</>
	);
}
