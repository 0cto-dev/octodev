'use client';

import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import './NavBar.css';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import iconImage from '@/public/images/octoSemFundo.png';

export default function NavBar() {
	const [menuOpen, setMenuOpen] = useState<string|boolean>('');
	const [isClient, setIsClient] = useState(false);
	const { data: session } = useSession();
	

	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('#leaderboard')) window.location.href = '/placar';
		if (target.closest('#pfp')) setMenuOpen(menuOpen => !menuOpen);
	}

	useEffect(() => {
		setIsClient(true);
	}, []);
	let courseName = isClient ? window.location.pathname.split('/')[1]||'' : ''
	courseName = courseName==='logica' ? 'Tenda' : courseName
	return (
		<>
			<header>
				<ul>
					<li id="octo">
						<a href="/">
							<div className="blur"></div>
							<Image
								src={iconImage}
								alt="logo"
								loading="eager"
								width={40}
								height={40}
							></Image>
						</a>
					</li>
					<li id="title">
						<p>{courseName||`Olá, ${(session?.user?.name||'' as string).split(' ')[0]||'visitante'}!
						`}</p>
					</li>
					<li id="leaderboard" onClick={handleClick}>
						<p>Placar de Lideres</p>
					</li>
					<li id="pfp" onClick={handleClick} className={`${menuOpen?'open':''}`}>
						<a href="#">
							<FaUserCircle size={35} />
						</a>
						<div className={`menu ${menuOpen===''? '' : menuOpen ? 'open' : 'close'}`}>
							<ul>
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
									<a href="/api/auth/signout" >Sair</a>
								</li>
							</ul>
						</div>
					</li>
				</ul>
			</header>
		</>
	);
}
