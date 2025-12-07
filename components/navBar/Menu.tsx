import { useSession } from "next-auth/react";

export function Menu() {
	const { data: session } = useSession();

	return session ? (
		<>
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
				<a href="/api/auth/signout">Sair</a>
			</li>
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
