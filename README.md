# OctoDev

**OctoDev** é um aplicativo web educacional voltado ao ensino de **programação** por meio de uma abordagem **gamificada, dinâmica e acessível**.  
Inspirado em plataformas de ensino Gamificado, o OctoDev transforma o aprendizado de linguagens de programação em uma experiência **envolvente e interativa**, unindo **teoria, prática e suporte em tempo real**.

---

## Descrição

O **OctoDev** tem como missão tornar o aprendizado de programação acessível a todos os públicos — desde iniciantes até desenvolvedores intermediários — utilizando **recursos interativos, desafios e recompensas** para manter o engajamento e promover o aprendizado contínuo.

As lições são curtas, diretas e organizadas em **Árvores de habilidades**, permitindo acompanhar o progresso de forma intuitiva.  
Cada módulo combina **explicações teóricas**, **exercícios práticos** e **feedback imediato**, criando um ciclo de aprendizado completo e eficiente.

---

## Features

-   **Aprendizado Gamificado** — Avance em trilhas, complete desafios e conquiste medalhas. ✅
-   **Suporte com IA Integrada** — Tire dúvidas em tempo real com o auxílio de uma inteligência artificial.
-   **Lições Teóricas** — Exercícios curtos e diretos baseados em situações reais de desenvolvimento. ✅
-   **Lições Práticas** — Vídeo-Aulas divertidas e descontraidas explicando do básico ao avançado da linguagem.
-   **Sistema de Progresso e Recompensas** — Acompanhe sua evolução e ganhe pontos conforme aprende.
-   **Fornecimento de Certificados** — Ganhe certificados ao concluir cada curso.
-   **Multilíngue em Programação** — Suporte a diversas linguagens, incluindo: 
    -   C
    -   C++
    -   C#
    -   Rust
    -   PHP
    -   Python ✅
    -   JavaScript
-   **Conteúdos Extras**
    -   Lógica de programação usando a linguagem **Tenda** ✅
    -   Banco de dados
    -   Tutoriais em vídeo
    -   Rankings e conquistas

---

## Público-Alvo

O **OctoDev** é ideal para:

-   **Iniciantes** — que estão dando seus primeiros passos no mundo da programação.
-   **Intermediários** — que desejam aprofundar seus conhecimentos com foco prático e desafios reais.

---

## Tecnologias (previstas)

-   **Back-end/Front-end:** Next.js / React
-   **Banco de dados:** MongoDB
-   **IA Integrada:** Hugging Face / OpenRouter

---

## Status do Projeto

**Em desenvolvimento** — novas funcionalidades e melhorias estão sendo implementadas.

---

## Contribuições

Contribuições são bem-vindas!  
Sinta-se à vontade para abrir uma **issue** ou enviar um **pull request** com sugestões, correções ou novas ideias.

---

## Teste e modifique na sua máquina

```sh
git clone https://github.com/0cto-dev/octodev.git
cd octodev
npm i
npm run dev
```

## Crie a pasta data

### Linux/MacOS

```sh
mkdir -p data/NOME_DO_CURSO/pratica/
touch data/NOME_DO_CURSO/pratica/lessons.json
```

### Windows (powershell)

```powershell
New-Item -ItemType Directory -Path "data\NOME_DO_CURSO\pratica" -Force
New-Item -ItemType File -Path "data\NOME_DO_CURSO\pratica\lessons.json" -Force
```

depois que as pastas e o arquivo forem criados podemos escrever as lições dentro desse arquivo

**@/data/logica/pratica/lessons.json**

```json
[
	{
		"id": "licao1",
		"titulo": "Olá Tenda",
		"descricao": "Introdução à linguagem tenda",
		"exercicios": [
			//Exercicios podem ter tanto  o tipo "codigo" quanto o tipo "alternativas" (ambos sempre em minusculo)
			{
				"id": "ex001",
				"tipo": "alternativas",
				"pergunta": "Qual é a forma correta de escrever \"Hello World\" utilizando a Linguagem Tenda?",
				"alternativas": [
					{ "id": 1, "valor": "mostrar(\"Hello World\")", "correto": false },
					{ "id": 2, "valor": "exiba(\"Hello World\")", "correto": true },
					{ "id": 3, "valor": "escreva(\"Hello World\")", "correto": false },
					{ "id": 4, "valor": "print(\"Hello World\")", "correto": false }
				]
			},
			{
				"id": "ex002",
				"tipo": "codigo",
				"pergunta": "Consegue corrigir este código?",
				"codigo": "licao1/ex002.tenda",
				"autocompletar": true,
				"respostaCodigo": "1\n2\n3\n4\n5\n",
				"verificadorTrapaca": "^\\s*para cada (\\w+) em 1 até 5 faça\\s*exiba\\(\\1\\)\\s*fim\\s*$"
			}
		]
	}
]
```

