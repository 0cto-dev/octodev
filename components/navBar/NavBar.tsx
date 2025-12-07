'use client';

import Image from 'next/image';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import iconImage from '@/public/images/octoSemFundo.png';
import LeaderBoard from './LeaderBoardLink';
import { Streak } from './StreakLink';
import ProfilePicture from './ProfilePicture';

export default function NavBar() {
	const [isClient, setIsClient] = useState(false);
	const { data: session } = useSession();
	let courseName = isClient ? window.location.pathname.split('/')[1] || '' : '';
	courseName = courseName === 'logica' ? 'Tenda' : courseName;

	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<>
			<header>
				<ul>
					<li id="octo">
						<a href="/">
							<div className="blur"></div>
							<Image src={iconImage} alt="logo" loading="eager" width={40} height={40}></Image>
						</a>
					</li>
					<li id="title">
						<p>
							{courseName ||
								`Olá, ${(session?.user?.name || ('' as string)).split(' ')[0] || 'visitante'}!
						`}
						</p>
					</li>
					{session && (
						<>
							<LeaderBoard/>
							<Streak />
						</>
					)}
					<ProfilePicture />
				</ul>
			</header>
		</>
	);
}
