'use client';
import './page.css';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { IoLogOutOutline } from 'react-icons/io5';
import { TbLogout } from 'react-icons/tb';

export default function logoutPage() {
	return (
		<main className="logoutPage">
			<div className="header">
				<h1>Sair da conta</h1>
				<p>Oh não! Você realmente quer sair?</p>
			</div>
			<div className="main">

				<div className="options">
					<button onClick={() => signOut()} className="logout-btn">
						<TbLogout size={25} />
						Sim
					</button>
					<Link href="/" className="cancel-btn">
						Não
					</Link>
				</div>
			</div>
		</main>
	);
}
