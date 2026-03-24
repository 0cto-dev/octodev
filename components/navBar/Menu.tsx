import { useSession } from 'next-auth/react';
import useIsVisitor from '@/lib/isVisitor';

export function Menu() {
	const pathname = typeof window !== 'undefined' ? window.location.pathname : '';
	const { data: session } = useSession();
	const isVisitor = useIsVisitor();
	const isStudent = session?.user?.role === 'Aluno';
	return session || (isVisitor && pathname !=='/login') ? (
		<>
			<li>
				<a href={isVisitor ? '#' : `/profile`} className={isVisitor ? 'disabled' : ''}>
					Perfil
				</a>
			</li>
			{isStudent && (
				<li>
					<a href={isVisitor ? '#' : `/achievements`} className={isVisitor ? 'disabled' : ''}>
						Conquistas
					</a>
				</li>
			)}
			<li>
				<a href={isVisitor ? '#' : `/settings`} className={isVisitor ? 'disabled' : ''}>
					Configurações
				</a>
			</li>
			{isVisitor ? (
				<li className="login">
					<a href={`/api/auth/signin`}>Fazer Login</a>
				</li>
			) : (
				<li className="logout">
					<a href={isVisitor ? '#' : `/api/auth/signout`} className={isVisitor ? 'disabled' : ''}>
						Sair
					</a>
				</li>
			)}
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
	);
}
