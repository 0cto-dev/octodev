'use client';
import './page.css';
import { signOut } from 'next-auth/react';
import Link from 'next/link';

export default function logoutPage() {
	return (
		<main className="logoutPage">
			<div className="header">
				<h1>Sair da conta</h1>
				<p>Deseja mesmo sair? seus dados continuarão salvos para a proxíma vez que você fizer login!</p>
			</div>
			<div className="options">
				<button onClick={() => signOut()} className="logout-btn">
					Sair
				</button>
				<Link href="/" className="cancel-btn">
					Cancelar
				</Link>
			</div>
		</main>
	);
}
