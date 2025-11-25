'use client';
import './page.css';
import { signIn, useSession } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { FiGithub } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

export default function LoginPage() {
	const { data: session } = useSession();

	console.log('SESSION:', session);

	return (
		<main>
			<div className="title">
				<h1>Fazer login!</h1>
			</div>

			<div className="buttons">
				<button onClick={() => signIn('google')} className="googleBtn button">
          <FcGoogle size={40}/>
					Entrar com Google
				</button>
				<button onClick={() => {}} className="githubBtn button">
          <FiGithub size={40}/>
					Entrar com GitHub
				</button>
        <button onClick={() => {}} className="linkedinBtn button">
          <FaLinkedinIn size={35}/>
					Entrar com LinkedIn
				</button>
			</div>
		</main>
	);
}
