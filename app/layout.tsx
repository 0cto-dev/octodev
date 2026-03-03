import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Lato, Roboto, Nunito, Inter, Fredoka, Varela_Round } from 'next/font/google';
import { Providers } from './providers';

export const metadata: Metadata = {
	title: 'OctoDev',
	description:
		'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
	keywords: ['programação', 'educação', 'gamificação', 'aprendizado', 'coding'],
	authors: [{ name: 'OctoDev Team' }],
	openGraph: {
		title: 'OctoDev',
		description: 'OctoDev é uma aplicação web educacional voltada para o ensino de programação por meio de uma abordagem gamificada.',
		type: 'website',
		locale: 'pt_BR',
		url: 'https://octodev.vercel.app',
		siteName: 'OctoDev',
	},
	robots: 'index, follow',
	alternates: {
		canonical: 'https://octodev.vercel.app',
	},
	verification: {
		google: 'aDOPi6ctOVGByWjhEwth9BDdeQOK3jO6KT2mGa09AQc',
	},
	icons: {
		icon: '/favicon.png',
	},
};
const roboto = Roboto({ subsets: ['latin'], weight: ['400', '700'], variable: '--roboto' });
const lato = Lato({ subsets: ['latin'], weight: ['400', '700'], variable: '--lato' });
const nunito = Nunito({ subsets: ['latin'], weight: ['400', '800'], variable: '--nunito' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--inter' });
const fredoka = Fredoka({ subsets: ['latin'], weight: ['400', '600'], variable: '--fredoka' });
const varela = Varela_Round({ subsets: ['latin'], weight: ['400'], variable: '--varela' });

export const viewport: Viewport = {
	themeColor: 'black',
	width: 'device-width',
	initialScale: 1,
	viewportFit: 'cover',
	// Other viewport properties can be added here
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="pt-br"
			className={`${roboto.variable} ${lato.variable} ${nunito.variable} ${inter.variable} ${fredoka.variable} ${varela.variable}`}
		>
			<head>
				<link rel="icon" href="/favicon.png" sizes="any" />
			</head>
			<body>
				<Providers>{children} </Providers>
			</body>
		</html>
	);
}
