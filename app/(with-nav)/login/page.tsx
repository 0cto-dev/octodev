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
	useEffect(() => {
		if (!window ) return;
		if (session) {
			setIsRedirecting(true);
			window.location.href = '/';
			console.log(!isLoading, !isRedirecting);
		}else{
			setIsLoading(false);
		}
	}, [session]);
	if (isRedirecting || isLoading) {
		return null;
	}

	return (
		<main className="loginPage">
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
