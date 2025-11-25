'use client';
import './page.css';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
	return (
		<main>
			<div className="title">
        <h1>Fazer login!</h1>
      </div>

			<div className="buttons">
				<button onClick={() => signIn('google')} className="googleBtn button">
					Entrar com Google
				</button>
        {/* testes */}
        {/* <button onClick={() => signIn('google')} className="googleBtn button" style={{transform:'rotate(-5deg)'}}>
					Entrar com Google
				</button>
        <button onClick={() => signIn('google')} className="googleBtn button" style={{transform:'rotate(8deg)'}}>
					Entrar com Google
				</button> */}
			</div>
		</main>
	);
}
