import '@/app/forms.css';
export default function termosPage() {
	return (
		<main className="formPage">
			<nav>
				<a href="/">Página Inicial</a> &gt; <span>Termos de Uso</span>
			</nav>
			<div className="content">
				<h1>Termos de Uso</h1>
				<p>Última atualização: 26/11/2025</p>
				<h2>1. Sobre o OctoDev</h2>
				<p>
					O OctoDev é uma plataforma educacional online dedicada a fornecer cursos de programação para
					desenvolvedores iniciantes e intermediários. Ao utilizar nossa plataforma, você concorda em cumprir
					estes Termos de Uso.
				</p>
				<h2>2. Conta de Usuário</h2>
				<p>
					Para acessar o OctoDev, você pode ser solicitado a criar uma conta. Você é responsável por manter a
					confidencialidade das informações da sua conta e por todas as atividades que ocorrem sob sua conta.
					Além disso, menores de 12 precisam de autorização dos pais ou responsáveis para criar uma conta.
				</p>
				<h2>3. Licença de Código-Fonte</h2>
				<p>
					O código-fonte do OctoDev é disponibilizado sob a Business Source License 1.1 (BUSL-1.1). Essa
					licença permite qualquer pessoa:
				</p>
				<ul>
					<li>Visualizar o código</li>
					<li>Modificar o código para uso pessoal ou educacional</li>
					<li>Enviar pull requests para melhorias</li>
				</ul>
				<p>
					No entanto, a BUSL-1.1 impõe restrições ao uso comercial do código-fonte. Para obter mais
					informações sobre os termos específicos da BUSL-1.1, consulte o arquivo LICENSE incluído no
					<a href="https://github.com/0cto-dev/octodev/blob/main/LICENSE">repositório do OctoDev</a>.
				</p>
				<h2>4. Condutas Proibidas</h2>
				<p>Ao utilizar o OctoDev, você concorda em não:</p>
				<ul>
					<li>Usar a plataforma para qualquer atividade ilegal ou não autorizada.</li>
					<li>Interferir ou interromper o funcionamento da plataforma.</li>
					<li>Tentar obter acesso não autorizado a qualquer parte da plataforma.</li>
					<li>Utilizar bots ou automações para burlar o sistema.</li>
				</ul>
				<h2>5. Disponibilidade e Modificações do Serviço</h2>
				<p>
					O OctoDev é fornecido “no estado em que se encontra”, sem garantias de funcionamento contínuo. A
					equipe pode, a qualquer momento:
				</p>
				<ul>
					<li>Modificar ou descontinuar temporariamente ou permanentemente o serviço.</li>
					<li>Adicionar ou remover funcionalidades.</li>
					<li>Realizar manutenção.</li>
				</ul>
				<h2>6. Modificações nos Termos</h2>
				<p>
					Podemos atualizar estes Termos de Uso periodicamente. Notificaremos você sobre quaisquer
					modificações por meio da plataforma ou por e-mail. Recomendamos revisar estes termos
					regularmente para se manter informado sobre nossas políticas.
				</p>
				<h2>7. Contato</h2>
				<p>
					O OctoDev é mantido por 3 desenvolvedores independentes. Se você tiver alguma dúvida ou preocupação
					sobre esta Política de Privacidade, entre em contato conosco através do e-mail:
					<a href="mailto:octodevproject@gmail.com" aria-label="Enviar email para octodevproject@gmail.com">
						octodevproject@gmail.com
					</a>
				</p>
			</div>
		</main>
	);
}
