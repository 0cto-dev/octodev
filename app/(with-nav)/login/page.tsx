'use client';
import './page.css';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FiGithub } from 'react-icons/fi';
import { FaLinkedinIn } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
	const { data: session } = useSession();
	const [isRedirecting, setIsRedirecting] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [isPopUpOpened, setIsPopUpOpened] = useState(false);

	useEffect(() => {
		if (!window) return;

		if (session) {
			setIsRedirecting(true);
			// Uma vez que o usuário está logado, os cookies de visitante devem ser removidos
			document.cookie = 'visitor=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax';

			window.location.href = '/';
		} else {
			setIsLoading(false);
		}
	}, [session]);

	if (isRedirecting || isLoading) {
		return null;
	}
	function handleClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
		const target = e.target as HTMLElement;
		if (target.closest('.enterWithoutLogin')) setIsPopUpOpened(true);
		if (target.closest('.filterDark.active') || target.closest('.cancelBtn')) setIsPopUpOpened(false);
		if (target.closest('.enterWithoutLoginBtn')) allowEnterWithoutLogin()
	}

	return (
		<main className="loginPage">
			<div className={`filterDark ${isPopUpOpened ? 'active' : ''}`} onClick={handleClick}></div>
			<div className={`popUp ${isPopUpOpened ? 'active' : ''}`}>
				<h1>Tem certeza que deseja entrar sem fazer login?</h1>
				<p>Caso entre sem criar uma conta todo o seu progresso durante esta sessão será perdido!</p>
				<div className="options">
					<button className="enterWithoutLoginBtn" onClick={handleClick}>Sim</button>
					<button className="cancelBtn" onClick={handleClick}>
						Não
					</button>
				</div>
			</div>

			<div className="main">
				<div className="title">
					<h1>Fazer login</h1>
					<p>No OctoDev você aprende brincando!</p>
				</div>
				<div className="divisor">
					<div className="division"></div>
					<span>ENTRE COM</span>
					<div className="division"></div>
				</div>
				<div className="buttons">
					<button onClick={() => signIn('google')} className="googleBtn button">
						<FcGoogle size={25} />
						Entrar com Google
					</button>
					<button onClick={() => signIn('github')} className="githubBtn button">
						<FiGithub size={25} />
						Entrar com GitHub
					</button>
					<button onClick={() => signIn('linkedin')} className="linkedinBtn button">
						<FaLinkedinIn size={20} />
						Entrar com LinkedIn
					</button>
					<div className="enterWithoutLogin" onClick={handleClick}>
						<p>Entrar sem criar um conta</p>
					</div>
				</div>
				<footer>
					<p>
						Ao continuar, você concorda com nossos <Link href={`/termos`}>Termos de Uso</Link> e{' '}
						<Link href={`/privacidade`}>Política de Privacidade</Link>
					</p>
				</footer>
			</div>
		</main>
	);
}

export function allowEnterWithoutLogin(){
	// Cria um cookie que dura 1 hora para que o visitante desfrute do site
	const oneHour = 60 * 60 * 1000;
    const expirationDate = new Date(Date.now() + oneHour).toUTCString();
    document.cookie = `visitor=true; expires=${expirationDate}; path=/; SameSite=Lax`;

	window.location.href = "/"
}