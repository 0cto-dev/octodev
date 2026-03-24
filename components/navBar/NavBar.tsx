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
import { pathname } from '@/types/types';

export default function NavBar() {
	const [isClient, setIsClient] = useState(false);
	const { data: session } = useSession();
	const isVisitor = useIsVisitor();
	const isStudent = session?.user?.role === 'Aluno';
	let courseName = isClient ? window.location.pathname.split('/')[1] || '' : '';
	courseName = courseName === 'logica' ? 'Tenda' : courseName;
	console.log(session);
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
					{isStudent && (
						<>
							<Streak />
							<LeaderBoard />
						</>
					)}

					<ToolTip text={isVisitor&&pathname!='login'  ? 'Os itens do menu são apenas ilustrativos no modo visitante!' : ''}>
						<ProfilePicture />
					</ToolTip>
				</ul>
			</header>
		</>
	);
}
