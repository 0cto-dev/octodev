import React from 'react';
import './LayoutWithNav.css';
import { FaUserCircle } from 'react-icons/fa';
import Image from 'next/image';
export default function LayoutWithNav({ children, className = '' }: { children: React.ReactNode; className?: string }) {
	return (
		<>
			<header>
				<ul>
					<li id="octo">
						<a href="/">
							<div className="blur"></div>
							<Image src={'/images/octoSemFundo.png'} alt="logo" width={40} height={40}></Image>
						</a>
					</li>
					<li id="pfp">
						<a href="#">
							<FaUserCircle size={35} />
						</a>
					</li>
				</ul>
			</header>
			{children}
		</>
	);
}
