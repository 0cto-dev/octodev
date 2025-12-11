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
	}
	function handleTransition(e: React.TransitionEvent<HTMLElement>) {
		const target = e.target as HTMLElement;
		console.log(target);
	}

	return (
		<main className="loginPage">
			<div className={`filterDark ${isPopUpOpened ? 'active' : ''}`} onClick={handleClick}></div>
			<div className={`popUp ${isPopUpOpened ? 'active' : ''}`}>
				<p>Tem certeza que deseja entrar sem criar uma conta?</p>
				<p>Todo o seu progresso durante esta sessão será perdido!</p>
				<div className="options">
					<button className="enterWithoutLoginBtn">Sim</button>
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
