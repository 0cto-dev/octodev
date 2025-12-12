'use client';

import './NavBar.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import LeaderBoard from './LeaderBoardLink';
import { Streak } from './StreakLink';
import ProfilePicture from './ProfilePicture';
import OctoDevLogo from './OctoDevLogo';
import useIsVisitor from '@/lib/isVisitor';
import ToolTip from '@/components/tooltip/ToolTip';

export default function NavBar() {
	const [isClient, setIsClient] = useState(false);
	const { data: session } = useSession();
	const isVisitor = useIsVisitor();
	let courseName = isClient ? window.location.pathname.split('/')[1] || '' : '';
	courseName = courseName === 'logica' ? 'Tenda' : courseName;

	useEffect(() => {
		setIsClient(true);
	}, []);
	return (
		<>
			<header>
				<ul>
					<OctoDevLogo />
					<li id="title">
						<p className="bg-primary">
							{courseName ||
								`Olá, ${(session?.user?.name || ('' as string)).split(' ')[0] || 'visitante'}!
						`}
						</p>
					</li>
					{(session ? true : false) ||
						(isVisitor && (
							<>
								<Streak />
								<LeaderBoard />
							</>
						))}

					<ToolTip text={isVisitor ?'Os itens do menu são apenas ilustrativos no modo visitante!':''}>
						<ProfilePicture />
					</ToolTip>
				</ul>
			</header>
		</>
	);
}
