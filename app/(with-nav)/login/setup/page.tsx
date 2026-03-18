'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import './page.css';

export default function SetupPage() {
	const router = useRouter();
	const { data: session, status, update } = useSession();
	const [role, setRole] = useState<'Aluno' | 'Contratante' | null>(null);
	const [apelido, setApelido] = useState('');
	const [email, setEmail] = useState('');
	const [linkedin, setLinkedin] = useState('');
	const [github, setGithub] = useState('');
	const [bio, setBio] = useState('');
	const [empresa, setEmpresa] = useState('');
	const [descricaoContratante, setDescricaoContratante] = useState('');
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (status === 'authenticated' && session?.user?.role) {
			router.replace('/');
		}
	}, [status, session?.user?.role, router]);

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();

		if (!role) {
			alert('Selecione o perfil antes de continuar.');
			return;
		}

		const payload = {
			role,
			nickname: apelido,
			email,
			...(role === 'Aluno' && { linkedin, github, bio }),
			...(role === 'Contratante' && { empresa, descricaoContratante }),
		};

		try {
			setIsSubmitting(true);
			const response = await fetch('/api/auth/setup', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(payload),
			});

			if (!response.ok) {
				const data = await response.json().catch(() => null);
				throw new Error(data?.error || 'Erro ao salvar configuração inicial');
			}

			await update();
		} catch (error) {
			alert(error instanceof Error ? error.message : 'Erro inesperado ao salvar configuração.');
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="loginPage">
			<div className="main">
				<div className="title">
					<h1>Configuração Inicial</h1>
					<p>Complete seu perfil para aproveitar ao máximo o OctoDev!</p>
				</div>
				<div className="setupDivisor">
					<div className="division"></div>
					<span>ESCOLHA SEU PERFIL</span>
					<div className="division"></div>
				</div>
				<form className="setupForm" onSubmit={handleSubmit}>
					<div className="roleSelect">
						<button
							type="button"
							className={role === 'Aluno' ? 'selected' : ''}
							onClick={() => setRole('Aluno')}
						>
							Aluno
						</button>
						<button
							type="button"
							className={role === 'Contratante' ? 'selected' : ''}
							onClick={() => setRole('Contratante')}
						>
							Contratante
						</button>
					</div>
					<div className="setupGrid">
						<div className="inputGroup">
							<label htmlFor="apelido">Apelido</label>
							<input
								id="apelido"
								name="apelido"
								value={apelido}
								onChange={e => setApelido(e.target.value)}
								required
							/>
						</div>
						<div className="inputGroup">
							<label htmlFor="email">Email</label>
							<input
								id="email"
								name="email"
								type="email"
								value={email}
								onChange={e => setEmail(e.target.value)}
								required
							/>
						</div>
						{role === 'Aluno' && (
							<>
								<div className="inputGroup">
									<label htmlFor="linkedin">LinkedIn</label>
									<input
										id="linkedin"
										name="linkedin"
										value={linkedin}
										onChange={e => setLinkedin(e.target.value)}
										placeholder="https://linkedin.com/in/seu-perfil"
									/>
								</div>
								<div className="inputGroup">
									<label htmlFor="github">GitHub/Portfólio</label>
									<input
										id="github"
										name="github"
										value={github}
										onChange={e => setGithub(e.target.value)}
										placeholder="https://github.com/seu-usuario"
									/>
								</div>
								<div className="inputGroup inputGroupFull">
									<label htmlFor="bio">Bio Curta</label>
									<textarea
										id="bio"
										name="bio"
										value={bio}
										onChange={e => setBio(e.target.value)}
										placeholder="Ex: Estudante de Engenharia buscando primeira vaga em Python"
										rows={2}
										maxLength={180}
									/>
								</div>
							</>
						)}
						{role === 'Contratante' && (
							<>
								<div className="inputGroup">
									<label htmlFor="empresa">Nome da Empresa</label>
									<input
										id="empresa"
										name="empresa"
										value={empresa}
										onChange={e => setEmpresa(e.target.value)}
										placeholder="Nome da empresa"
										required
									/>
								</div>
								<div className="inputGroup inputGroupFull">
									<label htmlFor="descricaoContratante">Descrição</label>
									<textarea
										id="descricaoContratante"
										name="descricaoContratante"
										value={descricaoContratante}
										onChange={e => setDescricaoContratante(e.target.value)}
										placeholder="Ex: Empresa de tecnologia focada em soluções inovadoras."
										rows={2}
										maxLength={180}
										required
									/>
								</div>
							</>
						)}
					</div>
					<button className="button" type="submit" disabled={isSubmitting}>
						{isSubmitting ? 'Salvando...' : 'Finalizar'}
					</button>
				</form>
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
