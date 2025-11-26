import './page.css';
export default function PrivacidadePage() {
	return (
		<main className="privacidadePage">
			<nav>
				<a href="/">Página Inicial</a> &gt; <span>Política de Privacidade</span>
			</nav>
			<div className="content">
				<h1>Política de Privacidade</h1>
				<p>
					A sua privacidade é de extrema importância para nós. Esta Política de Privacidade descreve como
					coletamos, usamos e armazenamos suas informações pessoais ao utilizar nossa plataforma!
				</p>
				<h2>1. Coleta de Informações</h2>
				<p>As informações que coletamos dos usuários e suas respectivas justificativas são as seguintes:</p>
				<ul>
					<li>
						<span className="info">nome</span>
						<span className="justify">
							Coletamos seu nome a partir do processo de autenticação a fim de Criação e gestão da sua
							conta e para melhorar a experiência do usuário.
						</span>
					</li>
					<li>
						<span className="info">E-mail</span>
						<span className="justify">
							Coletamos seu e-mail a partir do processo de autenticação para comunicação e notificações
							caso necessário.
						</span>
					</li>
					<li>
						<span className="info">Cursos(nome e progresso)</span>
						<span className="justify">
							Coletamos essas informações para salvar o seu progresso nos cursos.
						</span>
					</li>
				</ul>
				<h2>2. Onde suas informações são armazenadas?</h2>
				<p>
					Armazenamos as informações dos usuários Na mongoDB Cloud, que possui servidores seguros e medidas de
					proteção de dados.
				</p>
				<h2>3. Compartilhamento de Informações</h2>
				<p>Não compartilhamos suas informações pessoais com terceiros.</p>
				<h2>4. Alterações nesta Política de Privacidade</h2>
				<p>
					Podemos atualizar esta Política de Privacidade periodicamente. Recomendamos revisar esta página
					regularmente para se manter informado sobre como protegemos suas informações.
				</p>
				<h2>5. Contato</h2>
				<p>
					O OctoDev é mantido por 3 desenvolvedores independentes. Se você tiver alguma dúvida ou preocupação
					sobre esta Política de Privacidade, entre em contato conosco através do e-mail:
					<a
						href="mailto:octodevproject@gmail.com"
						style={{
							fontWeight: 600,
							marginLeft: '5px',
							color: 'var(--primary)',
							cursor: 'pointer',
							textDecoration: 'none',
						}}
						aria-label="Enviar email para octodevproject@gmail.com"
					>
						octodevproject@gmail.com
					</a>
				</p>
			</div>
		</main>
	);
}