Observações:

-   id (obrigatório): As keys `id` devem ser únicas para cada exercício;

-   tipo (obrigatório): Atualmente existem apenas 2 tipos de lições: `alternativas` e `codigo`;

    > para o exercício do tipo `"codigo"` devemos passar o path do arquivo que contém o codigo usando a key: `"codigo":"PATH_DO_ARQUIVO"` e obrigatoriamente ele deve estar em `@/data/NOME_DO_CURSO/pratica/codes/`.

    > exemplo:
    > crie uma pasta dentro de pratica: `codes/licao1/ex002.FORMATO_DO_ARQUIVO ` o caminho pode ser do jeito que preferir, no octo estamos usando este formato: `lição_em_que_o_exercicio_se_encontra/id_do_exercicio.formato`, a seguir usarei a linguagem [Tenda](https://github.com/gabrielbrunop/tenda/) para exemplificar:

    **@/data/logica/pratica/codes/licao1/ex002.tenda**

    ```tenda
    para cada i em 1 até 5 faça
    	exiba(i)
    fim
    ```

-   pergunta (obrigatória): Esta é a pergunta que aparecerá na pagina do exercício;

-   codigo (Opcional para o tipo `alternativas` e obrigatório para o tipo `codigo`): É o código que será renderizado ao iniciar um exercício que tenha essa chave. Assim como usamos o código no tipo `codigo` usamos no tipo alternativa, com a diferença de que aqui ele é opcional e aparecerá entre a pergunta e a caixa de opções.
    > Exemplo:
	
	>**@/data/python/pratica/lessons.json**
	>	```json
	>	[
	>		{
	>			"id": "licao1",
	>			"titulo": "Olá Python",
	>			"descricao": "Introdução ao mundo Python",
	>			"exercicios": [
	>				...
	>				{
	>					"id": "ex004",
	>					"tipo": "alternativas",
	>					"pergunta": "Qual é o valor será escrito na tela após a execução do código abaixo?",
	>					"codigo":"lesson1/ex004.py",
	>	
	>					"alternativas": [
	>						{ "id": 1, "valor": "resultado: 8", "correto": true },
	>						{ "id": 2, "valor": "resultado: 5", "correto": false },
	>						{ "id": 3, "valor": "resultado: 2", "correto": false },
	>						{ "id": 4, "valor": "SyntaxError", "correto": false }
	>					]
	>				},
	>				...
	>			]
	>		}
	>	]
	>	```

	>**@/data/python/pratica/codes/licao1/ex004.py**
	> ```python
	> x = 5
	> x += 3
	> 
 	> print("resultado:",x)
	> ```
- autocompletar (opcional): Caso marcada como true o editor de texto mostrará snippets e recomendações neste exercício;

- respostaCodigo (obrigatória para o tipo `codigo`): Esta é a respota associada ao exercício;

- verificadorTrapaca (opcional): Regex que será usado para verificar se o usuario não apenas burlou o exercício


## Contato

Caso queira saber mais sobre o projeto ou colaborar, entre em contato:

**Renan Rodrigues**

-   _[renanrdemeneses@gmail.com](mailto:renanrdemeneses@gmail.com)_

**Pedro Henrique**

-   _[presendegomes@gmail.com](mailto:presendegomes@gmail.com)_

**Gabriel Chagas**

-   _[gabrielch.anzolini@gmail.com](mailto:gabrielch.anzolini@gmail.com)_

---

# Parcerias e Agradecimentos

Como parte do nosso plano de ensino, usamos [Tenda](https://github.com/gabrielbrunop/tenda), uma linguagem 100% brasileira, com foco em simplicidade, mordernidade e facilitar o estudo de programação para brasileiros!
Por isso gostaríamos de agradecer o criador (Gabriel Bruno) por permitir e nos auxiliar no nosso projeto.
