'use client';

import Image from 'next/image';
import { FaFacebook, FaUserCircle } from 'react-icons/fa';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import iconImage from '@/public/images/octoSemFundo.png';
import { HiMiniFire } from 'react-icons/hi2';
import { currentDate } from '@/types/types';
import { IconContext } from 'react-icons';

export default function NavBar() {
	const [menuOpen, setMenuOpen] = useState<string | boolean>('');
	const [isClient, setIsClient] = useState(false);
	const { data: session } = useSession();
	const isLastLessonToday = ((session?.user?.lastLessonDate || '') === currentDate) as boolean;
	let courseName = isClient ? window.location.pathname.split('/')[1] || '' : '';
	courseName = courseName === 'logica' ? 'Tenda' : courseName;

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('#leaderboard')) window.location.href = '/placar';
		console.log();
		if (target.closest('#pfp>a') || target.closest('.menu>ul>li')) setMenuOpen(menuOpen => !menuOpen);
	}

	useEffect(() => {
		setIsClient(true);
	}, []);
	console.log(isLastLessonToday);
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
							<li id="leaderboard" onClick={handleClick}>
								<p>Placar de Lideres</p>
							</li>
							<li id="streak" className={isLastLessonToday ? 'active' : ''}>
								<p>{session.user.streak}</p>
								<svg width="30" height="30">
									<linearGradient id="blue-gradient" x1="100%" y1="100%" x2="0%" y2="0%">
										<stop stopColor="var(--yellow)" offset="30%" />
										<stop stopColor="var(--orange)" offset="40%" />
										<stop stopColor="var(--red)" offset="90%" />
									</linearGradient>
									<HiMiniFire
										style={isLastLessonToday ? { fill: 'url(#blue-gradient)' } : {}}
										size={30}
									/>
								</svg>
							</li>
						</>
					)}
					<li id="pfp" onClick={handleClick} className={`${menuOpen ? 'open' : ''}`}>
						<a href="#">
							{session?.user.image ? (
								<Image src={session.user.image} width={35} height={35} alt="pfp" />
							) : (
								<FaUserCircle size={35} />
							)}
						</a>
						<div className={`menu ${menuOpen === '' ? '' : menuOpen ? 'open' : 'close'}`}>
							<ul>
								{session ? (
									<>
										<li>
											<a href="/profile">Perfil</a>
										</li>
										<li>
											<a href="/achievements">Conquistas</a>
										</li>
										<li>
											<a href="/settings">Configurações</a>
										</li>
										<li className="logout">
											<a href="/api/auth/signout">Sair</a>
										</li>
									</>
								) : (
									<>
										<li>
											<a href="/about">Sobre nós</a>
										</li>
										<li>
											<a href="https://github.com/0cto-dev/octodev">Github</a>
										</li>
									</>
								)}
							</ul>
						</div>
					</li>
				</ul>
			</header>
		</>
	);
}
